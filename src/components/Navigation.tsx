import logo from '../img/logo.svg';
import github from '../img/github.svg';
import { Link } from 'react-router-dom';
import { ReactFragment, useState, useEffect, SetStateAction, Dispatch } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import { CSSTransition } from 'react-transition-group';

function Navigation(props: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>>; }) {
    const isTablet = useMediaQuery('(min-width: 480px)');
    
    const open = props.open;
    const setOpen = props.setOpen;

    const adress = window.location.pathname;
    const [linkHome, setLinkHome] = useState("link")
    const [linkShop, setLinkShop] = useState("link")

    useEffect(() => {
        if (adress === "/") {
            setLinkHome("link link-active")
            setLinkShop("link")
        } else if (adress === "/shop") {
            setLinkHome("link")
            setLinkShop("link link-active")
        }
    }, [adress]);

    return (

        <Navbar>
            <div className="navbar-nav">
                <div className="nav-left">
                    <NavItems>
                        <Navlogo />
                        {isTablet && <NavLinks linkHome={linkHome} setLinkHome={setLinkHome} linkShop={linkShop} setLinkShop={setLinkShop} />}
                    </NavItems>
                </div>
                <div className="nav-right">
                    {isTablet && <NavBtn />}
                    {!isTablet && <Hamburger open={open} setOpen={setOpen} />}
                </div>
            </div>
            <DropdownMenu open={open} setOpen={setOpen} linkHome={linkHome} setLinkHome={setLinkHome} linkShop={linkShop} setLinkShop={setLinkShop} />
        </Navbar>
    );
}

function Navbar(props: { children: ReactFragment; }) {
    return (
        <header>
            <nav className="navbar">
                {props.children}
            </nav>
        </header>
    );
}

function NavItems(props: { children: ReactFragment; }) {
    return (
        <ul className="nav-items">{props.children}</ul>
    );
}

function Navlogo() {
    return (
        <img src={logo} className="logo" alt="jellyfish logo" />
    );
}

function NavLinks(props: { linkHome: string; linkShop: string; setLinkHome: Dispatch<SetStateAction<string>>; setLinkShop: Dispatch<SetStateAction<string>>; }) {
    const linkHome = props.linkHome;
    const linkShop = props.linkShop;
    const setLinkHome = props.setLinkHome;
    const setLinkShop = props.setLinkShop;

    return (
        <>
            <li className="nav-home">
                <Link className={linkHome} to="/" onClick={() => { setLinkHome("link link-active"); setLinkShop("link") }} >Home</Link>
            </li>
            <li className="nav-shop">
                <Link className={linkShop} to="/shop" onClick={() => { setLinkShop("link link-active"); setLinkHome("link") }} >Shop</Link>
            </li>
        </>
    );
}

function NavBtn() {
    return (
        <a href="https://github.com/sebastian7722/jellyfish.git" target="_blank" rel="noreferrer" >
            <div className="btn">
                Github
                <img src={github} className="github" alt="github icon" />
            </div>
        </a>
    );
}

function Hamburger(props: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>>; }) {
    const open = props.open
    const setOpen = props.setOpen

    return (
        <div className={`hamburger${open ? " hamburger-active" : ""}`} onClick={() => setOpen(!open)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </div>
    );
}

function DropdownMenu(props: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>>; linkHome: string; linkShop: string; setLinkHome: Dispatch<SetStateAction<string>>; setLinkShop: Dispatch<SetStateAction<string>>; }) {
    const linkHome = props.linkHome;
    const linkShop = props.linkShop;
    const setLinkHome = props.setLinkHome;
    const setLinkShop = props.setLinkShop;

    const open = props.open;
    const setOpen = props.setOpen;

    return (
        <CSSTransition
            in={open}
            timeout={350}
            classNames="slide"
            unmountOnExit
        >
            <div className="dropdown">
                <div className="dropdown-links">
                    <div className="nav-home">
                        <Link className={linkHome} to="/" onClick={() => { setLinkHome("link link-active"); setLinkShop("link"); setOpen(false); }} >Home</Link>
                    </div>
                    <div className="nav-shop">
                        <Link className={linkShop} to="/shop" onClick={() => { setLinkShop("link link-active"); setLinkHome("link"); setOpen(false); }} >Shop</Link>
                    </div>
                </div>
                <a className="nav-btn" href="https://github.com/sebastian7722/jellyfish.git" target="_blank" rel="noreferrer" onClick={() => setOpen(false)} >
                    <div className="btn">
                        <img src={github} className="github" alt="github icon" />
                        <div className="btn-text">GitHub</div>
                    </div>
                </a>
            </div>
        </CSSTransition>
    );
}

export default Navigation;