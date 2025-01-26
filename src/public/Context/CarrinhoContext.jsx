import { createContext, useState } from "react"

export const CarrinhoContext = createContext();

const teste = [
    {
      estoque: "10",
      descricao: "Removedores a base de acetona ...",
      produto: "ACETONA CINCO",
      codigo: "7896054719226",
      colecao: "manicurePedicure",
      url: "https://firebasestorage.google...",
      preco: "7.99",
      quantidade: 1,
    },
    // {
    //   preco: 5.99,
    //   estoque: 10,
    //   colecao: "manicurePedicure",
    //   descricao: "O Removedor de Esmalte com Ace...",
    //   codigo: "7896902209114",
    //   produto: "ACETONA FARMAX 100g",
    //   url: "https://firebasestorage.google...",
    //   quantidade: 1,
    // },
    // {
    //   descricao: "ADESIVOS EM GEL PARA UNHA MUDE...",
    //   estoque: "1",
    //   produto: "ADESIVO GEL P/ UNHA SABRINA SA...",
    //   preco: "20.00",
    //   colecao: "manicurePedicure",
    //   url: "https://firebasestorage.google...",
    //   codigo: "563101",
    //   quantidade: 1,
    // },
    // {
    //   estoque: "10",
    //   colecao: "manicurePedicure",
    //   codigo: "545801",
    //   produto: "ADESIVO GEL P/ UNHA SABRINA SA...",
    //   preco: "20.00",
    //   descricao: "ADESIVOS EM GEL PARA UNHA MUDE...",
    //   url: "https://firebasestorage.google...",
    //   quantidade: 1,
    // },
  ];
  

export const CarrinhoProvider = ({children}) => {

    const [carrinho, setCarrinho] = useState(teste);
    const [totalProdutos, setTotalProdutos] = useState({quantidade: 0, valor: 0.00});

    const adicionarAoCarrinho = (produto) => {
        const array = carrinho;
        const index = array.findIndex(item => item.codigo === produto.codigo);
        
        if(index === -1){
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
        if(!produto.quantidade) return;

        const array = carrinho;
        const index = array.findIndex(item => item.codigo === produto.codigo);
        produto.quantidade -= 1;
        produto.quantidade == 0 ? array.splice(index, 1) :array.splice(index, 1, produto);
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
                valor: preview.valor - (Number(produto.preco) * produto.quantidade )
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