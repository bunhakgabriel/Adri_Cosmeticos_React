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

    const salvarStorage = () => {
        localStorage.carrinho = JSON.stringify(carrinho);
    }

    const addCarrinho = () => {
        adicionarAoCarrinho(produto);
        setRefreshComponent(!refreshComponent);
        salvarStorage();
    }

    const removeCarrinho = () => {
        removerDoCarrinho(produto);
        setRefreshComponent(!refreshComponent);
        salvarStorage();
    }

    const zerarQtd = (produto) => {
        zerarQuantidade(produto);
        setRefreshComponent(!refreshComponent);
        salvarStorage();
    }

    const init = () => {
        carrinho.forEach(itemCarrinho => {
            if (itemCarrinho.id === produto.id) {
                produto.quantidade = itemCarrinho.quantidade
            }
        })
    }

    init();

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }

        const truncated = text.slice(0, maxLength);
        const lastSpaceIndex = truncated.lastIndexOf(" ");
        return truncated.slice(0, lastSpaceIndex) + "...";
    }

    return (
        <div id='card-produto-carrinho' >
            <div className='img'>
                <img src={produto.imagem} />
            </div>
            <div className='info-quantidade-delete'>
                <div className='info'>
                    <h3 className='nome-produto' >
                        {produto.produto}
                    </h3>
                    <h3 className='descricao'>
                        {truncateText(produto.descricao, 390)}
                    </h3>
                </div>
                <div className='quantidade-delete' >
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
                            size={25}
                            color='white'
                            onClick={() => zerarQtd(produto)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardProdutoCarrinho;