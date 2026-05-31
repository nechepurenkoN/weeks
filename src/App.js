import { useState } from 'react';
import './App.css';
import CountrySelector from './CountrySelector';
import SexSelector from './SexSelector';
import DateBornSelector from './DateBornSelector';
import WeeksRenderer from './WeeksRenderer';
import SuggestionList from './SuggestionList';
import { calcWeeks } from './calcWeeks';
import { LocaleContext } from './i18n/index';
import { ru } from './i18n/ru';
import { en } from './i18n/en';

const locales = { ru, en }

function App() {
  const [country, setCountry] = useState()
  const [sex, setSex] = useState()
  const [dateBorn, setDateBorn] = useState()
  const [lang, setLang] = useState('ru')

  const locale = locales[lang]
  const weeks = calcWeeks(country, sex, dateBorn)
  const [weeksLived, weeksTotal] = weeks ?? [-1, 0]

  return (
    <LocaleContext.Provider value={locale}>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', width: 'fit-content', margin: '0 auto' }}>
        <div style={{ width: 340, flexShrink: 0, padding: '32px 24px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
            {['ru', 'en'].map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 20,
                  padding: '2px 4px',
                  opacity: lang === l ? 1 : 0.3,
                  transition: 'opacity 0.15s',
                  lineHeight: 1,
                }}
              >
                {l === 'ru' ? '🇷🇺' : '🇬🇧'}
              </button>
            ))}
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>{locale.heading}</h2>
          <CountrySelector onChange={setCountry} />
          <SexSelector value={sex} onChange={setSex} />
          <DateBornSelector onChange={setDateBorn} />
          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#555' }}>
              {locale.whatToDo}
            </h3>
            <SuggestionList weeksLived={weeksLived} weeksTotal={weeksTotal} sex={sex} />
          </div>
        </div>
        <div style={{ padding: '32px' }}>
          <WeeksRenderer weeks={weeks} dateBorn={dateBorn} />
        </div>
      </div>
    </LocaleContext.Provider>
  );
}

export default App;
