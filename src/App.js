import { useState } from 'react';
import './App.css';
import CountrySelector from './CountrySelector';
import SexSelector from './SexSelector';
import WeeksRenderer from './WeeksRenderer';

const defaultCountry = 'Россия'
const defaultSex = 'men'


function App() {
  const [countryState, setCountryState] = useState(defaultCountry)
  const [sexState, setSexState] = useState(defaultSex)

  return (
    <div>
      <CountrySelector setCountryState={setCountryState}/>
      <SexSelector setSexState={setSexState} />
      <WeeksRenderer countryState={countryState} sexState={sexState} />
    </div>
  );
}

export default App;
