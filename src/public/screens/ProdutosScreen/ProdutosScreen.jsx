import './ProdutosScreen.css'
import Produto from '../../componentes/Produto/Produto';
import { getColecaoProdutos } from './ProdutoService';
import { useEffect, useState, useRef } from 'react';
import Modal from '../../componentes/Modal/Modal';
import { debounceAsync } from '../../../utils/debounceTimeAsync';

const ColecaoProdutos = ({ colecao, title, abrirModal }) => {
    return (
        <div className='colecao-produtos-container'>
            <h1>{title}</h1>
            {colecao.array.map(produto => {
                return (
                    <div key={produto.codigo}>
                        <Produto
                            produto={produto}
                            abrirModal={abrirModal}
                            colecao={colecao.name}
                        />
                        <Modal
                            produto={produto}
                            abrirModal={abrirModal}
                            colecao={colecao.name}
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

    const abrirModal = (produto, colecao) => {
        const colecoes = { manicurePedicure, salao, lash }

        const array = colecoes[colecao].map(item =>
            item.codigo === produto.codigo ? { ...item, expandir: !item.expandir } : item
        );

        const setFunction = {
            manicurePedicure: setManicurePedicure,
            salao: setSalao,
            lash: setLash
        }[colecao];

        setFunction(array);
    }

    const filtrarPesquisa = async (value) => {
        let arrayManicurePedicure = await getColecaoProdutos('manicurePedicure');
        let arraySalao = await getColecaoProdutos('salao');
        let arrayLash = await getColecaoProdutos('lash');
        setManicurePedicure(arrayManicurePedicure.filter(produto => produto.produto.toLowerCase().includes(value.toLowerCase())));
        setSalao(arraySalao.filter(produto => produto.produto.toLowerCase().includes(value.toLowerCase())));
        setLash(arrayLash.filter(produto => produto.produto.toLowerCase().includes(value.toLowerCase())));
    }

    const filtrarPesquisaDebounce = debounceAsync(filtrarPesquisa, 500);

    return (
        <div id='produtos'>
            <div className='container-produtos'>
                <div className="input-pesquisa">
                    <input
                        type="text"
                        placeholder="Oque deseja buscar?"
                        onChange={(e) => filtrarPesquisaDebounce(e.target.value)}
                    />
                </div>
                {manicurePedicure.length > 0 && (
                    <ColecaoProdutos
                        colecao={{ array: manicurePedicure, name: 'manicurePedicure' }}
                        title='Linha profissional manicure e pedicure'
                        abrirModal={abrirModal}
                    />
                )}
                {salao.length > 0 && (
                    <ColecaoProdutos
                        colecao={{ array: salao, name: 'salao' }}
                        title='Linha profissional salão'
                        abrirModal={abrirModal}
                    />
                )}
                {lash.length > 0 && (
                    <ColecaoProdutos
                        colecao={{ array: lash, name: 'lash' }}
                        title='Lash Designer'
                        abrirModal={abrirModal}
                    />
                )}
            </div>
        </div>
    )
}

export default ProdutosScreen;