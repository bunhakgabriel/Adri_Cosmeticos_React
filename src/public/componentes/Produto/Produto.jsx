import { useContext, useState } from 'react';
import './Produto.css'

import { IoAdd, IoRemoveOutline } from "react-icons/io5";
import { CarrinhoContext } from '../../Context/CarrinhoContext';

export const Produto = ({ produto, abrirModal, colecao }) => {
    const { adicionarAoCarrinho, removerDoCarrinho, obterQuantidadeProduto } = useContext(CarrinhoContext);
    const quantidade = obterQuantidadeProduto(produto.codigo);

    return (
        <div id='produto'>
            <img className='img-produto' src={produto.url} onClick={() => abrirModal(produto, colecao)} />
            <h4>{produto.produto}</h4>
            <div className='quantidade'>
                <IoRemoveOutline
                    className='icone'
                    size={30}
                    onClick={() => removerDoCarrinho(produto)}
                />
                <span>{quantidade}</span>
                <IoAdd
                    className='icone'
                    size={30}
                    onClick={() => adicionarAoCarrinho(produto)}
                />
            </div>
        </div>
    )
}

export default Produto;