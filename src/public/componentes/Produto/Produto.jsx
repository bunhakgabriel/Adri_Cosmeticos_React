import './Produto.css'

import { IoAdd, IoRemoveOutline } from "react-icons/io5";

const produto = {
    codigo: "0000",
    colecao: "lash",
    descricao: "não usados por profissionais da extensão de cílios para proteger a pele abaixo dos olhos durante os procedimentos. Eles são aplicados sobre os cílios inferiores, com a parte do gel em contato com a pele.",
    estoque: "10",
    preco: "16.99",
    produto: "PADS PROTETOR DESCARTAVEL DE PALPEBRAS PARA CILIOS C/25",
    url: "https://firebasestorage.googleapis.com/v0/b/adricosmeticos-88d41.appspot.com/o/lash%2FPads%20Cilios.png?alt=media&token=230f8eec-5273-4df1-ae86-05cace2e4916"
}

export const Produto = ({ estilo }) => {
    return (
        <div id='produto'>
            <img src={produto.url} />
            <h4>{produto.produto}</h4>
            <div className='quantidade'>
                <IoRemoveOutline size={30}/>
                <span>0</span>
                <IoAdd size={30}/>
            </div>
        </div>
    )
}

export default Produto;