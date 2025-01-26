import './Navbar.css'
import { Link, useLocation } from 'react-router-dom';
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { useState } from 'react';

const Navbar = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const path = useLocation().pathname;
    console.log(path);

    return (
        <div id="navbar">
            <div className='container-icon' >
                <IoIosMenu
                    style={{ display: mobileMenu ? 'none' : 'block' }}
                    color='white'
                    size={50}
                    onClick={() => setMobileMenu(true)}
                />
                <IoMdClose 
                    style={{ display: mobileMenu ? 'block' : 'none' }}
                    color='white'
                    size={50}
                    onClick={() => setMobileMenu(false)} />
            </div>
            <ul className={mobileMenu ? 'show-menu' : 'hidden-menu'} >
                <li>
                    <Link className={`link ${path === '/' ? 'active' : ''}`} to="/">Home</Link>
                </li>
                <li>
                    <Link className={`link ${path === '/produtos' ? 'active' : ''}`} to="/produtos">Produtos</Link>
                </li>
                <li>
                    <Link className='link'>Como Chegar</Link>
                </li>
                <li>
                    <Link className='link'>Fale conosco</Link>
                </li>
                <li>
                    <Link className={`link ${path === '/carrinho' ? 'active' : ''}`} to="/carrinho">Carrinho</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;