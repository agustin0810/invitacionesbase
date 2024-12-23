import React from "react";
import '../styles/DividedSection.css';

const DividedSection = ({image, titulo, text, enlace}) =>{

    return(
        <div className="DividedSection">
            <img src ={image} />
            <div className="ContenedorTexto">
                <h1 className="Titulo">{titulo}</h1>
                <p className="Contenido">{text}</p>
                <a className="Enlace" href={enlace}>{"Reservas: "+enlace}</a>
            </div>
            

        </div>
    )
}
export default DividedSection;