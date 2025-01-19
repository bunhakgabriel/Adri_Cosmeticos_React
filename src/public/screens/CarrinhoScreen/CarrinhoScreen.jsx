import { useContext } from 'react';
import './CarrinhoScreen.css'
import { CarrinhoContext } from '../../Context/CarrinhoContext';
import CardProdutoCarrinho from './componentes/CardProdutoCarrinho/CardProdutoCarrinho';

const CarrinhoScreen = () => {

    const { carrinho } = useContext(CarrinhoContext)

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
                                    key={itemCarrinho.codigo}
                                    produto={itemCarrinho}
                                />
                            )
                        }
                    }) :
                    <h3 className='sem-produtos' >Não há produtos no carrinho</h3>
                }
            </div>
        </div>
    )
}

export default CarrinhoScreen;