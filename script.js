const plans = { 500: { price: 76, packs: 2 }, 1000: { price: 144, packs: 4 } };

function subscriptionSummary(grams, coffee, grind) {
  if (!Object.hasOwn(plans, grams)) throw new RangeError('Plano indisponível');
  const plan = plans[grams];
  return { ...plan, text: `${grams} g de ${coffee === 'Seleção da torrefação' ? 'café' : coffee} por mês, ${grind.toLocaleLowerCase('pt-BR')}.` };
}

function init() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const form = document.querySelector('.subscription-form');
  const coffee = form.elements.coffee;
  const grind = form.elements.grind;
  const message = document.querySelector('#form-message');
  function updatePlan() {
    const summary = subscriptionSummary(form.elements.plan.value, coffee.value, grind.value);
    document.querySelector('#plan-summary').textContent = summary.text;
    document.querySelector('#plan-price').innerHTML = `R$ ${summary.price} <span>/ mês</span>`;
    message.textContent = '';
  }
  form.addEventListener('change', updatePlan);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const summary = subscriptionSummary(form.elements.plan.value, coffee.value, grind.value);
    message.textContent = `Sua simulação: ${summary.packs} pacotes, ${coffee.value.toLocaleLowerCase('pt-BR')}, ${grind.value.toLocaleLowerCase('pt-BR')}, por R$ ${summary.price}/mês. Nenhum pedido foi enviado.`;
  });
  document.querySelectorAll('[data-coffee]').forEach((link) => link.addEventListener('click', () => {
    coffee.value = link.dataset.coffee;
    updatePlan();
  }));

  const observer = new IntersectionObserver((entries) => {
    let stagger = 0;
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      observer.unobserve(target);
      if (!reduced.matches) target.animate([
        { opacity: 0, transform: 'translateY(24px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 650, delay: stagger++ * 75, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
    });
  }, { threshold: .12 });
  document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));

  // A critically damped spring keeps its current position and velocity when retargeted.
  document.querySelectorAll('.button').forEach((button) => {
    let value = 1, velocity = 0, target = 1, frame = 0, last = 0;
    function tick(time) {
      const dt = Math.min((time - last) / 1000 || 1 / 60, .04);
      last = time;
      const offset = value - target, decay = Math.exp(-25 * dt);
      const carry = velocity + 25 * offset;
      value = target + (offset + carry * dt) * decay;
      velocity = (velocity - 25 * carry * dt) * decay;
      button.style.setProperty('--press-scale', value);
      if (Math.abs(value - target) > .0001 || Math.abs(velocity) > .001) frame = requestAnimationFrame(tick);
      else { button.style.setProperty('--press-scale', target); frame = 0; }
    }
    function setTarget(next) {
      if (reduced.matches) {
        cancelAnimationFrame(frame);
        value = 1; velocity = 0; frame = 0;
        button.style.setProperty('--press-scale', 1);
        return;
      }
      target = reduced.matches ? 1 : next;
      if (!frame) { last = performance.now(); frame = requestAnimationFrame(tick); }
    }
    button.addEventListener('pointerdown', () => setTarget(.965));
    ['pointerup', 'pointercancel', 'pointerleave', 'blur'].forEach((event) => button.addEventListener(event, () => setTarget(1)));
    button.addEventListener('pointerenter', (event) => { if (event.buttons === 1) setTarget(.965); });
    button.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') setTarget(.965); });
    button.addEventListener('keyup', () => setTarget(1));
    reduced.addEventListener('change', () => setTarget(1));
  });

  const scene = document.querySelector('.scene');
  const beats = [...scene.querySelectorAll('.roast-beat')];
  const progressBar = scene.querySelector('.roast-progress span');
  const heroImage = document.querySelector('.hero-photo');
  const video = scene.querySelector('video');
  const videoToggle = scene.querySelector('.video-toggle');
  let queued = false, videoVisible = false, videoPaused = false, activeBeat = 0;
  function syncVideo() {
    const play = videoVisible && activeBeat === 1 && !videoPaused && !reduced.matches && !document.hidden;
    if (play) video.play().catch(() => { videoToggle.textContent = 'Reproduzir vídeo'; });
    else video.pause();
    videoToggle.textContent = play ? 'Pausar vídeo' : 'Reproduzir vídeo';
  }
  videoToggle.addEventListener('click', () => { videoPaused = !videoPaused; syncVideo(); });
  const videoObserver = new IntersectionObserver(([entry]) => { videoVisible = entry.isIntersecting; syncVideo(); }, { threshold: .15 });
  videoObserver.observe(scene);
  document.addEventListener('visibilitychange', syncVideo);

  function renderScroll() {
    queued = false;
    if (reduced.matches) return;
    const bounds = scene.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, -bounds.top / (bounds.height - innerHeight)));
    const position = progress * 2;
    const active = Math.round(position);
    videoToggle.hidden = active !== 1;
    if (activeBeat !== active) { activeBeat = active; syncVideo(); }
    beats.forEach((beat, index) => {
      beat.style.opacity = Math.max(0, 1 - Math.abs(position - index));
      beat.classList.toggle('is-active', index === active);
      const copy = beat.querySelector('.roast-copy');
      copy.style.opacity = index === active ? 1 : 0;
      copy.style.transform = `translateY(${(index - position) * 25}px)`;
      beat.querySelector('img,video').style.transform = `scale(1.06) translateY(${(progress - .5) * -4}%)`;
    });
    progressBar.style.transform = `scaleX(${progress})`;
    if (scrollY < innerHeight) heroImage.style.transform = `translateY(${Math.min(scrollY * .12, 90)}px) scale(1.025)`;
  }
  function queueScroll() { if (!queued) { queued = true; requestAnimationFrame(renderScroll); } }
  function setMotion() {
    document.getAnimations().forEach((animation) => { if (reduced.matches) animation.finish(); });
    scene.classList.toggle('is-live', !reduced.matches);
    scene.classList.toggle('is-rest', reduced.matches);
    videoToggle.hidden = reduced.matches;
    beats.forEach((beat) => {
      if (reduced.matches) {
        beat.style.opacity = '';
        beat.querySelector('.roast-copy').style.cssText = '';
      }
    });
    syncVideo();
    queueScroll();
  }
  addEventListener('scroll', queueScroll, { passive: true });
  addEventListener('resize', queueScroll);
  reduced.addEventListener('change', setMotion);
  setMotion();
}

if (typeof document !== 'undefined') init();
if (typeof module !== 'undefined') module.exports = { subscriptionSummary };
