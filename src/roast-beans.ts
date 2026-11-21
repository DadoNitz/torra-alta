import { AmbientLight, Color, DirectionalLight, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, WebGLRenderer } from 'three';
import { roastColor } from './roast-color';

// A squashed sphere with an S-shaped groove on its flat face reads as a coffee bean.
function beanGeometry() {
  const geo = new SphereGeometry(1, 40, 28);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) * 0.72, y = pos.getY(i), z = pos.getZ(i) * 0.5;
    const groove = z > 0 ? 0.22 * Math.exp(-((x - 0.07 * Math.sin(y * 3)) ** 2) / 0.006) * Math.min(1, z * 4) : 0;
    pos.setXYZ(i, x, y, z > 0 ? z * 0.7 - groove : z);
  }
  geo.computeVertexNormals();
  return geo;
}

const LAYOUT: [number, number, number, number][] = [
  [-1.9, 0.5, 0, 0.4], [-0.6, -0.6, 0.4, 2.1], [0.7, 0.55, -0.2, 4.2], [1.9, -0.45, 0.2, 1.1], [0.1, 1.5, -0.8, 3.3], [-1.3, -1.6, -0.6, 5.4], [1.3, -1.7, -0.4, 0.8],
];

export function mountBeans(canvas: HTMLCanvasElement) {
  let renderer: WebGLRenderer;
  try { renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' }); }
  catch { return undefined; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new Scene(), camera = new PerspectiveCamera(32, 1, 0.1, 40);
  camera.position.set(0, 0, 8.5);
  const key = new DirectionalLight(0xfff0d8, 2.6);
  key.position.set(3, 4, 6);
  scene.add(new AmbientLight(0xffffff, 0.9), key);
  const geo = beanGeometry(), material = new MeshStandardMaterial({ roughness: 0.85 });
  const beans = LAYOUT.map(([x, y, z, seed]) => {
    const bean = new Mesh(geo, material);
    bean.position.set(x, y, z);
    bean.scale.setScalar(0.8);
    bean.userData.seed = seed;
    scene.add(bean);
    return bean;
  });
  let progress = 0;
  const color = new Color();
  function draw() {
    material.color.copy(color.set(roastColor(progress)));
    material.roughness = 0.85 - progress * 0.5; // roasted beans turn oily and catch more light
    beans.forEach(bean => {
      const s = bean.userData.seed as number;
      bean.rotation.set(s + progress * 2.4, s * 1.7 + progress * 3.1, s * 0.6);
      bean.scale.setScalar(0.8 * (1 + progress * 0.12)); // beans swell as they roast
    });
    renderer.render(scene, camera);
  }
  const resize = new ResizeObserver(() => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    draw();
  });
  resize.observe(canvas);
  return {
    // Rendered only when scroll moves; no idle animation loop.
    set(next: number) { if (next !== progress) { progress = next; draw(); } },
    dispose() { resize.disconnect(); geo.dispose(); material.dispose(); renderer.dispose(); },
  };
}
