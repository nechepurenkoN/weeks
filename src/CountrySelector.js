import { countryToSexToAge } from './data';
import Select from 'react-select'

export default function CountrySelector({ setCountryState }) {

    const choice = Object.keys(countryToSexToAge)

    return (
        <Select
            options={choice.map(country => { return { label: country, value: country } })}
            formatOptionLabel={country => (
                <div className='country-option'>
                    <img src={countryToSexToAge[country.value].flag} style={{ display: "inline" }} />
                    <span>{country.label}</span>
                </div>
            )}
            onChange={(option, action) => setCountryState(option.value)}
        />
    )

}