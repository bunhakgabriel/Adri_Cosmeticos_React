import { useContext, useState } from 'react';
import './Produto.css'

import { IoAdd, IoRemoveOutline } from "react-icons/io5";
import { CarrinhoContext } from '../../Context/CarrinhoContext';

export const Produto = ({ produto, abrirModal, colecao }) => {

    const [refreshComponent, setRefreshComponent] = useState(false);
    const { adicionarAoCarrinho, removerDoCarrinho } = useContext(CarrinhoContext);

    const addCarrinho = () => {
        adicionarAoCarrinho(produto);
        setRefreshComponent(!refreshComponent)
    }

    const removeCarrinho = () => {
        removerDoCarrinho(produto);
        setRefreshComponent(!refreshComponent)
    }

    return (
        <div id='produto'>
            <img className='img-produto' src={produto.url} onClick={() => abrirModal(produto, colecao)} />
            <h4>{produto.produto}</h4>
            <div className='quantidade'>
                <IoRemoveOutline
                    className='icone'
                    size={30}
                    onClick={removeCarrinho}
                />
                <span>{produto.quantidade || 0}</span>
                <IoAdd
                    className='icone'
                    size={30}
                    onClick={addCarrinho}
                />
            </div>
        </div>
    )
}

export default Produto;