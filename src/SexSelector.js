
const fromToLang = {
    en: {
        "Мужчина": "men",
        "Женщина": "women"
    }
}

function locale(sex) {
    return fromToLang.en[sex]
}

export default function SexSelector( {setSexState} ) {

    const choice = ['Мужчина', 'Женщина']

    return (
        <select onChange={(ev) => setSexState(locale(ev.target.value))}>
            {choice.map(sex => (
                <option key={sex} value={sex}>{sex}</option>
            ))}
        </select>
    )
}