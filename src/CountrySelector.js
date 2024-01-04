import { countryToSexToAge } from './data';

export default function CountrySelector({ setCountryState }) {

    return (
        <select onChange={(ev) => setCountryState(ev.target.value)}>
            {Object.keys(countryToSexToAge).map(key => (
                <option key={key} value={key}>{key}</option>
            ))}
        </select>
    )

}