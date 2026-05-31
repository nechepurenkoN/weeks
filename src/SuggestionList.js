import { useMemo } from 'react'
import { suggestions } from './suggestions'
import { useLocale } from './i18n/index'

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
    const t = useLocale()
    const ctx = buildContext(weeksLived, weeksTotal, sex)

    const ageBucket = ctx ? ctx.age : -1
    const picked = useMemo(() => {
        if (!ctx) return []
        const filtered = suggestions.filter(s => !s.when || s.when(ctx))
        return shuffle(filtered).slice(0, 3)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ageBucket, sex])

    if (!ctx) {
        return (
            <p style={{ fontSize: 13, color: '#bbb', lineHeight: 1.55, marginTop: 8 }}>
                {t.noSuggestions}
            </p>
        )
    }

    return (
        <div style={{ fontSize: 13, color: '#444', overflow: 'hidden', fontWeight: 400 }}>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {picked.map(item => {
                    const entry = t.suggestions[item.id]
                    const text = typeof entry.text === 'function' ? entry.text(ctx) : entry.text
                    const linkLabel = entry.linkLabel
                    return (
                        <li key={item.id} style={{ marginBottom: 16 }}>
                            <div style={categoryStyle}>{t.categories[item.categoryKey]}</div>
                            <div style={{ lineHeight: 1.55 }}>
                                {text}
                                {item.link && linkLabel && (
                                    <>
                                        {' '}
                                        <a
                                            href={item.link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={linkStyle}
                                        >
                                            {linkLabel} ↗
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
    fontSize: 10,
    fontWeight: 500,
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
