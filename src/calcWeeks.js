import { countryToSexToAge } from './data'

export function calcWeeks(country, sex, dateBorn) {
    if (!country || !sex) return null
    const totalYears = parseFloat(countryToSexToAge[country][sex].replaceAll(',', '.'))
    const weeksTotal = Math.ceil(totalYears * 52)
    const weeksLived = dateBorn
        ? Math.floor((Date.now() - dateBorn) / (1000 * 60 * 60 * 24 * 7))
        : -1
    return [weeksLived, weeksTotal]
}
