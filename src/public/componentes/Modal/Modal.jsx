import './Modal.css'
import { IoAdd, IoRemoveOutline } from "react-icons/io5";

const Modal = ({ produto, abrirModal, colecao }) => {
    const message = 
        `
        Olá, boa tarde! Tenho interesse em um de seus produtos, gostaria de saber mais informações sobre o(a) ${produto.produto}
        `
    const whatsappLink = `https://wa.me/5541996983316?text=${message}`;
    
    const abrirWapp = () => {
        window.open(whatsappLink, '_blank');
    }

    if (produto.expandir) {
        return (
            <dialog id="modal" open={produto.expandir} onClick={() => abrirModal(produto, colecao)}>
                <div className='produtos-modal'>
                    <img src={produto.imagem} />
                    <div className='conteudo'>
                        <p>Código: {produto.id}</p>
                        <h1>{produto.produto}</h1>
                        <p>{produto.descricao}</p>
                        <div className='preco' >
                            <h3>R$ {produto.preco}</h3>
                            <button className='saiba-mais' onClick={abrirWapp} >Saiba mais</button>
                        </div>
                    </div>
                </div>
            </dialog>
        )
    }
}

export default Modal;