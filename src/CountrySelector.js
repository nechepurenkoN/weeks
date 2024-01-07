import { countryToSexToAge } from './data';
import Select from 'react-select'

const choice = Object.keys(countryToSexToAge).sort()

export default function CountrySelector({ setCountryState }) {

    return (
        <div style={{ width: "300px", display: "inline-block" }}>
            <Select
                options={choice.map(country => { return { label: country, value: country } })}
                formatOptionLabel={country => (
                    <div className='country-option'>
                        <img src={countryToSexToAge[country.value].flag} style={{ display: "inline", marginRight: "5px" }} />
                        <span>{country.label}</span>
                    </div>
                )}
                onChange={(option, action) => setCountryState(option.value)}
                autosize={true}
            />
        </div>
    )

}