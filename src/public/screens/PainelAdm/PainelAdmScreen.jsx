

import { Controller, useForm } from 'react-hook-form';
import './PainelAdmScreen.css'
import { useState, useEffect } from 'react';
import { precoMask } from '../../../utils/masks';
import { numberMask } from '../../../utils/masks';
import { TiDelete } from "react-icons/ti";
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import ComboboxRhf from '../../componentes/Combobox/ComboboxRhf';
import { getColecoes } from './PainelAdmService';
import { salvarProduto, atualizarProduto } from './PainelAdmService';
import BuscarProduto from './componentes/BuscarProduto/BuscarProduto';
import Loading from '../../componentes/Loading/Loading'

const validateForm = Yup.object().shape({
    produto: Yup.string().required('Campo obrigatório'),
    descricao: Yup.string(),
    codigo: Yup.string().required('Campo obrigatório'),
    colecao: Yup.string().required('Campo obrigatório'),
    estoque:
        Yup.string().required('Campo obrigatório')
            .matches(/^[0-9]+$/, 'Digite apenas números'),
    preco: Yup.string().required('Campo obrigatório'),
    // url: Yup.mixed()
    //     .required('É necessário escolher uma imagem')
    //     .test('fileType', 'Apenas imagens são permitidas', value => {
    //         return value && value.type.startsWith('image/');
    //     }),
    url: Yup.mixed().when('$isCadastro', {
        is: true,
        then: (schema) =>
            schema
                .required('É necessário escolher uma imagem')
                .test('fileType', 'Apenas imagens são permitidas', (value) => {
                    return value && value.type?.startsWith('image/');
                }),
        otherwise: (schema) => schema.notRequired(),
    }),
})

const PainelAdmScreen = () => {
    const [operacao, setOperacao] = useState('Cadastro')
    const [previewUrl, setPreviewUrl] = useState('');
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
        control,
        setValue
    } = useForm({
        resolver: yupResolver(validateForm),
        context: { isCadastro: operacao === 'Cadastro' }
    })

    const imagem = watch('url')

    useEffect(() => {
        if (imagem instanceof File) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result);
            reader.readAsDataURL(imagem);
        } else {
            setPreviewUrl('');
        }
    }, [imagem]);

    const preencherFormulario = (produto) => {
        if (!produto) return;

        setValue('produto', produto.produto || '');
        setValue('descricao', produto.descricao || '');
        setValue('codigo', produto.codigo || '');
        setValue('colecao', produto.colecao || '');
        setValue('estoque', produto.estoque || '');
        setValue('preco', produto.preco || '');
        setPreviewUrl(produto.url || '');
    };

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            let resp;
            if (operacao == 'Cadastro') {
                resp = await salvarProduto(data)
                setLoading(false)
                alert(resp)
            } else if (operacao == 'Edicao') {
                resp = await atualizarProduto(data)
                setLoading(false)
                alert(resp)
                setOperacao('Cadastro')
            }
            
            reset()
        } catch (e) {
            console.error("Erro ao salvar:", e);
            setLoading(false)
            alert(e.message || "Erro desconhecido ao cadastrar o produto.");
        }
    }

    return (
        <div id="painel-adm-screen">
            {loading && <Loading load={true} />}
            <div className='container-forms'>
                <div className='form-edicao'>
                    <div className='titulo-opcoes'>
                        <h2 className={`${operacao == 'Cadastro' ? 'active' : ''}`}
                            onClick={() => {
                                setOperacao('Cadastro')
                                reset()
                                setPreviewUrl('')
                            }}
                        >
                            + Cadastrar Novo Produto
                        </h2>
                        <h2 className={`${operacao == 'Edicao' ? 'active' : ''}`}
                            onClick={() => setOperacao('Edicao')}
                        >
                            - Editar um Produto
                        </h2>
                    </div>
                    <p>Preencha as informações do produto para adicionar ao estoque</p>

                    <BuscarProduto
                        operacao={operacao}
                        setOperacao={setOperacao}
                        onProdutoEncontrado={preencherFormulario}
                    />
                </div>
                <form
                    className="form-card"
                    onSubmit={handleSubmit(onSubmit)}
                    key={operacao}
                >
                    <div className="form-group">
                        <label>Nome do Produto</label>
                        <input
                            type="text"
                            placeholder="Ex: Acetona Cinco Lutex 500ml"
                            {...register('produto')}
                        />
                        {errors.produto && <span className='msg-error'>{errors.produto.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>Descrição</label>
                        <textarea
                            placeholder="Descreva as características e benefícios do produto"
                            {...register('descricao')}
                        >
                        </textarea>
                        {errors.descricao && <span className='msg-error'>{errors.descricao.message}</span>}
                    </div>

                    <div className="form-row">
                        <Controller
                            name='codigo'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <div className="form-group">
                                    <label>Código do Produto</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: 789605471923"
                                        value={field.value}
                                        onChange={e => field.onChange(numberMask(e.target.value))}
                                        disabled={operacao != 'Cadastro'}
                                    />
                                    {errors.codigo && <span className='msg-error'>{errors.codigo.message}</span>}
                                </div>
                            )}
                        />

                        <Controller
                            name='colecao'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <div className="form-group">
                                    <label>Colecao</label>
                                    <ComboboxRhf
                                        field={field}
                                        getLista={getColecoes}
                                        config={{
                                            disabled: operacao != 'Cadastro'
                                        }}
                                    />
                                    {errors.colecao && <span className='msg-error'>{errors.colecao.message}</span>}
                                </div>
                            )}
                        />

                        <div className="form-group">
                            <label>Estoque</label>
                            <input
                                type="text"
                                placeholder="Ex: 10"
                                {...register('estoque')}
                            />
                            {errors.estoque && <span className='msg-error'>{errors.estoque.message}</span>}
                        </div>

                        <Controller
                            control={control}
                            name='preco'
                            defaultValue=''
                            render={({ field }) => (
                                <div className="form-group">
                                    <label>Preço (R$)</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: 32.99"
                                        value={field.value}
                                        onChange={e => field.onChange(precoMask(e.target.value))}
                                    />
                                    {errors.preco && <span className='msg-error'>{errors.preco.message}</span>}
                                </div>
                            )}
                        />
                    </div>

                    <div className="form-group">
                        <Controller
                            control={control}
                            name='url'
                            defaultValue=''
                            render={({ field }) => (
                                <div className='form-group'>
                                    <label>Imagem do Produto</label>
                                    <div className="upload-section">
                                        <label className="upload-button">
                                            <input
                                                type="file"
                                                hidden
                                                onChange={e => field.onChange(e.target.files[0])}
                                                disabled={operacao != 'Cadastro'}
                                            />
                                            📤 Escolher Arquivo
                                        </label>
                                        {field.value && (
                                            <div>
                                                <span className="image-status">Imagem selecionada</span>
                                                <TiDelete
                                                    size={30}
                                                    style={{ color: 'red', cursor: 'pointer' }}
                                                    onClick={() => setValue('url', '')}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    {errors.url && <span className='msg-error'>{errors.url.message}</span>}
                                </div>
                            )}
                        />
                    </div>

                    <div className="form-group">
                        <button type='submit' className="submit-button">Cadastrar Produto</button>
                    </div>
                </form>
            </div>

            <div className="preview-card">
                <p><strong>📷 Preview do Produto</strong></p>
                <div className="image-preview">
                    <img
                        src={previewUrl || 'https://clp.org.br/wp-content/uploads/2024/04/default-thumbnail.jpg'}
                        alt="Preview do Produto"
                    />
                </div>
            </div>
        </div>
    );
}

export default PainelAdmScreen