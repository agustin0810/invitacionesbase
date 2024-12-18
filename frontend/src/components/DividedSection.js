import React from "react";
import '../styles/DividedSection.css';

const DividedSection = ({image, text}) =>{

    return(
        <div className="DividedSection">
            <img src ={image} />
            <p>{text}</p>

        </div>
    )
}
export default DividedSection;