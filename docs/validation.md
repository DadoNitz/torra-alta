# Validação e crítica visual

Revisão realizada em 21 de novembro de 2026. O alvo foi o HTML estático entregue, servido localmente. Não há etapa de compilação alterando o resultado.

## Critique

ROUND 1

Seen in one second: um campo aberto e o título sobre café na serra.

Idea (one sentence): o encontro entre Torra Alta e o tempo da serra organiza uma viagem da paisagem até a xícara.

Live thing: seleção de café e simulação de assinatura.

Layout words by section: hero=photograph / origem=mosaic / torra=pinned sequence / cafés=unequal band / visite=photo with card / assinatura=menu / footer=split and wordmark.

Scores: design 7.5 · usability 6 · creativity 7 · content 8 → overall 7.0, limited to 6.0.

Caps applied: falhas do inspector e título em três linhas no tablet.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. `tablet-fold.jpg`: título em três linhas e coluna comprimida. A composição do tablet passou a empilhar título, descrição e ação dentro da mesma faixa.
2. `mobile-page-01.jpg`: títulos com palavras coladas e legenda de origem encoberta. Mantidas as quebras de linha e removida a altura de 100% da foto nesse breakpoint.
3. `torra-phone.jpg`: legendas de quadros diferentes sobrepostas. As legendas e o controle de vídeo passaram a acompanhar somente o quadro ativo.

ROUND 2 — final

Seen in one second: paisagem real da serra, com o título em escala dominante.

Idea (one sentence): o nome Torra Alta se transforma em uma pausa entre montanhas, calor e preparo.

Live thing: escolher café, quantidade e moagem produz um resumo local completo, sem compra simulada como real.

Layout words by section: hero=photograph / origem=mosaic / torra=pinned sequence / cafés=unequal band / visite=photo with card / assinatura=menu / footer=split and wordmark.

Scores: design 8 · usability 8 · creativity 7 · content 8 → overall 7.8.

Caps applied: criatividade mantida em 7; a associação entre montanha e pausa também poderia funcionar para outra torrefação regional.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. `desktop-fold.jpg`: o hero privilegia atmosfera regional, sem mostrar café. A descrição e a ação deixam a categoria explícita; fotos de café aparecem nas seções seguintes. Mantida a direção sorteada.
2. `desktop-page-03.jpg`: a assinatura é menos expressiva que os momentos fotográficos. O contraste de seleção e o resumo priorizam a legibilidade dos planos. Não foi acrescentada decoração sem função.
3. `mobile-page-01.jpg`: a narrativa ocupa mais rolagem em uma coluna. A cena foi encurtada de 2.8 para 2.5 telas no celular; movimento reduzido apresenta uma sequência estática.

## Gate e screenshots

- `draw.mjs`: direção The place carries it, seed 419834393, sem redraw.
- `assets.mjs`: busca, download, licenças e créditos de cinco fotografias e um vídeo.
- `lint.mjs`: 0 FAIL, 1 WARN. O aviso de travessões conta os separadores bibliográficos dos créditos e os títulos de metadados; não há uso repetido desse recurso no texto narrativo.
- `inspect.mjs`: **0 FAIL, 1 WARN** em 1440 × 900, 768 × 1024 e 390 × 844.
- Aviso `size-count`: mantido com justificativa. A escala de leitura usa small, body, lead e head; tamanhos adicionais pertencem ao wordmark, às embalagens, ao hero e ao verbo monumental da cena, conforme a direção sorteada. Não há dez níveis concorrendo em um mesmo bloco de leitura.
- `scenes.mjs`: cena funcionando em desktop e celular, sem erros de console. Fotografados 0, 10, …, 100% e o antes/depois. Versão de movimento reduzido revisada em dez telas.
- Timing aproximado headless da cena: mediana de 5.6 ms, zero quadros acima de 34 ms na amostra de 225 quadros. Não representa uma medição em hardware móvel.
- Todos os folds, folhas de página inteira e três folhas de cena da execução final foram abertos para inspeção visual. Resultados brutos ficam na pasta local ignorada `.taste-skill/`.

## Comportamento

Dois testes Node aprovados: preço, quantidade e texto dos planos; rejeição de plano desconhecido. Verificação de sintaxe JavaScript aprovada.

Checagens em Chrome headless: fontes locais, café levado do card para o configurador, troca de plano com setas, ordem de Tab e foco, envio com Enter, resumo correto, pausa do vídeo, reversão do scroll, redução de movimento, conteúdo sem JavaScript e abertura direta por arquivo. A cena oferece uma transcrição contínua para tecnologia assistiva; não houve teste com leitor de tela real.

O workflow foi preparado a partir da documentação oficial do GitHub Pages. O mesmo conjunto de arquivos foi servido em uma subpasta local: seis imagens carregaram, fontes e cena iniciaram, todas as âncoras resolveram e não houve erro de console. Nenhum remoto, push ou deploy foi executado.

## Lighthouse

Chrome headless 157, perfil mobile 412 × 823, rede e CPU simuladas no padrão Lighthouse, servidor HTTP local. Execução final em 21 de novembro de 2026:

| Performance | Acessibilidade | Boas práticas | SEO |
| --- | --- | --- | --- |
| 100 | 100 | 100 | 100 |

LCP 0.9 s, CLS 0. O resumo reproduzível da medição está em [lighthouse.json](lighthouse.json). As medições anteriores variaram entre 81 e 91 em performance antes do fechamento; notas de laboratório variam com condições de execução e não substituem métricas de produção.

## Limites

Safari, Firefox, dispositivos físicos, leitor de tela real e execução remota do GitHub Actions não foram conferidos. Fotos são documentais do universo do café e da região, não instalações ou produtos reais da marca fictícia. A assinatura não possui backend ou checkout.
