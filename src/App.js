import { useState, useRef, useEffect } from 'react';
import './App.css';
import CountrySelector from './CountrySelector';
import SexSelector from './SexSelector';
import DateBornSelector from './DateBornSelector';
import WeeksRenderer from './WeeksRenderer';
import SuggestionList from './SuggestionList';
import { calcWeeks } from './calcWeeks';

function App() {
  const [countryState, setCountryState] = useState()
  const [sexState, setSexState] = useState()
  const [dateBorn, setDateBorn] = useState()
  const [selectorsHeight, setSelectorsHeight] = useState(null)
  const selectorsRef = useRef(null)

  useEffect(() => {
    const el = selectorsRef.current
    if (!el) return
    const observer = new ResizeObserver(entries => {
      setSelectorsHeight(entries[0].contentRect.height)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const weeks = calcWeeks(countryState, sexState, dateBorn)
  const [weeksLived, weeksTotal] = weeks ?? [-1, 0]

  return (
    <div style={{ width: 'fit-content', margin: '0 auto', padding: '40px 32px' }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Сколько тебе недель осталось?</h2>
      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
        <div ref={selectorsRef} style={{ flexShrink: 0, width: 320 }}>
          <CountrySelector setCountryState={setCountryState} />
          <SexSelector setSexState={setSexState} />
          <DateBornSelector setDateBorn={setDateBorn} dateBorn={dateBorn} />
        </div>
        <div style={{ flexShrink: 0, width: 220, paddingTop: 4, overflow: 'hidden', maxHeight: selectorsHeight ?? 'none' }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#555' }}>
            Что можно успеть
          </h3>
          <SuggestionList weeksLived={weeksLived} weeksTotal={weeksTotal} sex={sexState} />
        </div>
      </div>
      <WeeksRenderer countryState={countryState} sexState={sexState} dateBorn={dateBorn} />
    </div>
  );
}

export default App;
