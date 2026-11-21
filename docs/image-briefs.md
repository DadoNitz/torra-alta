# Image briefs

Quatro fotografias que deixariam o site mais próximo de uma marca real. Hoje o site usa fotos documentais do Wikimedia Commons; a de café coado aparece duas vezes (Descansar e Visite) e nenhuma mostra a torra de perto.

**Como usar:** salve o arquivo com o nome exato em `public/img/` e rode `npm run build`. O `vite.config.ts` lista a pasta no build e `src/photos.ts` troca a imagem e o texto alternativo. Se o arquivo não existir, a foto atual continua no lugar, sem requisição 404.

Formato: WebP, qualidade ~78, lado maior 1600 px (máx. ~250 KB). Paleta da marca: areia `#ddd6c6`, musgo `#4f6238` / `#3f5a2a`, sálvia `#a8b093`, verde-noite `#18231d`. Luz natural, contraste baixo-médio, nada de saturação de propaganda. Sem pessoas de frente, sem logotipos, sem texto legível nas embalagens (a marca é fictícia).

Ao publicar uma imagem nova, atualize os créditos no rodapé (`App.tsx`), no README e em `public/assets/credits.json`.

## 1. `public/img/origem-colheita.webp`

- **Proporção:** 3:2 (1600 × 1067). Recorte seguro no centro: no celular a imagem vira 4:3.
- **Onde entra:** seção Origem, foto grande do mosaico (substitui a Pedra dos Três Pontos e a versão móvel).
- **Prompt:**
  > Documentary photograph of a coffee harvest on a steep Brazilian mountain farm in Mantiqueira de Minas, early morning. Close-medium shot of weathered hands picking ripe red and yellow coffee cherries from a branch into a woven basket, glossy dark-green leaves, soft mist rolling over layered blue-green mountains in the background. Natural overcast light, gentle contrast, muted earthy palette of moss green, sage and warm sand. Shot on a 50mm lens at f/2.8, shallow depth of field, subtle film grain, realistic skin texture, no faces visible, no text, no logos.

## 2. `public/img/torra-tambor.webp`

- **Proporção:** 3:2 (1600 × 1067). Fica em tela cheia atrás do verbo "Aquecer" com véu escuro de 62%, então o centro pode ser calmo.
- **Onde entra:** cena da torra, quadro "Aquecer" (substitui os grãos torrados genéricos). Combina com os grãos 3D, que começam verdes.
- **Prompt:**
  > Realistic photograph inside a small artisanal coffee roastery in the highlands of southern Brazil. Close view through the open door of a cast-iron drum roaster: green and yellowing coffee beans tumbling mid-air, a faint warm glow from the burner below, thin wisps of smoke. Dark, moody interior with deep green-black shadows, warm amber highlights only on the beans, matte metal texture. 35mm lens, f/2, motion blur on the beans, low-key lighting, documentary style, no people, no text, no brand marks.

## 3. `public/img/descanso-embalagem.webp`

- **Proporção:** 3:2 (1600 × 1067).
- **Onde entra:** cena da torra, quadro "Descansar" (hoje repete a foto de café coado usada em Visite).
- **Prompt:**
  > Still life photograph of freshly roasted coffee resting in plain kraft-paper and matte sand-colored bags with one-way degassing valves, standing on a worn pine workbench. A small handwritten paper tag with a date (illegible), a scoop of dark-brown roasted beans spilled beside them, a cooling tray softly out of focus behind. Diffuse window light from the left, calm and quiet mood, palette of warm sand, moss green and dark brown. 50mm lens, f/4, realistic textures, no readable text, no logos.

## 4. `public/img/casa-balcao.webp`

- **Proporção:** 3:2 (1600 × 1067). O cartão translúcido cobre o terço direito no desktop: deixe o assunto principal no terço esquerdo.
- **Onde entra:** seção Visite, fundo em tela cheia (substitui a segunda ocorrência do café coado).
- **Prompt:**
  > Interior photograph of a small mountain café counter in São Francisco de Paula, Serra Gaúcha, on a cold foggy afternoon. Left third: a pour-over coffee dripping into a glass server, a ceramic cup and a plate of golden pão de queijo on a solid wood counter. Right side: soft, out-of-focus wall with plants and a window showing fog over araucaria trees. Warm tungsten light inside versus cool grey-blue light outside, cozy and unhurried atmosphere, earthy palette of sand, moss green and deep forest green. 35mm lens, f/2.8, realistic, editorial style, no people facing camera, no text, no logos.
