import './ComboboxRhf.css';
import { TiDelete } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useRef } from 'react';

const ComboboxRhf = ({ field, getLista, config }) => {
    const [temFoco, setTemFoco] = useState(false);
    const [valorValido, setValorValido] = useState(field.value || '');
    const [optionsCombobox, setOptionsCombobox] = useState([]);
    const [optionsComboboxFiltro, setOptionsComboboxFiltro] = useState([]);

    const inputRef = useRef(null);

    const getListaCombobox = async () => {
        if (optionsCombobox.length == 0) {
            const data = await getLista();
            setOptionsCombobox(data);
            setOptionsComboboxFiltro(data);
        }
        if (optionsCombobox.length != optionsComboboxFiltro.length) {
            setOptionsComboboxFiltro(optionsCombobox)
        }
    }

    const changeInput = (text) => {
        field.onChange(text);

        if (!text) {
            setOptionsComboboxFiltro(optionsCombobox);
            return;
        }

        const filtrados = optionsCombobox.filter(op =>
            op.description.toLowerCase().includes(text.toLowerCase())
        );
        setOptionsComboboxFiltro(filtrados);
    };

    const handleBlur = () => {
        const valorDigitadoEhValido = optionsCombobox.some(op =>
            op.description.toLowerCase() === (field.value || '').toLowerCase()
        );

        if (!valorDigitadoEhValido && field.value) {
            field.onChange(valorValido); // restaura último valor válido
        } else {
            setValorValido(field.value); // atualiza valor válido
        }

        setTemFoco(false);
        field.onBlur(); // dispara validação se necessário
    };

    const handleSelecionar = (op) => {
        field.onChange(op);
        setValorValido(op);
        setTemFoco(false);
    };

    return (
        <div id="combobox" className="combobox" tabIndex={0}>
            <div>
                <input
                    ref={inputRef}
                    type="text"
                    onFocus={() => {
                        setTemFoco(true)
                        getListaCombobox()
                    }}
                    onBlur={handleBlur}
                    onChange={e => changeInput(e.target.value)}
                    value={field.value || ''}
                    placeholder='Selecione uma categoria'
                    {...config}
                />

                {field.value &&
                    <TiDelete
                        size={25}
                        style={{ cursor: 'pointer' }}
                        onClick={() => field.onChange('')}
                    />
                }
            </div>
            {temFoco && (
                <div className="options">
                    {optionsComboboxFiltro.length > 0 ?
                        (optionsComboboxFiltro.map(op => (
                            <div className="option" key={op.value}>
                                <div onMouseDown={() => handleSelecionar(op.value)}>
                                    {op.description}
                                </div>
                            </div>
                        ))) : (
                            <div className="option">
                                <div>Sem resultados</div>
                            </div>
                        )}
                </div>
            )}
        </div>
    );
};

export default ComboboxRhf;
