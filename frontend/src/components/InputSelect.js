import React from "react"
import '../styles/Input.css';

const InputSelect = ({labelSelect, items, onChange}) =>{
    return(
        <div className="InputSelect">
            <label htmlFor="restriccionAlimenticia">{labelSelect}</label>
            <br />
            <select onChange={(e)=>onChange(e.target.value)} defaultValue={items[1]=="No"?items[1]:null}>
                {items.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default InputSelect;