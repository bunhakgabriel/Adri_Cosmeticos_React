import { useEffect, useState } from 'react'
import './BuscarProduto.css'
import { numberMask } from '../../../../../utils/masks'
import ComboboxRhf from '../../../../componentes/Combobox/ComboboxRhf'
import { getColecoes } from '../../PainelAdmService'
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { buscarPorCodigo } from '../../PainelAdmService'
import { deletarProduto } from '../../PainelAdmService'
import Loading from '../../../../componentes/Loading/Loading'

const validateForm = Yup.object().shape({
    codigo: Yup.string().required('Campo obrigatório'),
    colecao: Yup.string().required('Campo obrigatório'),
})

const BuscarProduto = ({ operacao, setOperacao, onProdutoEncontrado }) => {
    const { handleSubmit, control, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validateForm)
    })

    const [produto, setProduto] = useState()
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const produto = await buscarPorCodigo(data)
            setTimeout(() => {
                setLoading(false)
            }, 1200)
            if(!produto.data){
                alert('Produto não encontrado!')
            }
            if (produto.data.codigo) {
                setProduto(produto.data)
                onProdutoEncontrado?.({ ...produto.data });
            }
        } catch (e) {
            console.log('Erro ao buscar: ', e)
            setLoading(false)
        }
    }

    const excluirProduto = async () => {
        if(!produto){
            return alert('Nenhum produto selecionado')
        }
        if (!confirm('Tem certeza que deseja excluir esse produto?')) {
            console.log('exclusão cancelada')
            return;
        }
        setLoading(true)
        try {
            const resp = await deletarProduto(produto)
            setTimeout(() => {
                setLoading(false)
            }, 1200)
            alert(resp)
            reset()
            setOperacao('Cadastro')
        } catch (e) {
            console.log('Erro ao deletar produto: ', e)
            setLoading(false)
        }
    }

    useEffect(() => {
        reset()
    }, [operacao])

    return (
        <form id='buscar-produto' onSubmit={handleSubmit(onSubmit)}>
            {loading && <Loading load={true} />}
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
                            disabled={operacao != 'Edicao'}
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
                                disabled: operacao != 'Edicao'
                            }}
                        />
                        {errors.colecao && <span className='msg-error'>{errors.colecao.message}</span>}
                    </div>
                )}
            />

            <div className='form-group'>
                <label>.</label>
                <input
                    disabled={operacao != 'Edicao'}
                    type='submit'
                    className='btn-buscar'
                    value={'Buscar'}
                    style={{ width: '100px' }}
                />
            </div>

            <div className='form-group'>
                <label>.</label>
                <button
                    type='button'
                    disabled={operacao != 'Edicao'}
                    onClick={() => excluirProduto()}
                    className='btn-delete'
                >
                    Exluir
                </button>
            </div>
        </form>
    )
}

export default BuscarProduto