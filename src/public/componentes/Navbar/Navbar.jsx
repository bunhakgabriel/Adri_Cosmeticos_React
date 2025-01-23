import './Navbar.css'
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const path = useLocation().pathname;

    return (
        <div id="navbar">
            {/* <ul>
                <li>
                    <Link className={`link ${path === '/' ? 'active' : ''}`} to="/">Home</Link>
                </li>
                <li>
                    <Link className={`link ${path === '/produtos' ? 'active' : ''}`}  to="/produtos">Produtos</Link>
                </li>
                <li>
                    <Link className='link'>Como Chegar</Link>
                </li>
                <li>
                    <Link className='link'>Fale conosco</Link>
                </li>
                <li>
                    <Link className={`link ${path === '/carrinho' ? 'active' : ''}`}  to="/carrinho">Carrinho</Link>
                </li>
            </ul> */}
        </div>
    )
}

export default Navbar;