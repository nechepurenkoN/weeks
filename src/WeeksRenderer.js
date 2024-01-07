
import { countryToSexToAge } from "./data"

function calcWeeks(country, sex) {
    return parseFloat(countryToSexToAge[country][sex].replaceAll(',', '.'))
}

export default function WeeksRenderer({ countryState, sexState }) {
    const totalWeeks = calcWeeks(countryState, sexState)

    return (
        <span>{totalWeeks}</span>
    )
}