import { useState } from 'react'

const options = [
    { label: 'Мужчина', value: 'men' },
    { label: 'Женщина', value: 'women' },
]

export default function SexSelector({ setSexState }) {
    const [selected, setSelected] = useState(null)

    function pick(value) {
        setSelected(value)
        setSexState(value)
    }

    return (
        <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Пол</label>
            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                {options.map(({ label, value }) => (
                    <button
                        key={value}
                        onClick={() => pick(value)}
                        style={{
                            padding: '6px 20px',
                            border: '1px solid',
                            borderColor: selected === value ? '#000' : '#ccc',
                            background: selected === value ? '#000' : 'transparent',
                            color: selected === value ? '#fff' : '#555',
                            cursor: 'pointer',
                            fontSize: 14,
                            letterSpacing: '0.02em',
                            transition: 'all 0.15s',
                            borderRadius: 0,
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    )
}

const labelStyle = {
    display: 'block',
    fontSize: 11,
    letterSpacing: '0.09em',
    textTransform: 'uppercase',
    color: '#888',
}
