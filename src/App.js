import { useState } from 'react';
import './App.css';
import CountrySelector from './CountrySelector';

const defaultCountry = 'Россия'
const defaultSex = 'Мужчина'


function App() {
  const [countryState, setCountryState] = useState(defaultCountry)
  const [sex, setSexState] = useState(defaultSex)

  return (
    <div>
      <CountrySelector setCountryState={setCountryState}/>
    </div>
  );
}

export default App;
