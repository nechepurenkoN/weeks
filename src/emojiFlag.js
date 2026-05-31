import { countryIso } from './countryIso'

export function getFlag(country) {
    const iso = countryIso[country]
    if (!iso) return ''
    return [...iso.toUpperCase()].map(c =>
        String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65)
    ).join('')
}
