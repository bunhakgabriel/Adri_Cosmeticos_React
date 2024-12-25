import './Carrossel.css'
import React, { useRef, useEffect, useState } from 'react';

export const Carrossel = ({ imagens, estiloImg, estiloCarrossel, transicao }) => {
    const carroselRef = useRef(null);
    const [lista, setLista] = useState(imagens)

    useEffect(() => {
        const firstChild = carroselRef.current.firstChild;
        let marginLeft = -(firstChild.offsetWidth);
        let cont = 1

        const carrosel = () => {
            firstChild.style.marginLeft = `${marginLeft}px`;
            firstChild.style.transition = '1s'
            marginLeft -= firstChild.offsetWidth;
            if (cont === imagens.length - 2) {
                cont = 0;
                setLista(preview => [...preview, ...imagens])
            }
            cont++
        }

        const intervalId = setInterval(carrosel, transicao);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div ref={carroselRef} className='carrossel' style={estiloCarrossel}>
            {lista.map((urlImagem, index) => {
                return (
                    <div key={index}><img style={estiloImg} src={urlImagem} /></div>
                )
            })}
        </div>
    )
}
