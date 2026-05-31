import { countryToSexToAge } from './data'

export const WEEK_MS = 7 * 24 * 60 * 60 * 1000

export function calcWeeks(country, sex, dateBorn) {
    if (!country || !sex) return null
    const totalYears = parseFloat(countryToSexToAge[country][sex].replaceAll(',', '.'))
    const weeksTotal = Math.ceil(totalYears * 52)
    const weeksLived = dateBorn
        ? Math.floor((Date.now() - dateBorn.getTime()) / WEEK_MS)
        : -1
    return [weeksLived, weeksTotal]
}
