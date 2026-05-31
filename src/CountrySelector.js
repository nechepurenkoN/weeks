import { countryToSexToAge } from './data'
import { getFlag } from './emojiFlag'
import Select from 'react-select'

const options = Object.keys(countryToSexToAge).sort().map(country => ({
    value: country,
    label: country,
    flag: getFlag(country),
}))

const selectStyles = {
    control: (base, state) => ({
        ...base,
        border: 'none',
        borderBottom: `1px solid ${state.isFocused ? '#000' : '#ccc'}`,
        borderRadius: 0,
        boxShadow: 'none',
        backgroundColor: 'transparent',
        minHeight: 36,
        transition: 'border-color 0.15s',
        '&:hover': { borderBottomColor: '#000' },
    }),
    valueContainer: (base) => ({ ...base, padding: '2px 0' }),
    singleValue: (base) => ({ ...base, marginLeft: 0, color: '#000' }),
    input: (base) => ({ ...base, marginLeft: 0 }),
    placeholder: (base) => ({ ...base, marginLeft: 0, color: '#aaa' }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (base) => ({
        ...base, color: '#000', padding: '0 2px',
        '&:hover': { color: '#000' },
    }),
    menu: (base) => ({
        ...base, borderRadius: 0, border: '1px solid #e0e0e0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)', marginTop: 1,
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? '#f5f5f5' : state.isFocused ? '#fafafa' : '#fff',
        color: '#000',
        cursor: 'pointer',
        padding: '8px 12px',
    }),
}

export default function CountrySelector({ setCountryState }) {
    return (
        <div style={{ marginBottom: 24, maxWidth: 320 }}>
            <label style={labelStyle}>Страна</label>
            <Select
                options={options}
                styles={selectStyles}
                placeholder="Выберите страну"
                formatOptionLabel={opt => (
                    <span>
                        <span style={{ marginRight: 8, fontSize: 16 }}>{opt.flag}</span>
                        {opt.label}
                    </span>
                )}
                onChange={opt => setCountryState(opt.value)}
                noOptionsMessage={() => 'Не найдено'}
            />
        </div>
    )
}

const labelStyle = {
    display: 'block',
    fontSize: 11,
    letterSpacing: '0.09em',
    textTransform: 'uppercase',
    color: '#888',
    marginBottom: 6,
}
