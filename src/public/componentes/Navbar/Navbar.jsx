import './Navbar.css'
import { Link, useLocation } from 'react-router-dom';
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { useContext, useState } from 'react';
import { CarrinhoContext } from '../../Context/CarrinhoContext';

const Navbar = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const path = useLocation().pathname;
    const { contatoRef, mapaRef } = useContext(CarrinhoContext);

    const scrollPage = (ref) => {
        setMobileMenu(false)
        ref.current.scrollIntoView({ behavior: 'smooth' });
    }

    const scrollToTop = () => {
        setMobileMenu(false)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

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
                    <Link
                        onClick={() => scrollToTop()}
                        className={`link ${path === '/' ? 'active' : ''}`}
                        to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        onClick={() => setMobileMenu(false)}
                        className={`link ${path === '/produtos' ? 'active' : ''}`}
                        to="/produtos">
                        Produtos
                    </Link>
                </li>
                {path === '/' && <li>
                    <Link
                        onClick={() => scrollPage(mapaRef)}
                        className='link'>
                        Como Chegar
                    </Link>
                </li>}
                <li>
                    <Link
                        onClick={() => scrollPage(contatoRef)}
                        className='link'>
                        Fale conosco
                    </Link>
                </li>
                <li>
                    <Link
                        onClick={() => scrollToTop()}
                        className={`link ${path === '/carrinho' ? 'active' : ''}`}
                        to="/carrinho">
                        Carrinho
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;