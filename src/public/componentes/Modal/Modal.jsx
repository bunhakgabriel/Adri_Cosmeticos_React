import './Modal.css'

const Modal = ({produto, abrirModal}) => {
    if(produto.expandir){
        return (
            <dialog id="modal" open={produto.expandir} onClick={() => abrirModal(produto)}>
                <div className='produtos-modal'>
                    <img src={produto.url} />
                    <div className='conteudo'>
                        <p>Código: {produto.codigo}</p>
                        <h1>{produto.produto}</h1>
                        <p>{produto.descricao}</p>
                    </div>
                </div>
            </dialog>
        )
    }
}

export default Modal;