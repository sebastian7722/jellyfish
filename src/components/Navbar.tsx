import React from 'react';
import logo from '../img/logo.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

function Navbar() {
    const adress = window.location.pathname;
    const [linkHome, setLinkHome] = useState("link")
    const [linkShop, setLinkShop] = useState("link")

    useEffect(()=>{
        if (adress === "/") {
            setLinkHome("link link-active")
            setLinkShop("link")
        } else if (adress === "/shop") {
            setLinkHome("link")
            setLinkShop("link link-active")
        }
    },[adress]);

    return (
        <header className="nav">
            <ul className="nav-left">
                <li className="nav-logo">
                    <img src={logo} className="logo" alt="jellyfish logo" />
                </li>
                <li className="nav-home"><Link className={linkHome} to="/" onClick={() => {setLinkHome("link link-active");setLinkShop("link")}} >Home</Link></li>
                <li className="nav-shop"><Link className={linkShop} to="/shop" onClick={() => {setLinkShop("link link-active");setLinkHome("link")}} >Shop</Link></li>
            </ul>
        </header>
    );
}

export default Navbar;