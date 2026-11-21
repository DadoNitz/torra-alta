const plans: Record<string, { price: number; packs: number }> = {
  500: { price: 76, packs: 2 },
  1000: { price: 144, packs: 4 },
};

export function subscriptionSummary(grams: string, coffee: string, grind: string) {
  if (!Object.hasOwn(plans, grams)) throw new RangeError('Plano indisponível');
  return {
    ...plans[grams],
    text: `${grams} g de ${coffee === 'Seleção da torrefação' ? 'café' : coffee} por mês, ${grind.toLocaleLowerCase('pt-BR')}.`,
  };
}
