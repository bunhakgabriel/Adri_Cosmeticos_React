import './ProdutosScreen.css'
import Produto from '../../componentes/Produto/Produto';
import { getColecaoProdutos } from './ProdutoService';
import { useEffect, useState, useRef } from 'react';
import Modal from '../../componentes/Modal/Modal';
import { debounceAsync } from '../../../utils/debounceTimeAsync';
import Loading from '../../componentes/Loading/Loading';
import { useSearchParams } from 'react-router-dom';
import { useProduto } from '../../hooks/useProduto';

const ColecaoProdutos = ({ colecao, title, abrirModal }) => {
    return (
        <div className='colecao-produtos-container'>
            <h1>{title}</h1>
            {colecao.array.map(produto => {
                return (
                    <div key={produto.id}>
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
    const [loading, setLoading] = useState(true);
    const manicureComponentRef = useRef(null);
    const salaoComponentRef = useRef(null);
    const lashComponentRef = useRef(null);
    const [data, setData] = useState({ manicurePedicure: [], salao: [], lash: [] })
    const [copyData, setCopyData] = useState({ manicurePedicure: [], salao: [], lash: [] })
    const [scroll, setScroll] = useState(true)
    const [html, setHtml] = useState('');

    const [searchParams] = useSearchParams();
    const colecao = searchParams.get('colecao');

    const { getProdutos } = useProduto();

    useEffect(() => {
        const fetchData = async () => {
            if (!backendCalled.current) {
                backendCalled.current = true;
                const produtos = await getProdutos()
                // const produtos = await getColecaoProdutos();
                setData(produtos)
                setCopyData(produtos)
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const init = async () => {
            const ref = {
                manicurePedicure: manicureComponentRef,
                salao: salaoComponentRef,
                lash: lashComponentRef
            }[colecao]
    
            const HTML = await gerarHtml();
            setHtml(HTML);

            setTimeout(() => {
                if (ref && ref.current && scroll) {
                    console.log('teste')
                    ref.current.scrollIntoView({ behavior: 'smooth' });
                    setScroll(false);
                }
            }, 1500);
            setLoading(false);  

        }
        init();

    }, [data]);

    const abrirModal = (produto) => {
        const colecoes = { manicurePedicure: data.manicurePedicure, salao: data.salao, lash: data.lash }

        const colecaoProdutoClicado = colecoes[produto.colecao].map(item =>
            item.id === produto.id ? { ...item, expandir: !item.expandir } : item
        );

        colecoes[produto.colecao] = colecaoProdutoClicado;
        setData(colecoes);
    }

    const filtrarPesquisa = async (value) => {
        const produtos = copyData;
        setData({
            manicurePedicure: produtos.manicurePedicure.filter(produto => produto.nome.toLowerCase().includes(value.toLowerCase())),
            salao: produtos.salao.filter(produto => produto.nome.toLowerCase().includes(value.toLowerCase())),
            lash: produtos.lash.filter(produto => produto.nome.toLowerCase().includes(value.toLowerCase()))
        })
    }

    const filtrarPesquisaDebounce = debounceAsync(filtrarPesquisa, 500);

    const gerarHtml = () => {
        return new Promise((res, rej) => {
            const content = (
                <div id='produtos'>
                    <Loading load={loading} />
                    <div className='container-produtos'>
                        <div className="input-pesquisa">
                            <input
                                type="text"
                                placeholder="O que deseja buscar?"
                                onChange={(e) => filtrarPesquisaDebounce(e.target.value)}
                            />
                        </div>
                        {data.manicurePedicure.length > 0 && (
                            <div ref={manicureComponentRef}>
                                <ColecaoProdutos
                                    colecao={{ array: data.manicurePedicure, name: 'manicurePedicure' }}
                                    title='Linha profissional manicure e pedicure'
                                    abrirModal={abrirModal}
                                />
                            </div>
                        )}
                        {data.salao.length > 0 && (
                            <div ref={salaoComponentRef}>
                                <ColecaoProdutos
                                    colecao={{ array: data.salao, name: 'salao' }}
                                    title='Linha profissional salão'
                                    abrirModal={abrirModal}
                                />
                            </div>
                        )}
                        {data.lash.length > 0 && (
                            <div ref={lashComponentRef}>
                                <ColecaoProdutos
                                    colecao={{ array: data.lash, name: 'lash' }}
                                    title='Lash Designer'
                                    abrirModal={abrirModal}
                                />
                            </div>
                        )}
                    </div>
                </div>
            );
            res(content);
        })
    }

    return html;
}

export default ProdutosScreen;