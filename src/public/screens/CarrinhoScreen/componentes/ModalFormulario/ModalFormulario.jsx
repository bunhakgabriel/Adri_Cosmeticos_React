import { useContext, useState } from 'react';
import './ModalFormulario.css'
import { FaUserCircle } from "react-icons/fa";
import { CarrinhoContext } from '../../../../Context/CarrinhoContext';
import gerarPedido from './utils/GerarPedido';

const ModalFormulario = ({ finalizarPedido, closeModal }) => {

    const { carrinho, totalProdutos } = useContext(CarrinhoContext);
    const [nome, setNome] = useState('');
    const [celular, setCelular] = useState('');
    const [endereco, setEndereco] = useState('');

    const enviarPedido = () => {
        if(!nome || !celular || !endereco) return;
        gerarPedido({ nome, celular, endereco }, carrinho, totalProdutos);
    }

    if (finalizarPedido) {
        return (
            <dialog id='modal-formulario' open={finalizarPedido}>
                <div className='child-div-modal' >
                    <div className='container-icone'>
                        <div>
                            <FaUserCircle size={70} />
                            <p>Dados do cliente</p>
                        </div>
                    </div>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            type='text'
                            placeholder='Nome'
                            required
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <input
                            type='number'
                            placeholder='Celular'
                            required
                            onChange={(e) => setCelular(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='Endereço (Rua + Bairro)'
                            required
                            onChange={(e) => setEndereco(e.target.value)}
                        />
                        <div style={{ marginTop: '30px' }}>
                            <button onClick={() => enviarPedido()} >Finalizar</button>
                            <button onClick={() => closeModal(false)} >Cancelar</button>
                        </div>
                    </form>
                </div>
            </dialog>
        )
    }
}

export default ModalFormulario;