import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateBornSelector({ dateBorn, setDateBorn }) {


    return (
        <div style={{ width: "300px", display: "inline-block" }}>
            <DatePicker
                selected={dateBorn}
                onChange={setDateBorn}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select your birthday"
            />
        </div>
    )
}