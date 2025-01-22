import { createContext, useState } from "react"

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({children}) => {

    const [carrinho, setCarrinho] = useState([]);

    const adicionarAoCarrinho = (produto) => {
        const array = [...carrinho];
        const index = array.findIndex(item => item.codigo === produto.codigo);
        
        if(index === -1){
            produto.quantidade = 1;
            array.push(produto);
        } else {
            produto.quantidade += 1;
            array.splice(index, 1, produto);
        }
        setCarrinho(array);
    }

    const removerDoCarrinho = (produto) => {
        if(!produto.quantidade) return;

        const array = [...carrinho];
        const index = array.findIndex(item => item.codigo === produto.codigo);
        produto.quantidade -= 1;
        produto.quantidade == 0 ? array.splice(index, 1) :array.splice(index, 1, produto);
        setCarrinho(array);
    }

    const obterQuantidadeProduto = (codigo) => {
        const item = carrinho.find((item) => item.codigo === codigo);
        return item ? item.quantidade : 0;
    };

    return (
        <CarrinhoContext.Provider 
            value={{ 
                carrinho, 
                adicionarAoCarrinho, 
                removerDoCarrinho, 
                obterQuantidadeProduto 
            }}>
            {children}
        </CarrinhoContext.Provider>
    )
}