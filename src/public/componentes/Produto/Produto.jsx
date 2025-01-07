import { useState } from 'react';
import './Produto.css'

import { IoAdd, IoRemoveOutline } from "react-icons/io5";

export const Produto = ({ produto, abrirModal, colecao }) => {
    return (
        <div id='produto'>
            <img className='img-produto' src={produto.url} onClick={() => abrirModal(produto, colecao)} />
            <h4>{produto.produto}</h4>
            <div className='quantidade'>
                <IoRemoveOutline style={{ cursor: 'pointer' }} size={30} />
                <span>0</span>
                <IoAdd
                    style={{ cursor: 'pointer' }}
                    size={30}
                    onClick={() => adicionarProduto(produto)}
                />
            </div>
        </div>
    )
}

export default Produto;