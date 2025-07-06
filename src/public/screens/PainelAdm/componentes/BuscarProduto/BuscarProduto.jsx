import { useEffect } from 'react'
import './BuscarProduto.css'
import { numberMask } from '../../../../../utils/masks'
import ComboboxRhf from '../../../../componentes/Combobox/ComboboxRhf'
import { getColecoes } from '../../PainelAdmService'
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { buscarPorCodigo } from '../../PainelAdmService'

const validateForm = Yup.object().shape({
    codigo: Yup.string().required('Campo obrigatório'),
    colecao: Yup.string().required('Campo obrigatório'),
})

const BuscarProduto = ({ operacao, onProdutoEncontrado }) => {
    const { handleSubmit, control, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validateForm)
    })

    const onSubmit = async (data) => {
        try {
            const produto = await buscarPorCodigo(data)
            if(produto.data.codigo){
                onProdutoEncontrado?.({ ...produto.data });
            }
        } catch (e) {
            console.log('Erro ao buscar: ', e)
        }
    }

    useEffect(() => {
        reset()
    }, [operacao])

    return (
        <form id='buscar-produto' onSubmit={handleSubmit(onSubmit)}>
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
        </form>
    )
}

export default BuscarProduto