

import { Controller, useForm } from 'react-hook-form';
import './PainelAdmScreen.css'
import { converteFileBase64 } from '../../../utils/converteFileBase64';
import { precoMask } from '../../../utils/masks';
import { numberMask } from '../../../utils/masks';
import { TiDelete } from "react-icons/ti";
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import Combobox from '../../componentes/Combobox/Combobox';

const validateForm = Yup.object().shape({
    produto: Yup.string().required('Campo obrigatório'),
    descricao: Yup.string(),
    codigo: Yup.string().required('Campo obrigatório'),
    colecao: Yup.string().required('Campo obrigatório'),
    estoque:
        Yup.string().required('Campo obrigatório')
            .matches(/^[0-9]+$/, 'Digite apenas números'),
    preco: Yup.string().required('Campo obrigatório'),
    url: Yup.string().required('É necessário escolher uma imagem para o produto')
})

const optionsComboboxCategorias = [
    'Manicure e pedicure',
    'Salão',
    'Lash Designer',
]

const PainelAdmScreen = () => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
        control,
        setValue
    } = useForm({
        resolver: yupResolver(validateForm)
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    const urlImage = watch('url')

    return (
        <div id="painel-adm-screen">
            <form className="form-card" onSubmit={handleSubmit(onSubmit)}>
                <h2>+ Cadastrar Novo Produto</h2>
                <p>Preencha as informações do produto para adicionar ao estoque</p>

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
                                <label>Categoria</label>
                                <Combobox
                                    listOptions={optionsComboboxCategorias}
                                    field={field}
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
                                            onChange={async e => field.onChange(await converteFileBase64(e))}
                                        />
                                        📤 Escolher Arquivo
                                    </label>
                                    {urlImage && (
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

            <div className="preview-card">
                <p><strong>📷 Preview do Produto</strong></p>
                <div className="image-preview">
                    <img
                        src={urlImage}
                        alt="Preview do Produto"
                    />
                </div>
            </div>
        </div>
    );
}

export default PainelAdmScreen