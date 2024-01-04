import { countryToSexToAge } from './data';

export default function CountrySelector({ setCountryState }) {
    
    const choice = Object.keys(countryToSexToAge)
    
    return (
        <select onChange={(ev) => setCountryState(ev.target.value)}>
            {choice.map(country => (
                <option key={country} value={country}>{country}</option>
            ))}
        </select>
    )

}