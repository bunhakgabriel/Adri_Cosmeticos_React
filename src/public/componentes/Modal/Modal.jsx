import './Modal.css'
import { IoAdd, IoRemoveOutline } from "react-icons/io5";

const Modal = ({ produto, abrirModal, colecao }) => {
    if (produto.expandir) {
        return (
            <dialog id="modal" open={produto.expandir} onClick={() => abrirModal(produto, colecao)}>
                <div className='produtos-modal'>
                    <img src={produto.url} />
                    <div className='conteudo'>
                        <p>Código: {produto.codigo}</p>
                        <h1>{produto.produto}</h1>
                        <p>{produto.descricao}</p>
                        <div className='preco-quantidade' >
                            <h3>R$ {produto.preco}</h3>
                            <div className='quantidade'>
                                <IoRemoveOutline style={{ cursor: 'pointer' }} size={30} />
                                <span>0</span>
                                <IoAdd style={{ cursor: 'pointer' }} size={30} />
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        )
    }
}

export default Modal;