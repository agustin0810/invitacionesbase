import React from 'react';
import '../styles/Input.css';

const InputText = ({placeholder, visible, onChange}) =>{
    return(
        <div style={{display: visible!=null && visible==false?"none":"block"}}className="InputText">
            <input onChange={onChange} type="text" placeholder={placeholder} />
        </div>

    )
}

export default InputText;