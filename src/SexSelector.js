import { labelStyle } from './styles'
import { useLocale } from './i18n/index'

export default function SexSelector({ value, onChange }) {
    const t = useLocale()
    const options = [
        { label: t.male, value: 'men' },
        { label: t.female, value: 'women' },
    ]

    return (
        <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>{t.sexLabel}</label>
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
                            fontSize: 13,
                            fontWeight: 500,
                            letterSpacing: 0,
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
