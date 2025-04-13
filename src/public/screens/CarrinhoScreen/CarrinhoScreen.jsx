import { useContext, useState } from 'react';
import './CarrinhoScreen.css'
import { CarrinhoContext } from '../../Context/CarrinhoContext';
import CardProdutoCarrinho from './componentes/CardProdutoCarrinho/CardProdutoCarrinho';
import { Link } from 'react-router-dom';
import ModalFormulario from './componentes/ModalFormulario/ModalFormulario';

const CarrinhoScreen = () => {

    const { carrinho, totalProdutos } = useContext(CarrinhoContext)
    const [finalizarPedido, setFinalizarPedido] = useState(false);

    const concluirPedido = () => {
        if(carrinho.length === 0) {
            return alert('O carrinho esta vazio! Adicione algum produto para finalizar o pedido.');
        }
        setFinalizarPedido(true);
    }

    return (
        <div id='carrinho-screen'>
            <h1 className='title-carrinho-screen' >Carrinho de Compras</h1>
            <div className='itens-carrinho' >
                <h2>Detalhes do pedido</h2>
                {carrinho.length > 0 ?
                    carrinho.map(itemCarrinho => {
                        if (itemCarrinho.quantidade > 0) {
                            return (
                                <CardProdutoCarrinho
                                    key={itemCarrinho.id}
                                    produto={itemCarrinho}
                                />
                            )
                        }
                    }) :
                    <h3 className='sem-produtos' >Não há produtos no carrinho</h3>
                }
            </div>
            <div className='total-carrinho'>
                <div className='valor'>
                    <h2>Sumário</h2>
                    <span>{totalProdutos.quantidade} produto(s)</span>
                    <span
                        style={{ textAlign: 'right' }}>
                        R$ {totalProdutos.valor.toFixed(2) || '0.00'}
                    </span>
                    <div className='hr'></div>
                    <span style={{ color: '#daff01' }}>
                        Total
                    </span>
                    <span
                        style={{ color: '#daff01', textAlign: 'right' }}
                    >
                        R$ {totalProdutos.valor.toFixed(2) || '0.00'}
                    </span>
                </div>
                <div className='funcoes'>
                    <Link className='link' to='/produtos'>Adicionar mais itens</Link>
                    <button onClick={() => concluirPedido()}>Finalizar pedido</button>
                </div>
            </div>
            <ModalFormulario finalizarPedido={finalizarPedido} setFinalizarPedido={setFinalizarPedido} />
        </div>
    )
}

export default CarrinhoScreen;