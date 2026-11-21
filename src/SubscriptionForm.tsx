import { useState, type FormEvent } from 'react';
import ClickSpark from './react-bits/ClickSpark';
import CountUp from './react-bits/CountUp';
import Magnet from './react-bits/Magnet';
import { subscriptionSummary } from './subscription.ts';

const coffees = ['Seleção da torrefação', 'Encosta', 'Neblina', 'Cume'];
const grinds = ['Em grãos', 'Moído para coador', 'Moído para prensa francesa', 'Moído para espresso'];
const plans = [
  { value: '500', name: 'Pausa diária', packs: '2 pacotes de 250 g', price: 76 },
  { value: '1000', name: 'Casa cheia', packs: '4 pacotes de 250 g', price: 144 },
];

export default function Subscription({ coffee, onCoffeeChange }: { coffee: string; onCoffeeChange: (value: string) => void }) {
  const [plan, setPlan] = useState('500');
  const [grind, setGrind] = useState(grinds[0]);
  const [message, setMessage] = useState('');
  const summary = subscriptionSummary(plan, coffee, grind);

  function submit(event: FormEvent) {
    event.preventDefault();
    setMessage(`Sua simulação: ${summary.packs} pacotes, ${coffee.toLocaleLowerCase('pt-BR')}, ${grind.toLocaleLowerCase('pt-BR')}, ${summary.price} reais por mês. Nada foi enviado ou cobrado.`);
  }

  return (
    <form className="subscription-form" data-reveal onSubmit={submit} onChange={() => setMessage('')}>
      <fieldset>
        <legend>Quanto café cabe na sua rotina?</legend>
        <div className="plan-options">
          {plans.map(p => (
            <label key={p.value}>
              <input type="radio" name="plan" value={p.value} checked={plan === p.value} onChange={() => setPlan(p.value)} />
              <span>
                <strong>{p.name}</strong><span>{p.packs}</span>
                <b>R$ {p.price} <small>/ mês</small></b>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="select-row">
        <label htmlFor="coffee">Seu café
          <select id="coffee" name="coffee" value={coffee} onChange={e => onCoffeeChange(e.target.value)}>
            {coffees.map(c => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label htmlFor="grind">Como você prepara?
          <select id="grind" name="grind" value={grind} onChange={e => setGrind(e.target.value)}>
            {grinds.map(g => <option key={g}>{g}</option>)}
          </select>
        </label>
      </div>
      <div className="subscription-summary" aria-live="polite" aria-atomic="true">
        <p id="plan-summary">{summary.text}</p>
        <p className="summary-price" id="plan-price">
          <CountUp to={summary.price} prefix="R$ " duration={0.8} trigger="load" /> <span>/ mês</span>
        </p>
        <p className="small">Frete calculado em uma operação real. Sem fidelidade.</p>
      </div>
      <ClickSpark sparkColor={['#c9b78a', '#e9e2d0']} sparkCount={10} sparkRadius={34} duration={520} style={{ display: 'block' }}>
        <Magnet magnetStrength={6} maxOffset={10} padding={40}>
          <button className="button" type="submit">Simular assinatura</button>
        </Magnet>
      </ClickSpark>
      <p className="form-message" id="form-message" role="status">{message}</p>
      <p className="small">Demonstração de portfólio. Nenhuma cobrança ou coleta de dados.</p>
    </form>
  );
}
