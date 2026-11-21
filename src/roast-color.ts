// Bean colour from green to dark roast; shared by the 3D beans and the static fallback.
export const ROAST_STOPS = ['#7f8f4d', '#b9a865', '#a06c3b', '#5c3622', '#2a1911'];
export const ROAST_STAGES = ['Verde', 'Amarelo', 'Canela', 'Chocolate'];

export function roastColor(progress: number): string {
  const t = Math.max(0, Math.min(1, progress)) * (ROAST_STOPS.length - 1);
  const i = Math.min(Math.floor(t), ROAST_STOPS.length - 2), f = t - i;
  const [a, b] = [ROAST_STOPS[i], ROAST_STOPS[i + 1]].map(hex => [1, 3, 5].map(n => parseInt(hex.slice(n, n + 2), 16)));
  return '#' + a.map((v, k) => Math.round(v + (b[k] - v) * f).toString(16).padStart(2, '0')).join('');
}

export function roastStage(progress: number): string {
  return ROAST_STAGES[Math.min(ROAST_STAGES.length - 1, Math.floor(Math.max(0, progress) * ROAST_STAGES.length))];
}
