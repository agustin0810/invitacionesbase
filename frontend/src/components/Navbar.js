import React, { useState } from "react";
import '../styles/Navbar.css';
import butterflies from '../images/butterflies.png'
const Navbar = () => {

    // to change burger classes
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    // toggle burger menu change
    const updateMenu = () => {
        if(!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
        }
        setIsMenuClicked(!isMenuClicked)
    }

    return(
        <div style={{width: '100%'}}>
            <nav>
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                </div>
                <div className='HeaderTitle'>
                    <p> Mis 15 </p>
                    <p>Maia</p>
                </div>
                <div style={{flex: 1}}></div>
                <img src={butterflies} className="HeaderImg"/>
            </nav>

            <div className={menu_class}>
                <ul>
                    <li>Opción 1</li>
                    <li>Opción 2</li>
                    <li>Opción 3</li>
                    <li>Opción 4</li>
                    <li>Opción 5</li>
                    <li>Opción 6</li>

                </ul>
            </div>
        </div>
    )
}

export default Navbar