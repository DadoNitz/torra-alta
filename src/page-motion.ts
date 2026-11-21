import { roastStage } from './roast-color';

export function startPageMotion() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const scene = document.querySelector<HTMLElement>('.scene')!;
  const beats = [...scene.querySelectorAll<HTMLElement>('.roast-beat')];
  const transcript = document.createElement('ol');
  transcript.className = 'sr-only';
  beats.forEach(beat => {
    const item = document.createElement('li');
    item.textContent = `${beat.querySelector('h3')!.textContent}. ${beat.querySelector('p')!.textContent}`;
    transcript.append(item);
  });
  scene.append(transcript);
  const progressBar = scene.querySelector<HTMLElement>('.roast-progress span')!;
  const heroImage = document.querySelector<HTMLImageElement>('.hero-photo')!;
  const video = scene.querySelector('video')!;
  const toggle = scene.querySelector<HTMLButtonElement>('.video-toggle')!;
  let frame = 0, videoVisible = false, videoPaused = false, activeBeat = 0;
  const beansBox = scene.querySelector<HTMLElement>('.roast-beans')!;
  const beansLabel = beansBox.querySelector('b')!;
  let beans: { set(p: number): void; dispose(): void } | undefined, beansWanted = false;

  // three.js is fetched only when the roast scene approaches the viewport.
  const beansObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting || beans || beansWanted || reduced.matches) return;
    beansWanted = true;
    import('./roast-beans').then(({ mountBeans }) => {
      if (!beansWanted || reduced.matches) return;
      beans = mountBeans(beansBox.querySelector('canvas')!);
      beansBox.classList.toggle('is-3d', !!beans);
      frame = 0; render();
    }, () => { beansWanted = false; });
  }, { rootMargin: '100% 0px' });
  beansObserver.observe(scene);
  function dropBeans() {
    beansWanted = false;
    beans?.dispose(); beans = undefined;
    beansBox.classList.remove('is-3d');
    beansLabel.textContent = 'Do verde ao torrado';
  }

  function syncVideo() {
    const play = videoVisible && activeBeat === 1 && !videoPaused && !reduced.matches && !document.hidden;
    if (play) video.play().catch(() => { toggle.textContent = 'Reproduzir vídeo'; });
    else video.pause();
    toggle.textContent = play ? 'Pausar vídeo' : 'Reproduzir vídeo';
  }
  function toggleVideo() { videoPaused = !videoPaused; syncVideo(); }
  const videoObserver = new IntersectionObserver(([entry]) => {
    videoVisible = entry.isIntersecting;
    syncVideo();
  }, { threshold: .15 });
  videoObserver.observe(scene);

  function render() {
    frame = 0;
    if (reduced.matches) return;
    const bounds = scene.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, -bounds.top / (bounds.height - innerHeight)));
    const position = progress * 2, active = Math.round(position);
    toggle.hidden = active !== 1;
    if (activeBeat !== active) { activeBeat = active; syncVideo(); }
    beats.forEach((beat, index) => {
      beat.style.opacity = String(Math.max(0, 1 - Math.abs(position - index)));
      beat.classList.toggle('is-active', index === active);
      const copy = beat.querySelector<HTMLElement>('.roast-copy')!;
      copy.style.visibility = index === active ? 'visible' : 'hidden';
      copy.style.transform = `translateY(${(index - position) * 25}px)`;
      beat.querySelector<HTMLElement>('img,video')!.style.transform = `scale(1.06) translateY(${(progress - .5) * -4}%)`;
    });
    progressBar.style.transform = `scaleX(${progress})`;
    beans?.set(progress);
    beansLabel.textContent = roastStage(progress);
    if (scrollY < innerHeight) heroImage.style.transform = `translateY(${Math.min(scrollY * .12, 90)}px) scale(1.025)`;
  }
  function queue() { if (!frame) frame = requestAnimationFrame(render); }
  function setMotion() {
    scene.classList.toggle('is-live', !reduced.matches);
    scene.classList.toggle('is-rest', reduced.matches);
    transcript.hidden = reduced.matches;
    if (reduced.matches) dropBeans();
    else { beansObserver.disconnect(); beansObserver.observe(scene); }
    toggle.hidden = reduced.matches;
    beats.forEach(beat => {
      const copy = beat.querySelector<HTMLElement>('.roast-copy')!;
      copy.setAttribute('aria-hidden', String(!reduced.matches));
      if (reduced.matches) { beat.style.opacity = ''; copy.style.cssText = ''; }
    });
    syncVideo();
    queue();
  }
  // Reveal on enter; reduced motion leaves everything in place.
  const reveal = new IntersectionObserver(entries => {
    let stagger = 0;
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      reveal.unobserve(target);
      if (!reduced.matches) target.animate([{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 650, delay: stagger++ * 75, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
    });
  }, { threshold: .12 });
  document.querySelectorAll('[data-reveal]').forEach(el => reveal.observe(el));

  // Critically damped press spring: retargeting keeps position and velocity (interruptible).
  const pressCleanups = [...document.querySelectorAll<HTMLElement>('.button')].map(button => {
    let value = 1, velocity = 0, target = 1, raf = 0, last = 0;
    function tick(time: number) {
      const dt = Math.min((time - last) / 1000 || 1 / 60, .04);
      last = time;
      const offset = value - target, decay = Math.exp(-25 * dt), carry = velocity + 25 * offset;
      value = target + (offset + carry * dt) * decay;
      velocity = (velocity - 25 * carry * dt) * decay;
      button.style.setProperty('--press-scale', String(value));
      if (Math.abs(value - target) > .0001 || Math.abs(velocity) > .001) raf = requestAnimationFrame(tick);
      else { button.style.setProperty('--press-scale', String(target)); raf = 0; }
    }
    function set(next: number) {
      if (reduced.matches) { cancelAnimationFrame(raf); raf = 0; value = 1; velocity = 0; button.style.setProperty('--press-scale', '1'); return; }
      target = next;
      if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
    }
    const down = () => set(.965), up = () => set(1);
    const keyDown = (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') set(.965); };
    const events: [string, EventListener][] = [['pointerdown', down], ['pointerup', up], ['pointercancel', up], ['pointerleave', up], ['blur', up], ['keydown', keyDown as EventListener], ['keyup', up]];
    events.forEach(([n, f]) => button.addEventListener(n, f));
    return () => { cancelAnimationFrame(raf); events.forEach(([n, f]) => button.removeEventListener(n, f)); };
  });
  toggle.addEventListener('click', toggleVideo);
  document.addEventListener('visibilitychange', syncVideo);
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue);
  reduced.addEventListener('change', setMotion);
  setMotion();
  return () => {
    cancelAnimationFrame(frame);
    video.pause();
    reveal.disconnect();
    pressCleanups.forEach(c => c());
    videoObserver.disconnect();
    beansObserver.disconnect();
    dropBeans();
    transcript.remove();
    toggle.removeEventListener('click', toggleVideo);
    document.removeEventListener('visibilitychange', syncVideo);
    removeEventListener('scroll', queue);
    removeEventListener('resize', queue);
    reduced.removeEventListener('change', setMotion);
  };
}
