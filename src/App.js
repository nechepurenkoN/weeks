import { useState } from 'react';
import './App.css';
import CountrySelector from './CountrySelector';
import SexSelector from './SexSelector';
import DateBornSelector from './DateBornSelector';
import WeeksRenderer from './WeeksRenderer';
import SuggestionList from './SuggestionList';
import { calcWeeks } from './calcWeeks';

function App() {
  const [country, setCountry] = useState()
  const [sex, setSex] = useState()
  const [dateBorn, setDateBorn] = useState()

  const weeks = calcWeeks(country, sex, dateBorn)
  const [weeksLived, weeksTotal] = weeks ?? [-1, 0]

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', width: 'fit-content', margin: '0 auto' }}>
      <div style={{ width: 340, flexShrink: 0, padding: '32px 24px', overflowY: 'auto' }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Сколько тебе недель осталось?</h2>
        <CountrySelector onChange={setCountry} />
        <SexSelector value={sex} onChange={setSex} />
        <DateBornSelector onChange={setDateBorn} />
        <div style={{ marginTop: 24 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#555' }}>
            Что можно успеть
          </h3>
          <SuggestionList weeksLived={weeksLived} weeksTotal={weeksTotal} sex={sex} />
        </div>
      </div>
      <div style={{ padding: '32px' }}>
        <WeeksRenderer weeks={weeks} dateBorn={dateBorn} />
      </div>
    </div>
  );
}

export default App;
