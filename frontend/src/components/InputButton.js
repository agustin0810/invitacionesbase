import React from "react";
import '../styles/Input.css'

const InputButton = ({onClick, value}) =>{

    return(
        <div className="InputButton">
            <input type="button" value={value} onClick={onClick} /> 
        </div>
    )
}
export default InputButton;