import { useState } from 'react'
import { countryToSexToAge } from './data'
import { getFlag } from './emojiFlag'
import Select from 'react-select'
import { labelStyle } from './styles'
import { useLocale } from './i18n/index'

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

export default function CountrySelector({ onChange }) {
    const t = useLocale()
    const [selected, setSelected] = useState(null)
    const [menuOpen, setMenuOpen] = useState(false)

    function handleChange(opt) {
        setSelected(opt)
        onChange(opt.value)
    }

    function handleKeyDown(e) {
        if (menuOpen) return
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
        e.preventDefault()
        const idx = selected ? options.findIndex(o => o.value === selected.value) : -1
        const next = e.key === 'ArrowDown'
            ? Math.min(idx + 1, options.length - 1)
            : Math.max(idx - 1, 0)
        handleChange(options[next])
    }

    return (
        <div style={{ marginBottom: 24, width: '100%' }} onKeyDownCapture={handleKeyDown}>
            <label style={labelStyle}>{t.countryLabel}</label>
            <Select
                options={options}
                value={selected}
                styles={selectStyles}
                placeholder={t.countryPlaceholder}
                formatOptionLabel={opt => (
                    <span>
                        <span style={{ marginRight: 8, fontSize: 16 }}>{opt.flag}</span>
                        {opt.label}
                    </span>
                )}
                onChange={handleChange}
                onMenuOpen={() => setMenuOpen(true)}
                onMenuClose={() => setMenuOpen(false)}
                noOptionsMessage={() => t.countryNotFound}
            />
        </div>
    )
}
