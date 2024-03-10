import { countryToSexToAge } from "./data"

function calcWeeks(country, sex, dateBorn) {
    if (!country || !sex || !dateBorn)
        return ""

    let weeksLived = Math.ceil(Math.abs(Date.now() - dateBorn) / (1000.0 * 60 * 60 * 24 * 7))
    let totalYears = parseFloat(countryToSexToAge[country][sex].replaceAll(',', '.'))
    let weeksTotal = Math.ceil(totalYears * 365 / 7.)
    return [weeksLived, weeksTotal]
}

export default function WeeksRenderer({ countryState, sexState, dateBorn }) {
    let [weeksLived, weeksTotal] = calcWeeks(countryState, sexState, dateBorn)
    
    const perRow = 50
    let grid = ""
    let currentInRow = 0
    for (let i = 0; i < weeksTotal; i++) {
        if (currentInRow === perRow) {
            // grid += '<br>'
            currentInRow = 0
        }
        if (weeksLived > 0) {
            grid += "x "
        } else {
            grid += "o "
        }
        weeksLived--;
        currentInRow++
    }

    return (
        <div>
            <span className={"font-medium text-xs leading-3 text-wrap"}>{grid}</span>
        </div>
    )
}