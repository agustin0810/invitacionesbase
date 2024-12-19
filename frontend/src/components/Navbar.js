import React, { useState } from "react";
import '../styles/Navbar.css';
import butterflies from '../images/butterflies.png';

const Navbar = () => {

    // to change burger classes
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
    const [menu_class, setMenuClass] = useState("menu hidden");
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    // toggle burger menu change
    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked");
            setMenuClass("menu visible");
        } else {
            setBurgerClass("burger-bar unclicked");
            setMenuClass("menu hidden");
        }
        setIsMenuClicked(!isMenuClicked);
    };

    // Function to scroll to a specific section
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsMenuClicked(false);
        setBurgerClass("burger-bar unclicked");
        setMenuClass("menu hidden");
    };

    return (
        <div style={{ width: '100%' }}>
            <nav>
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                </div>
                <div className='HeaderTitle'>
                    <p>Mis 15</p>
                    <p>Maia</p>
                </div>
                <div style={{ flex: 1 }}></div>
                <img src={butterflies} className="HeaderImg" />
            </nav>

            <div className={menu_class}>
                <ul>
                    <li onClick={() => scrollToSection("portada")}>Inicio</li>
                    <li onClick={() => scrollToSection("vestimenta")}>Vestimenta</li>
                    <li onClick={() => scrollToSection("confirmar-asistencia")}>Confirmar asistencia</li>
                    <li onClick={() => scrollToSection("fotos")}>Fotos</li>
                    <li onClick={() => scrollToSection("sugerencia-canciones")}>Sugerencia de canciones</li>
                    <li onClick={() => scrollToSection("reserva-alojamiento")}>Reserva tu alojamiento</li>
                    <li onClick={() => scrollToSection("regalos")}>Regalos</li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
