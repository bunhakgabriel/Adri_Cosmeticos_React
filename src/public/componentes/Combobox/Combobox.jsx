import './Combobox.css';
import { TiDelete } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useRef } from 'react';

const Combobox = ({ listOptions, field }) => {
    const [temFoco, setTemFoco] = useState(false);
    const [valorValido, setValorValido] = useState(field.value || '');
    const [optionsCombobox, setOptionsCombobox] = useState(listOptions);

    const inputRef = useRef(null);
    
    const changeInput = (text) => {
        field.onChange(text);

        if (!text) {
            setOptionsCombobox(listOptions);
            return;
        }

        const filtrados = listOptions.filter(op =>
            op.toLowerCase().includes(text.toLowerCase())
        );
        setOptionsCombobox(filtrados);
    };

    const handleBlur = () => {
        const valorDigitadoEhValido = listOptions.some(op =>
            op.toLowerCase() === (field.value || '').toLowerCase()
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
                        setOptionsCombobox(listOptions);
                        setTemFoco(true);
                    }}
                    onBlur={handleBlur}
                    onChange={e => changeInput(e.target.value)}
                    value={field.value || ''}
                    placeholder='Selecione uma categoria'
                />

                {field.value ? (
                    <TiDelete
                        size={25}
                        style={{ cursor: 'pointer' }}
                        onClick={() => field.onChange('')}
                    />
                ) : (
                    <IoIosArrowDown
                        size={25}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setOptionsCombobox(listOptions);
                            setTemFoco(!temFoco);
                            inputRef.current?.focus(); 
                        }}
                    />
                )}
            </div>
            {temFoco && (
                <div className="options">
                    {optionsCombobox.map(op => (
                        <div className="option" key={op}>
                            <div onMouseDown={() => handleSelecionar(op)}>
                                {op}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Combobox;
