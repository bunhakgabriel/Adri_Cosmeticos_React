import './Combobox.css';
import { TiDelete } from "react-icons/ti";
import { useState } from 'react';

const Combobox = ({ listOptions }) => {
    const [temFoco, setTemFoco] = useState(false);
    const [textInput, setTextInput] = useState('');
    const [valorValido, setValorValido] = useState('');
    const [optionsCombobox, setOptionsCombobox] = useState(listOptions);

    const changeInput = (text) => {
        setTextInput(text);

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
            op.toLowerCase() === textInput.toLowerCase()
        );

        if (!valorDigitadoEhValido) {
            setTextInput(valorValido); // restaura o valor anterior
        }

        setTemFoco(false);
    };

    const handleSelecionar = (op) => {
        setTextInput(op);
        setValorValido(op);
        setTemFoco(false);
    };

    return (
        <div id="combobox" className="combobox" tabIndex={0}>
            <div>
                <input
                type="text"
                onFocus={() => {
                    setOptionsCombobox(listOptions);
                    setTemFoco(true);
                }}
                onBlur={handleBlur}
                onChange={e => changeInput(e.target.value)}
                value={textInput}
            />
            {textInput && (
                <TiDelete
                size={30}
                style={{ cursor: 'pointer' }}
                onClick={() => setTextInput('')}
            />
            )}
            </div>
            {temFoco && (
                <div className="options">
                    {optionsCombobox.map(op => (
                        <div className="option">
                            <div
                                key={op}
                                onMouseDown={() => handleSelecionar(op)}
                            >
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
