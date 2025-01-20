import './CardProdutoCarrinho.css'
import { IoAdd, IoRemoveOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { CarrinhoContext } from '../../../../Context/CarrinhoContext';
import { useContext, useState } from 'react';

const CardProdutoCarrinho = ({ produto }) => {

    const [refreshComponent, setRefreshComponent] = useState(false);
    const {
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        zerarQuantidade
    } = useContext(CarrinhoContext);

    const addCarrinho = () => {
        adicionarAoCarrinho(produto);
        setRefreshComponent(!refreshComponent)
    }

    const removeCarrinho = () => {
        removerDoCarrinho(produto);
        setRefreshComponent(!refreshComponent)
    }

    const init = () => {
        carrinho.forEach(itemCarrinho => {
            if (itemCarrinho.codigo === produto.codigo) {
                produto.quantidade = itemCarrinho.quantidade
            }
        })
    }

    init();

    return (
        <div id='card-produto-carrinho' >
            <div className='img'>
                <img height={180} width={150} src={produto.url} />
            </div>
            <div className='info'>
                <h3 className='nome-produto' >
                    {produto.produto}
                </h3>
                <h3 className='descricao'>
                    {produto.descricao}
                </h3>
            </div>
            <div className='quantidade'>
                <p>Quantidade</p>
                <div>
                    <IoRemoveOutline
                        className='icone'
                        size={20}
                        onClick={removeCarrinho}
                    />
                    <span>{produto.quantidade || 0}</span>
                    <IoAdd
                        className='icone'
                        size={20}
                        onClick={addCarrinho}
                    />
                </div>
                <p className='preco'>R$ {produto.preco}</p>
            </div>
            <div className='delete' >
                <MdDelete 
                size={30} 
                color='white' 
                onClick={() => zerarQuantidade(produto)}
                />
            </div>
        </div>
    )
}

export default CardProdutoCarrinho;