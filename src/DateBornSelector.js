import { useState } from 'react'

function formatDigits(digits) {
    if (digits.length <= 2) return digits
    if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`
    return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`
}

function parseDate(digits) {
    if (digits.length !== 8) return null
    const d = +digits.slice(0, 2)
    const m = +digits.slice(2, 4)
    const y = +digits.slice(4, 8)
    if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > new Date().getFullYear()) return null
    const date = new Date(y, m - 1, d)
    if (date.getMonth() !== m - 1) return null
    return date
}

export default function DateBornSelector({ setDateBorn }) {
    const [display, setDisplay] = useState('')
    const [focused, setFocused] = useState(false)
    const [invalid, setInvalid] = useState(false)

    function handleChange(e) {
        const prevDisplay = display
        const newRaw = e.target.value

        let digits = newRaw.replace(/\D/g, '').slice(0, 8)

        // Если длина стала меньше и цифры не изменились — удалён разделитель
        if (newRaw.length < prevDisplay.length && digits === prevDisplay.replace(/\D/g, '')) {
            digits = digits.slice(0, -1)
        }

        const formatted = formatDigits(digits)
        setDisplay(formatted)

        if (digits.length === 8) {
            const date = parseDate(digits)
            setInvalid(!date)
            setDateBorn(date)
        } else {
            setInvalid(false)
            setDateBorn(null)
        }
    }

    const borderColor = invalid ? '#c00' : focused ? '#000' : '#ccc'

    return (
        <div style={{ marginBottom: 24, maxWidth: 320 }}>
            <label style={labelStyle}>Дата рождения</label>
            <input
                type="text"
                inputMode="numeric"
                value={display}
                onChange={handleChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="ДД.ММ.ГГГГ"
                style={{
                    display: 'block',
                    width: '100%',
                    border: 'none',
                    borderBottom: `1px solid ${borderColor}`,
                    padding: '6px 0',
                    fontSize: 16,
                    outline: 'none',
                    background: 'transparent',
                    color: invalid ? '#c00' : '#000',
                    transition: 'border-color 0.15s',
                    boxSizing: 'border-box',
                    letterSpacing: '0.04em',
                }}
            />
            {invalid && (
                <span style={{ fontSize: 11, color: '#c00', marginTop: 4, display: 'block' }}>
                    Неверная дата
                </span>
            )}
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
