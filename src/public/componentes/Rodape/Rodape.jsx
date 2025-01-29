import { useContext } from 'react';
import './Rodape.css'
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CarrinhoContext } from '../../Context/CarrinhoContext';

export const Rodape = () => {
    const { contatoRef } = useContext(CarrinhoContext);

    return (
        <div id="rodape">
            <h1>AdriCosméticos</h1>

            <div className="flex-bloco8">
                <div className="sobre">
                    <h3>Sobre a Loja</h3>
                    <p>
                        A AdriCosméticos foi inaugurada no ano de 2023,
                        somos um loja de cosmésticos física,
                        trabalhamos com produtos profissionais para os cabelos,
                        pele, maquiagem, e finalizadores das marcas mais conceituadas do mercado.
                        Nossa Loja atende desde profissionais da área, como consumidores finais,
                        com uma boa aparência você pode ser quem você quiser.
                    </p>
                </div>

                <div className="categorias">
                    <h3>Categorias</h3>
                    <ul>
                        <Link to='/produtos?colecao=manicurePedicure' >
                            <li>Manicure e Pedicure</li>
                        </Link>
                        <Link to='/produtos?colecao=salao' >
                            <li>Salão</li>
                        </Link>
                        <Link to='/produtos?colecao=lash' >
                            <li>Lash Designer</li>
                        </Link>
                    </ul>
                </div>

                <div className="faleConosco">
                    <div ref={contatoRef}>
                        <h3>Fale Conosco</h3>
                        <ul>
                            <li>Rua Tijucas do Sul, 247 Loja 1, Curitiba - PR - 81900-080</li>
                            <li>Celular: (41) 99698-3316</li>
                            <li>WhatsApp: (41) 99698-3316</li>
                            <li>E-mail: adricosmeticos@gmail.com</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="icones">
                <a href="https://contate.me/adrianacosmeticos">z
                    <FaWhatsapp className='icon' size={35} />
                </a>
                <a href="https://www.instagram.com/adricosmeticoscuritiba/">
                    <FaInstagram className='icon' size={35} />
                </a>
                <a href="https://www.facebook.com/adri.cosmeticos.2023">
                    <FaFacebook className='icon' size={35} />
                </a>
            </div>

            <p>2023 Copyright - AdriCosméticos</p>

        </div>
    )
}