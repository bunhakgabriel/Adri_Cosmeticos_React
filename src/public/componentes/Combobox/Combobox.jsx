import './ComboboxRhf.css';
import { TiDelete } from "react-icons/ti";
import { useState, useRef } from 'react';

const Combobox = ({ value, setValue, getLista, config }) => {
    const [temFoco, setTemFoco] = useState(false);
    const [valorValido, setValorValido] = useState(value || '');
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
        setValue(text);

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
            op.description.toLowerCase() === (value || '').toLowerCase()
        );

        if (!valorDigitadoEhValido && value) {
            setValue(valorValido); // restaura último valor válido
        } else {
            setValorValido(value); // atualiza valor válido
        }

        setTemFoco(false);
        //field.onBlur(); // dispara validação se necessário
    };

    const handleSelecionar = (op) => {
        setValue(op);
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
                    value={value || ''}
                    placeholder='Selecione uma categoria'
                    {...config}
                />

                {value &&
                    <TiDelete
                        size={25}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setValue('')}
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

export default Combobox;
