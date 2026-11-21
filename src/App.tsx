import { useEffect, useState } from 'react';
import Subscription from './SubscriptionForm';
import { startPageMotion } from './page-motion';
import BlurText from './react-bits/BlurText';
import ClickSpark from './react-bits/ClickSpark';
import CountUp from './react-bits/CountUp';
import Magnet from './react-bits/Magnet';
import ScrollFloat from './react-bits/ScrollFloat';
import SplitText from './react-bits/SplitText';
import TiltedCard from './react-bits/TiltedCard';

const SPARKS = ['#c9b78a', '#e9e2d0'];

export default function App() {
 const [coffee, setCoffee] = useState('Seleção da torrefação');
 useEffect(startPageMotion, []);
 return (<>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header">
      <a className="wordmark" href="#inicio" aria-label="Torra Alta, início">
        <svg viewBox="0 0 48 36" width="44" height="33" aria-hidden="true">
          <path d="M0 34 17 5l8 14L34 0l14 34H0Z" fill="currentColor" />
          <path d="m11 34 9-16 8 16H11Z" fill="#ddd6c6" />
        </svg>
        <span>Torra Alta</span>
      </a>
      <nav aria-label="Navegação principal">
        <a href="#origem">Origem</a>
        <a href="#torra">Torra</a>
        <a href="#cafes">Cafés</a>
        <a href="#visite">Visite</a>
        <a href="#assinatura">Assinatura</a>
      </nav>
    </header>

    <main id="conteudo">
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <picture
          ><source
            media="(max-width: 600px)"
            srcSet="./assets/hero-mobile.webp" />
          <img
            className="hero-photo"
            src="./assets/campos-do-parque-estadual-do-tainhas.webp"
            width="1600"
            height="1067"
            fetchPriority="high"
            alt="Horizonte aberto dos Campos de Cima da Serra, no Parque Estadual do Tainhas"
        /></picture>
        <div className="hero-content frame">
          <h1 id="hero-title" aria-label="Café no tempo da serra"><SplitText tag="span" text="Café no tempo" splitType="chars" textAlign="left" trigger="load" /><br /><SplitText tag="span" text="da serra" splitType="chars" textAlign="left" trigger="load" delay={40} /></h1>
          <div className="hero-support">
            <p>
              Cafés brasileiros, torrados em pequenos lotes na Serra Gaúcha.
              Para quem faz da xícara uma pausa.
            </p>
            <ClickSpark sparkColor={SPARKS} sparkCount={10} sparkRadius={34} duration={520} style={{ display: 'block' }}>
              <Magnet magnetStrength={6} maxOffset={10} padding={40}>
                <a className="button" href="#cafes">Conheça os cafés <span aria-hidden="true">↗</span></a>
              </Magnet>
            </ClickSpark>
          </div>
        </div>
      </section>

      <section
        className="origin section-space frame"
        id="origem"
        aria-label="A origem vem primeiro"
      >
        <div className="section-intro">
          <ScrollFloat effect="float">A origem vem primeiro</ScrollFloat>
          <BlurText className="lead" text="A serra é a nossa casa de torra. O café chega de outras montanhas brasileiras, trazendo o sabor de onde nasceu." delay={40} />
        </div>
        <div className="origin-mosaic">
          <figure className="origin-photo" data-reveal>
            <img
              src="./assets/pedra-dos-tres-pontos-es-01.webp"
              srcSet="
                ./assets/origem-mobile.webp                640w,
                ./assets/pedra-dos-tres-pontos-es-01.webp 1280w
              "
              sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 900px) 55vw, 65vw"
              width="1280"
              height="853"
              loading="lazy"
              decoding="async"
              alt="Cerejas de café maduras diante da Pedra dos Três Pontos, no Espírito Santo"
            />
            <figcaption>
              Café crescendo aos pés da Pedra dos Três Pontos, no Espírito
              Santo.
            </figcaption>
          </figure>
          <div className="origin-facts" data-reveal>
            <div className="origin-note">
              <p>Da montanha<br />para a montanha.</p>
              <svg viewBox="0 0 300 140" aria-hidden="true">
                <path
                  d="m0 140 70-100 43 57 53-85 64 87 28-34 42 75H0Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <dl>
              <div>
                <dt>Origem dos grãos</dt>
                <dd>Minas Gerais e Espírito Santo</dd>
              </div>
              <div>
                <dt>Espécie</dt>
                <dd>100% arábica</dd>
              </div>
              <div>
                <dt>Casa de torra</dt>
                <dd>Campos de Cima da Serra, RS</dd>
              </div>
              <div>
                <dt>Escolha dos lotes</dt>
                <dd>Doçura, clareza e identidade</dd>
              </div>
            </dl>
          </div>
        </div>
        <p className="origin-close" data-reveal>
          A gente escolhe a origem antes de acender o torrador. Depois, encontra
          o ponto em que cada café pode ser ele mesmo.
        </p>
      </section>

      <section
        className="roast scene"
        id="torra"
        data-scene="roast"
        aria-labelledby="roast-title"
      >
        <div className="scene-stage">
          <h2 id="roast-title">O tempo da torra</h2>
          <article className="roast-beat">
            <img
              src="./assets/roasted-coffee-beans-on-the-surface-01.webp"
              width="1280"
              height="853"
              loading="lazy"
              alt="Grãos torrados vistos de perto, com texturas e tons diferentes"
            />
            <div className="roast-copy">
              <h3>Aquecer</h3>
              <p>
                O grão perde umidade e começa a mudar. Ajustamos o calor até
                revelar os aromas e a doçura de cada lote.
              </p>
            </div>
            <span className="roast-detail">O começo pede cuidado.</span>
          </article>
          <article className="roast-beat">
            <video
              muted
              loop
              playsInline
              preload="none"
              poster="./assets/kaffe-ystad-2024-poster.webp"
              width="854"
              height="480"
              aria-label="Grãos de café em movimento no resfriador de uma torrefação em Ystad, Suécia"
            >
              <source src="./assets/kaffe-ystad-2024.webm" type="video/webm" />
            </video>
            <div className="roast-copy">
              <h3>Resfriar</h3>
              <p>
                No ponto certo, tiramos os grãos do calor. O resfriamento rápido
                interrompe a torra e preserva o perfil de cada lote.
              </p>
            </div>
            <button className="video-toggle" type="button" hidden>
              Pausar vídeo
            </button>
          </article>
          <article className="roast-beat">
            <img
              src="./assets/manual-drip-pour-over-coffee.webp"
              width="1280"
              height="852"
              loading="lazy"
              alt="Água sendo despejada lentamente sobre café em um filtro de papel"
            />
            <div className="roast-copy">
              <h3>Descansar</h3>
              <p>
                Depois de resfriar, o café descansa. Na embalagem, a data de
                torra ajuda você a encontrar a melhor hora de preparar.
              </p>
            </div>
            <span className="roast-detail">A pausa também faz parte.</span>
          </article>
          <div className="roast-progress" aria-hidden="true"><span></span></div>
        </div>
      </section>

      <section
        className="coffees section-space"
        id="cafes"
        aria-label="Encontre sua altitude"
      >
        <div className="section-intro frame">
          <ScrollFloat effect="float">Encontre sua altitude</ScrollFloat>
          <BlurText className="lead" text="Três jeitos de chegar à sua pausa. Em grãos ou moído para o seu método, sempre em pacotes de 250 g." delay={40} />
        </div>
        <div className="coffee-band">
          <article className="coffee-card coffee-card-main" data-reveal>
            <div className="package-stage">
              <TiltedCard containerWidth="14rem" containerHeight="20rem" imageWidth="14rem" imageHeight="20rem" radius={0} intro={false} gyroscope={false} rotateAmplitude={10} scaleOnHover={1.04} shadow={0} glare={0}><div className="coffee-package package-moss" aria-hidden="true">
                <span className="package-brand">Torra<br />Alta</span
                ><span className="package-name">Encosta</span
                ><span className="package-origin">Cerrado Mineiro<br />250 g</span
                ><svg viewBox="0 0 220 100">
                  <path
                    d="m0 100 65-80 52 51 40-57 63 86H0Z"
                    fill="currentColor"
                  />
                </svg></div></TiltedCard>
            </div>
            <div className="coffee-info">
              <h3>Encosta</h3>
              <p className="tasting">Chocolate, castanha e caramelo.</p>
              <p>
                Doce e encorpado. Para o primeiro café do dia, puro ou com
                leite.
              </p>
              <dl>
                <div>
                  <dt>Origem</dt>
                  <dd>Cerrado Mineiro, MG</dd>
                </div>
                <div>
                  <dt>Processo</dt>
                  <dd>Natural · torra média</dd>
                </div>
              </dl>
              <p className="coffee-price"><CountUp to={38} prefix="R$ " duration={1} /> <span>/ 250 g</span></p>
              <a className="text-link" href="#assinatura" data-coffee="Encosta" onClick={() => setCoffee("Encosta")}
                >Escolher Encosta</a
              >
            </div>
          </article>
          <article className="coffee-card" data-reveal>
            <div className="package-stage stage-light">
              <TiltedCard containerWidth="14rem" containerHeight="20rem" imageWidth="14rem" imageHeight="20rem" radius={0} intro={false} gyroscope={false} rotateAmplitude={10} scaleOnHover={1.04} shadow={0} glare={0}><div className="coffee-package package-paper" aria-hidden="true">
                <span className="package-brand">Torra<br />Alta</span
                ><span className="package-name">Neblina</span
                ><span className="package-origin"
                  >Mantiqueira de Minas<br />250 g</span
                ><svg viewBox="0 0 220 100">
                  <path
                    d="m0 100 65-80 52 51 40-57 63 86H0Z"
                    fill="currentColor"
                  />
                </svg></div></TiltedCard>
            </div>
            <div className="coffee-info">
              <h3>Neblina</h3>
              <p className="tasting">Mel, laranja e flores brancas.</p>
              <p>
                Delicado e cítrico. Um coado para beber devagar e perceber
                mudar.
              </p>
              <dl>
                <div>
                  <dt>Origem</dt>
                  <dd>Mantiqueira de Minas, MG</dd>
                </div>
                <div>
                  <dt>Processo</dt>
                  <dd>Cereja descascado · torra clara</dd>
                </div>
              </dl>
              <p className="coffee-price"><CountUp to={44} prefix="R$ " duration={1} /> <span>/ 250 g</span></p>
              <a className="text-link" href="#assinatura" data-coffee="Neblina" onClick={() => setCoffee("Neblina")}
                >Escolher Neblina</a
              >
            </div>
          </article>
          <article className="coffee-card" data-reveal>
            <div className="package-stage stage-dark">
              <TiltedCard containerWidth="14rem" containerHeight="20rem" imageWidth="14rem" imageHeight="20rem" radius={0} intro={false} gyroscope={false} rotateAmplitude={10} scaleOnHover={1.04} shadow={0} glare={0}><div className="coffee-package package-sage" aria-hidden="true">
                <span className="package-brand">Torra<br />Alta</span
                ><span className="package-name">Cume</span
                ><span className="package-origin"
                  >Montanhas do Espírito Santo<br />250 g</span
                ><svg viewBox="0 0 220 100">
                  <path
                    d="m0 100 65-80 52 51 40-57 63 86H0Z"
                    fill="currentColor"
                  />
                </svg></div></TiltedCard>
            </div>
            <div className="coffee-info">
              <h3>Cume</h3>
              <p className="tasting">Frutas amarelas, rapadura e cacau.</p>
              <p>
                Vivo e suculento. Para quem gosta de descobrir outra camada na
                xícara.
              </p>
              <dl>
                <div>
                  <dt>Origem</dt>
                  <dd>Montanhas do Espírito Santo, ES</dd>
                </div>
                <div>
                  <dt>Processo</dt>
                  <dd>Natural · torra média-clara</dd>
                </div>
              </dl>
              <p className="coffee-price"><CountUp to={48} prefix="R$ " duration={1} /> <span>/ 250 g</span></p>
              <a className="text-link" href="#assinatura" data-coffee="Cume" onClick={() => setCoffee("Cume")}
                >Escolher Cume</a
              >
            </div>
          </article>
        </div>
      </section>

      <section className="visit" id="visite" aria-label="A pausa tem lugar">
        <img
          src="./assets/manual-drip-pour-over-coffee.webp"
          width="1280"
          height="852"
          loading="lazy"
          alt="O ritual de preparar um café coado, com chaleira, filtro e xícara sobre a mesa"
        />
        <div className="visit-card" data-reveal>
          <ScrollFloat effect="float">A pausa tem lugar</ScrollFloat>
          <p>
            Um coado passado na hora, um pão de queijo quentinho e assunto sobre
            café. Nosso balcão é um convite para ficar.
          </p>
          <p className="visit-location">
            Casa Torra Alta<br />São Francisco de Paula, Serra Gaúcha
          </p>
          <dl className="hours">
            <div>
              <dt>Quarta a sexta</dt>
              <dd>10h às 18h</dd>
            </div>
            <div>
              <dt>Sábado e domingo</dt>
              <dd>9h às 18h</dd>
            </div>
            <div>
              <dt>Segunda e terça</dt>
              <dd>Casa fechada</dd>
            </div>
          </dl>
          <details>
            <summary>O que tem no balcão</summary>
            <dl className="cafe-menu">
              <div>
                <dt>Espresso</dt>
                <dd>R$ 8</dd>
              </div>
              <div>
                <dt>Coado do dia</dt>
                <dd>R$ 12</dd>
              </div>
              <div>
                <dt>Cappuccino</dt>
                <dd>R$ 14</dd>
              </div>
              <div>
                <dt>Pão de queijo</dt>
                <dd>R$ 7</dd>
              </div>
            </dl>
          </details>
          <p className="small">
            Casa conceitual: endereço e horários fictícios, sem atendimento ao
            público.
          </p>
        </div>
      </section>

      <section
        className="subscription section-space frame"
        id="assinatura"
        aria-label="A serra, todo mês"
      >
        <div className="subscription-heading" data-reveal>
          <ScrollFloat effect="float">A serra, todo mês</ScrollFloat>
          <p className="lead">O seu ritual não precisa esperar a próxima viagem.</p>
          <p>
            Uma seleção de cafés, torrada na primeira terça do mês. Você escolhe
            quanto recebe e como prepara.
          </p>
        </div>
        <Subscription coffee={coffee} onCoffeeChange={setCoffee} />
      </section>
    </main>

    <footer className="site-footer">
      <div className="footer-top">
        <figure>
          <img
            src="./assets/curvas-sinuosas-e-paredoes-de-formacao-em.webp"
            width="1280"
            height="867"
            loading="lazy"
            alt="Paredões de basalto e mata no cânion Itaimbezinho"
          />
          <figcaption>Itaimbezinho. Um convite a ir mais devagar.</figcaption>
        </figure>
        <div className="footer-note">
          <p className="lead">A montanha tem seu tempo.<br />O café também.</p>
          <a className="text-link" href="#inicio">Voltar ao início</a>
          <p>
            Feito por
            <a
              href="https://github.com/DadoNitz"
              target="_blank"
              rel="noopener noreferrer"
              >Eduardo Nitz</a
            >.
          </p>
          <p className="small">Projeto de portfólio, marca fictícia.</p>
        </div>
      </div>
      <p className="footer-wordmark" aria-hidden="true">Torra Alta</p>
      <details className="photo-credits frame">
        <summary>Fotografia e créditos</summary>
        <ul>
          <li>
            Campos do Parque Estadual do Tainhas — Rodrigo Alexandre Geyer
            Kaspary,
            <a href="https://creativecommons.org/licenses/by-sa/3.0/"
              >CC BY-SA 3.0</a
            >.
            <a
              href="https://commons.wikimedia.org/wiki/File:Campos_do_Parque_estadual_do_Tainhas.jpg"
              >Original</a
            >.
          </li>
          <li>
            Pedra dos Três Pontos ES 01 — Martin Thurnherr,
            <a href="https://creativecommons.org/licenses/by-sa/4.0/"
              >CC BY-SA 4.0</a
            >.
            <a href="https://commons.wikimedia.org/w/index.php?curid=117677306"
              >Original</a
            >.
          </li>
          <li>
            Roasted coffee beans on the surface. 01 — A S M Jobaer,
            <a href="https://creativecommons.org/licenses/by-sa/4.0/"
              >CC BY-SA 4.0</a
            >.
            <a
              href="https://commons.wikimedia.org/wiki/File:Roasted_coffee_beans_on_the_surface._01.jpg"
              >Original</a
            >.
          </li>
          <li>
            Manual drip (pour-over) coffee — Kim Sanso,
            <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0</a
            >.
            <a href="https://commons.wikimedia.org/w/index.php?curid=70214599"
              >Original</a
            >.
          </li>
          <li>
            Curvas sinuosas e paredões de formação em basalto do Canyon
            Itaimbezinho e ao fundo o Rio do Boi — Portal dos Canyons,
            <a href="https://creativecommons.org/licenses/by-sa/4.0/"
              >CC BY-SA 4.0</a
            >.
            <a href="https://commons.wikimedia.org/w/index.php?curid=49688708"
              >Original</a
            >.
          </li>
          <li>
            Vídeo Kaffe - Ystad-2024 — Foto: Jonn Leffmann,
            <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a
            >.
            <a
              href="https://commons.wikimedia.org/wiki/File:Kaffe_-_Ystad-2024.ogg"
              >Original</a
            >.
          </li>
        </ul>
      </details>
    </footer>
  </>);
}
