import React, { useState } from "react";
import '../styles/Input.css';

const InputNumber = ({onChange, label}) =>{

    const [number, setNum] = useState(0);

    const setNumber =(num)=>{
        if(num<21 && num>-1){
            setNum(num)
            onChange(num);
        }
    }
    return(
        <div className="InputNumber">
            <label>{label}</label>
            <div className="Selector">
                <input type="button" className="LessButton" value="-" onClick={()=>setNumber(number-1)} />
                <h1 className="NumberValue">{number}</h1>
                <input type="button" className="PlusButton" value="+" onClick={()=>setNumber(number+1)}/>
        
            </div>
            
        </div>

    )

}
export default InputNumber;