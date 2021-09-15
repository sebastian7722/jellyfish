import logo from '../img/logo.svg';
import github from '../img/github.svg';
import { Link } from 'react-router-dom';
import { ReactFragment, useState, useEffect, SetStateAction, Dispatch, useRef } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import { CSSTransition } from 'react-transition-group';

function Navigation() {
    const isTablet = useMediaQuery('(min-width: 580px)');

    const [open, setOpen] = useState(false);

    const adress = window.location.pathname;
    const [linkHome, setLinkHome] = useState("link");
    const [linkShop, setLinkShop] = useState("link");
    const [linkForum, setLinkForum] = useState("link");

    useEffect(() => {
        if (adress === "/") {
            setLinkHome("link link-active")
            setLinkShop("link")
            setLinkForum("link")
        } else if (adress === "/shop") {
            setLinkHome("link")
            setLinkShop("link link-active")
            setLinkForum("link")
        } else if (adress === "/forum") {
            setLinkHome("link")
            setLinkShop("link")
            setLinkForum("link link-active")
        }
    }, [adress]);

    return (

        <Navbar>
            <div className="navbar-nav">
                <div className="nav-left">
                    <NavItems>
                        <Navlogo />
                        {isTablet && <NavLinks linkHome={linkHome} setLinkHome={setLinkHome} linkShop={linkShop} setLinkShop={setLinkShop} linkForum={linkForum} setLinkForum={setLinkForum} />}
                    </NavItems>
                </div>
                <div className="nav-right">
                    {isTablet && <NavBtn />}
                    {!isTablet && <Hamburger open={open} setOpen={setOpen} />}
                </div>
            </div>
            <DropdownMenu open={open} setOpen={setOpen} linkHome={linkHome} setLinkHome={setLinkHome} linkShop={linkShop} setLinkShop={setLinkShop} linkForum={linkForum} setLinkForum={setLinkForum} />
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

interface NavLinkProps {
    linkHome: string;
    linkShop: string;
    linkForum: string;
    setLinkHome: Dispatch<SetStateAction<string>>
    setLinkShop: Dispatch<SetStateAction<string>>
    setLinkForum: Dispatch<SetStateAction<string>>
}

function NavLinks(props: NavLinkProps) {

    const { linkHome, linkShop, linkForum, setLinkHome, setLinkShop, setLinkForum } = props;

    return (
        <>
            <li className="nav-home">
                <Link className={linkHome} to="/" onClick={() => { setLinkHome("link link-active"); setLinkShop("link"); setLinkForum("link") }} >Home</Link>
            </li>
            <li className="nav-shop">
                <Link className={linkShop} to="/shop" onClick={() => { setLinkHome("link"); setLinkShop("link link-active"); setLinkForum("link") }} >Shop</Link>
            </li>
            <li className="nav-forum">
                <Link className={linkForum} to="/forum" onClick={() => { setLinkHome("link"); setLinkShop("link"); setLinkForum("link link-active") }} >Forum</Link>
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

interface HamburgerProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

function Hamburger(props: HamburgerProps) {
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

interface DropdownMenuProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    linkHome: string;
    linkShop: string;
    linkForum: string;
    setLinkHome: Dispatch<SetStateAction<string>>;
    setLinkShop: Dispatch<SetStateAction<string>>;
    setLinkForum: Dispatch<SetStateAction<string>>;
}

function DropdownMenu(this: any, props: DropdownMenuProps) {

    const { open, setOpen, linkHome, linkShop, linkForum, setLinkHome, setLinkShop, setLinkForum } = props;

    const nodeRef = useRef(null)

    return (
        <CSSTransition
            in={open}
            timeout={350}
            classNames="slide"
            unmountOnExit
            nodeRef={nodeRef}
        >
            <div ref={nodeRef} className="dropdown">
                <div className="dropdown-links">
                    <div className="nav-home">
                        <Link className={linkHome} to="/" onClick={() => { setLinkHome("link link-active"); setLinkShop("link"); setLinkForum("link"); setOpen(false) }} >Home</Link>
                    </div>
                    <div className="nav-shop">
                        <Link className={linkShop} to="/shop" onClick={() => { setLinkHome("link"); setLinkShop("link link-active"); setLinkForum("link"); setOpen(false) }} >Shop</Link>
                    </div>
                    <div className="nav-forum">
                        <Link className={linkForum} to="/forum" onClick={() => { setLinkHome("link"); setLinkShop("link"); setLinkForum("link link-active"); setOpen(false) }} >Forum</Link>
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