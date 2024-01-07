import Select from "react-select"

const fromToLang = {
    en: {
        "Мужчина": "men",
        "Женщина": "women"
    }
}

function locale(sex) {
    return fromToLang.en[sex]
}

export default function SexSelector({ setSexState }) {

    const choice = ['Мужчина', 'Женщина']

    return (
        <div style={{ width: "300px", display: "inline-block" }}>
            <Select
                options={choice.map(sex => { return { value: locale(sex), label: sex } })}
                onChange={(option, action) => setSexState(option.value)}
            />
        </div>
    )
}