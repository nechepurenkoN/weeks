import { useMemo } from 'react'
import { suggestions } from './suggestions'

function buildContext(weeksLived, weeksTotal, sex) {
    if (weeksLived < 0 || !sex) return null
    const age = Math.floor(weeksLived / 52)
    const weeksLeft = Math.max(0, weeksTotal - weeksLived)
    const yearsLeft = parseFloat((weeksLeft / 52).toFixed(1))
    const percentLived = parseFloat((weeksLived / weeksTotal * 100).toFixed(1))
    return { age, weeksLeft, yearsLeft, percentLived, sex: sex === 'men' ? 'm' : 'f' }
}

function shuffle(arr) {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

export default function SuggestionList({ weeksLived, weeksTotal, sex }) {
    const ctx = buildContext(weeksLived, weeksTotal, sex)

    // Re-pick при смене возраста (с шагом год) или пола
    const ageBucket = ctx ? ctx.age : -1
    const picked = useMemo(() => {
        if (!ctx) return []
        const filtered = suggestions.filter(s => !s.when || s.when(ctx))
        return shuffle(filtered).slice(0, 3)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ageBucket, sex])

    if (!ctx) {
        return (
            <p style={{ fontSize: 12, color: '#bbb', lineHeight: 1.6, marginTop: 8 }}>
                Введите дату рождения, чтобы увидеть персональные рекомендации
            </p>
        )
    }

    return (
        <div style={{ fontSize: 13, color: '#444', overflow: 'hidden' }}>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {picked.map(item => {
                    const text = typeof item.text === 'function' ? item.text(ctx) : item.text
                    return (
                        <li key={item.id} style={{ marginBottom: 16 }}>
                            <div style={categoryStyle}>{item.category}</div>
                            <div style={{ lineHeight: 1.45 }}>
                                {text}
                                {item.link && (
                                    <>
                                        {' '}
                                        <a
                                            href={item.link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={linkStyle}
                                        >
                                            {item.link.label} ↗
                                        </a>
                                    </>
                                )}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

const categoryStyle = {
    fontSize: 9,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#aaa',
    marginBottom: 4,
}

const linkStyle = {
    color: '#888',
    fontSize: 11,
    textDecoration: 'none',
    borderBottom: '1px solid #ddd',
    whiteSpace: 'nowrap',
}
