import './ProdutosScreen.css'
import Produto from '../../componentes/Produto/Produto';
import { getColecaoProdutos } from './ProdutoService';
import { useEffect, useState, useRef } from 'react';
import Modal from '../../componentes/Modal/Modal';

const ColecaoProdutos = ({colecao, title, abrirModal}) => {
    return (
        <div className='colecao-produtos-container'>
            <h1>{title}</h1>
            {colecao.map(produto => {
                return (
                    <div key={produto.codigo}>
                        <Produto
                            produto={produto}
                            abrirModal={abrirModal}
                        />
                        <Modal
                            produto={produto}
                            abrirModal={abrirModal}
                        />
                    </div>
                )
            })}
        </div>
    )
}

const ProdutosScreen = () => {
    const backendCalled = useRef(false);
    const [manicurePedicure, setManicurePedicure] = useState([]);
    const [salao, setSalao] = useState([]);
    const [lash, setLash] = useState([]);

    const abrirModal = (produto) => {
        setManicurePedicure(manicurePedicure.map(manicure => {
            if(produto.codigo == manicure.codigo){
                manicure.expandir = !manicure.expandir
            }
            return manicure
        }))
        setSalao(salao.map(salao => {
            if(produto.codigo == salao.codigo){
                salao.expandir = !salao.expandir
            }
            return salao
        }))
        setLash(lash.map(lash => {
            if(produto.codigo == lash.codigo){
                lash.expandir = !lash.expandir
            }
            return lash
        }))
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!backendCalled.current) {
                backendCalled.current = true;
                const dataManicurePedicure = await getColecaoProdutos('manicurePedicure');
                const dataSalao = await getColecaoProdutos('salao');
                const dataLash = await getColecaoProdutos('lash');
                setManicurePedicure(dataManicurePedicure);
                setSalao(dataSalao);
                setLash(dataLash);
            }
        }
        fetchData();
    }, [])

    return (
        <div id='produtos'>
            <ColecaoProdutos
                colecao={manicurePedicure}
                title='Linha profissional manicure e pedicure'
                abrirModal={abrirModal}
            />
            <ColecaoProdutos
                colecao={salao}
                title='Linha profissional salão'
                abrirModal={abrirModal}
            />
            <ColecaoProdutos
                colecao={lash}
                title='Lash Designer'
                abrirModal={abrirModal}
            />
        </div>
    )
}

export default ProdutosScreen;