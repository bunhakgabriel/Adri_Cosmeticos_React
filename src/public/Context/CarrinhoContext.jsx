import { createContext, useState } from "react"

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {

    const [carrinho, setCarrinho] = useState(localStorage.carrinho ? JSON.parse(localStorage.carrinho) : []);
    const [totalProdutos, setTotalProdutos] = useState(
        localStorage.carrinho ?
        JSON.parse(localStorage.carrinho).reduce((acc, vlr) => {
            return {
                quantidade: acc.quantidade + vlr.quantidade,
                valor: acc.valor + (vlr.preco * vlr.quantidade)
            };
        }, { quantidade: 0, valor: 0.00 }) : 
        { quantidade: 0, valor: 0.00 }
    );

    const adicionarAoCarrinho = (produto) => {
        const array = carrinho;
        const index = array.findIndex(item => item.codigo === produto.codigo);

        if (index === -1) {
            produto.quantidade = 1;
            array.push(produto);
        } else {
            produto.quantidade += 1;
            array.splice(index, 1, produto);
        }
        setCarrinho(array);
        setTotalProdutos(preview => {
            return {
                quantidade: preview.quantidade + 1,
                valor: preview.valor + Number(produto.preco)
            }
        });
    }

    const removerDoCarrinho = (produto) => {
        if (!produto.quantidade) return;

        const array = carrinho;
        const index = array.findIndex(item => item.codigo === produto.codigo);
        produto.quantidade -= 1;
        produto.quantidade == 0 ? array.splice(index, 1) : array.splice(index, 1, produto);
        setCarrinho(array);
        setTotalProdutos(preview => {
            return {
                quantidade: preview.quantidade - 1,
                valor: preview.valor - Number(produto.preco)
            }
        });
    }

    const zerarQuantidade = (produto) => {
        const array = [...carrinho];
        const index = array.findIndex(item => item.codigo === produto.codigo);
        array.splice(index, 1)
        setCarrinho(array);
        setTotalProdutos(preview => {
            return {
                quantidade: preview.quantidade - produto.quantidade,
                valor: preview.valor - (Number(produto.preco) * produto.quantidade)
            }
        });
    }

    return (
        <CarrinhoContext.Provider
            value={{
                carrinho,
                adicionarAoCarrinho,
                removerDoCarrinho,
                zerarQuantidade,
                totalProdutos
            }}>
            {children}
        </CarrinhoContext.Provider>
    )
}