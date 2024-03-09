import { useState } from 'react';
import './App.css';
import CountrySelector from './CountrySelector';
import SexSelector from './SexSelector';
import DateBornSelector from './DateBornSelector';
import WeeksRenderer from './WeeksRenderer';


function App() {
  const [countryState, setCountryState] = useState()
  const [sexState, setSexState] = useState()
  const [dateBorn, setDateBorn] = useState()

  return (
    <div>
      <div className={"main-content-width bg-white p-8"}>
        <h2 className={"text-xl font-semibold mb-4"}>Сколько тебе недель осталось?</h2>
        <CountrySelector setCountryState={setCountryState} />
        <SexSelector setSexState={setSexState} />
        <DateBornSelector setDateBorn={setDateBorn} dateBorn={dateBorn} />
        <WeeksRenderer countryState={countryState} sexState={sexState} dateBorn={dateBorn} />
        <div className={"sidebar-width bg-gray-200 p-4"}>
          <h3 className={"text-lg font-semibold mb-4"}>Что можно успеть сделать?</h3>
          <ul>
            <li>Ну что-нибудь</li>
            <li>Ну что-нибудь</li>
            <li>Ну что-нибудь</li>
          </ul>
        </div>
      </div>

    </div>
  );
}

export default App;
