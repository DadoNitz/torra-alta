# Torra Alta

Café especial no tempo da Serra Gaúcha: uma experiência editorial sobre origem, torra e pequenos rituais.

**Projeto de portfolio, marca ficticia.** Criado por [Eduardo Nitz · DadoNitz](https://github.com/DadoNitz). Torra Alta, identidade, embalagens, cafés e operação comercial foram criados para este projeto; não representam uma empresa existente.

![Torra Alta: paisagem dos Campos de Cima da Serra, título “Café no tempo da serra” e acesso aos cafés](docs/preview.png)

## Stack

React 19 + TypeScript + Vite. O HTML é pré-renderizado no build (`scripts/prerender.tsx`), então o conteúdo existe antes da hidratação. Grãos 3D com three.js, carregado só quando a cena da torra se aproxima da tela. Animações com [React Bits](https://reactbits.dev) (código do registro oficial `https://reactbits.dev/r/<Componente>-TS-CSS`, copiado para `src/react-bits/`), GSAP e Motion. Fontes, fotografias e vídeo ficam no projeto (`public/assets`).

## Componentes React Bits usados

| Componente | Onde |
| --- | --- |
| SplitText | Título do hero, letra a letra |
| ScrollFloat | Títulos de Origem, Cafés, Visite e Assinatura, ligados ao scroll |
| BlurText | Textos de abertura de Origem e Cafés |
| CountUp | Preços dos três cafés e preço do plano da assinatura |
| TiltedCard | Embalagens dos cafés, com inclinação 3D que segue o ponteiro |
| Magnet | Botão do hero e botão da simulação de assinatura |
| ClickSpark | Faíscas no clique dos mesmos dois botões |

Com `prefers-reduced-motion`, os componentes ficam estáticos e legíveis (sem inclinação, contagem, desfoque ou faíscas).

## O que este projeto demonstra

- Direção visual autoral com fotografia ampla, tipografia condensada e uma paleta de areia e musgo. Embalagens desenhadas em CSS, sem mockups de terceiros.
- Layout revisado com o apple-design: header fixo em material translúcido (o conteúdo passa por baixo), gradiente no hero no lugar da faixa opaca, uma escala de espaçamento única (`--s-1` a `--s-7`), tracking negativo e leading curto nos títulos grandes, cartões com profundidade e feedback de press imediato em links, planos e menus. `prefers-reduced-transparency` e `prefers-contrast` trocam os materiais por superfícies sólidas.
- Grãos de café 3D na cena da torra: geometria simples (esfera achatada com o sulco), cor do verde ao marrom escuro e brilho de óleo conforme o scroll avança. Renderiza só quando o scroll muda, sem loop ocioso. `three` vem por `import()` dinâmico; com movimento reduzido ou sem WebGL fica uma ilustração SVG estática.
- Narrativa de torra ligada ao scroll nativo: aquecer, resfriar e descansar. As imagens se cruzam suavemente; o usuário pode voltar a qualquer momento.
- Molas criticamente amortecidas no press, preservando posição e velocidade ao interromper. Entradas discretas com a Web Animations API e Intersection Observer.
- Vídeo documental de resfriamento, sem áudio, com pausa manual. Para ao sair da cena, ocultar a aba ou ativar movimento reduzido.
- Cards com origem, processo, notas sensoriais e preços. A escolha do café segue para uma simulação de assinatura com quantidade e moagem.
- Foco visível, link para pular a navegação, controles nativos de teclado, textos alternativos e resumo anunciado por tecnologia assistiva. O processo completo tem transcrição acessível.
- `prefers-reduced-motion` troca a cena fixa por uma sequência estática. Sem JavaScript, o conteúdo continua disponível e a simulação fica desabilitada.
- WebP com versões específicas para celular, carregamento adiado e fontes WOFF2 locais sob SIL Open Font License.

## Rodar localmente

Node.js 24 ou superior:

```sh
npm install
npm run dev      # servidor local
npm test         # cálculo dos planos e cor da torra
npm run build    # tsc + vite build + pré-renderização em dist/
```

Não há variáveis de ambiente ou credenciais.

### Imagens novas

[docs/image-briefs.md](docs/image-briefs.md) descreve quatro fotografias (caminho, proporção, onde entram e prompt). Salve o arquivo em `public/img/<nome>.webp` e rode o build: a página passa a usar a foto nova e o texto alternativo dela. Sem o arquivo, a foto atual continua, sem requisição 404.

## GitHub Pages

O workflow [pages.yml](.github/workflows/pages.yml) instala, testa os planos, gera o build do Vite e publica `dist/` com as actions oficiais `configure-pages`, `upload-pages-artifact` e `deploy-pages`. O `base` do Vite é `./`, então os caminhos são relativos, compatíveis com publicação em uma subpasta de repositório.

Quando você decidir publicar o repositório, selecione **Settings → Pages → Source → GitHub Actions**. O workflow responde a commits na branch `main` e também permite execução manual. Configuração baseada na [documentação oficial de workflows do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Publicado em [github.com/DadoNitz/torra-alta](https://github.com/DadoNitz/torra-alta).

## Validação

Screenshots revisados em **1440, 768 e 390 px**, incluindo a página inteira. Tasteskill: **0 FAIL**, com um aviso de quantidade de tamanhos tipográficos justificado em [docs/validation.md](docs/validation.md). A cena foi capturada de 0 a 100% em desktop e celular, além da versão com movimento reduzido.

Testados em Chrome headless: navegação e foco por teclado, escolha de café, troca de plano por setas, envio da simulação com Enter, pausa do vídeo, reversão do scroll, ausência de JavaScript e abertura por `file://` (antes da migração). O preview deste README foi gerado em Chrome headless a 1440 × 900.

Lighthouse (padrão mobile, `vite preview` local, após o layout apple-design e os grãos 3D): **99 performance · 100 acessibilidade · 100 boas práticas · 92 SEO**, LCP 0.8 s, CLS 0; o three.js não entra no carregamento inicial (o SEO perde pontos só porque o servidor local não tem `robots.txt`). Métricas e limites da validação estão registrados em [docs/validation.md](docs/validation.md). Não houve teste em Safari, Firefox, leitor de tela real ou celular físico, nem validação do workflow em um repositório remoto.

## Direção e conteúdo

O conceito é **“subir para desacelerar”**. A direção `The place carries it`, seed `419834393`, veio do tasteskill; o projeto aplica resposta ao press, molas interrompíveis, tipografia e movimento reduzido do apple-design. O argumento e as escolhas visuais estão em [docs/design.md](docs/design.md).

Preços, planos, disponibilidade, cafés, localização comercial e horários são conteúdo fictício. A assinatura é uma simulação local: não envia dados, não cobra e não reserva produtos. Fotografias documentais mostram paisagens, materiais e rituais reais, sem representar instalações ou produtos próprios da marca.

## Créditos das fotografias e vídeo

Todas as mídias foram encontradas e baixadas pelo `assets.mjs` do tasteskill, com licenças que permitem reutilização comercial. Os créditos também estão disponíveis no rodapé da página e em [assets/credits.json](public/assets/credits.json).

| Uso | Obra e fonte | Autor | Licença |
| --- | --- | --- | --- |
| Hero | [Campos do Parque estadual do Tainhas](https://commons.wikimedia.org/wiki/File:Campos_do_Parque_estadual_do_Tainhas.jpg) | Rodrigo Alexandre Geyer Kaspary | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |
| Origem | [Pedra dos Três Pontos ES 01](https://commons.wikimedia.org/w/index.php?curid=117677306) | Martin Thurnherr | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| Aquecer | [Roasted coffee beans on the surface. 01](https://commons.wikimedia.org/wiki/File:Roasted_coffee_beans_on_the_surface._01.jpg) | A S M Jobaer | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| Descansar e cafeteria | [Manual drip (pour-over) coffee](https://commons.wikimedia.org/w/index.php?curid=70214599) | Kim Sanso | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Fechamento | [Curvas sinuosas e paredões de formação em basalto do Canyon Itaimbezinho e ao fundo o Rio do Boi](https://commons.wikimedia.org/w/index.php?curid=49688708) | Portal dos Canyons | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| Resfriar, vídeo e poster | [Kaffe - Ystad-2024](https://commons.wikimedia.org/wiki/File:Kaffe_-_Ystad-2024.ogg) | Foto: Jonn Leffmann | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) |

As versões WebP foram redimensionadas e comprimidas; a versão móvel do hero recebeu recorte central. Nenhuma foto recebeu retoque ou recoloração. Os arquivos derivados mantêm as licenças indicadas para seus originais, incluindo o compartilhamento pela mesma licença quando aplicável. Os JPEGs de origem foram preservados. O vídeo foi mantido no formato fornecido pelo acervo, com poster convertido para WebP.

**Tipografia:** Bebas Neue, de Ryoichi Tsunekawa, e EB Garamond, de Georg Duffner e colaboradores, distribuídas pelo Google Fonts. Licenças locais: [Bebas Neue OFL](public/assets/fonts/bebas-neue-OFL.txt) e [EB Garamond OFL](public/assets/fonts/eb-garamond-OFL.txt). Símbolo, composição e embalagens são desenhos originais deste projeto. Nenhuma imagem foi gerada por IA e o Higgsfield não foi utilizado.
