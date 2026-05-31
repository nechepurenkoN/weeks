import { labelStyle } from './styles'

const options = [
    { label: '👨 Мужчина', value: 'men' },
    { label: '👩 Женщина', value: 'women' },
]

export default function SexSelector({ value, onChange }) {
    return (
        <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Пол</label>
            <div style={{ display: 'flex', gap: 8 }}>
                {options.map(({ label, value: v }) => (
                    <button
                        key={v}
                        onClick={() => onChange(v)}
                        style={{
                            flex: 1,
                            padding: '6px 20px',
                            border: '1px solid',
                            borderColor: value === v ? '#000' : '#ccc',
                            background: value === v ? '#000' : 'transparent',
                            color: value === v ? '#fff' : '#555',
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
