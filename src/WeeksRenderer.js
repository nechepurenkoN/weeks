
import { countryToSexToAge } from "./data"

function calcWeeks(country, sex) {
    return countryToSexToAge[country][sex]
}

export default function WeeksRenderer({ countryState, sexState }) {
    const totalWeeks = calcWeeks(countryState, sexState)

    return (
        <span>{totalWeeks}</span>
    )
}