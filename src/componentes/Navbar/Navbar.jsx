import './Navbar.css'

const Navbar = () => {
    return (
        <div id="navbar">
            <ul>
                <li>
                    <a className='link'>Home</a>
                </li>
                <li>
                    <a className='link'>Produtos</a>
                </li>
                <li>
                    <a className='link'>Como Chegar</a>
                </li>
                <li>
                    <a className='link'>Fale conosco</a>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;