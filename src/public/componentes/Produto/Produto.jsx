import { useContext, useState } from 'react';
import './Produto.css'

import { IoAdd, IoRemoveOutline } from "react-icons/io5";
import { CarrinhoContext } from '../../Context/CarrinhoContext';

export const Produto = ({ produto, abrirModal, colecao }) => {

    const [refreshComponent, setRefreshComponent] = useState(false);
    const { carrinho, adicionarAoCarrinho, removerDoCarrinho } = useContext(CarrinhoContext);

    const salvarStorage = () => {
        localStorage.carrinho = JSON.stringify(carrinho);
    }

    const addCarrinho = () => {
        adicionarAoCarrinho(produto);
        setRefreshComponent(!refreshComponent)
    }

    const removeCarrinho = () => {
        removerDoCarrinho(produto);
        setRefreshComponent(!refreshComponent)
    }

    const init = () => {
        salvarStorage();
        carrinho.forEach(itemCarrinho => {
            if(itemCarrinho.id === produto.id){
                produto.quantidade = itemCarrinho.quantidade
            }
        })
    } 

    init();

    return (
        <div id='produto' style={{ opacity: produto.estoque == 0 ? 0.5 : 1 }}>
            {produto.estoque == 0 && <div className='indisponivel'>Indisponível</div>}
            <img className='img-produto' src={produto.imagem} onClick={() => abrirModal(produto, colecao)} />
            <h4>{produto.nome}</h4>
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