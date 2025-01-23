import './HomeScreen.css'
import Typerwriter from '../../componentes/Typewriter/Typewriter';
import LinhaProfissionalCard from './componentes/LinhaProfissional/LinhaProfissionalCard';
import Marcas from './componentes/Marcas/Marcas';
import Slide from './componentes/Slide/Slide';
import linhasProfissionais from './componentes/LinhaProfissional/utils';
import Entrega from './componentes/Entrega/Entrega';


const HomeScreen = () => {
    const textTypewriter = 'Grandes marcas e excelentes produtos.';

    return (
        <div id='home-screen'>
            {/* <div className='typewriter'>
                <Typerwriter texto={textTypewriter} style={{ fontSize: '3em' }} />
            </div>
            <Slide /> */}
            <Marcas />
            <div className='linhas-profissionais'>
                {linhasProfissionais.map((linha, index) => {
                    return (
                        <LinhaProfissionalCard key={index} url1={linha.url1} url2={linha.url2}>
                            <h1>{linha.titulo}</h1>
                        </LinhaProfissionalCard>
                    )
                })}
            </div>
            <Entrega />
            <div className='como-chegar' >
                <h1>Como chegar</h1>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600.144081202108!2d-49.27684452552044!3d-25.533577136996183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dcfb834c118f03%3A0x82a64a75e6852c1!2sR.%20Tijucas%20do%20Sul%2C%20247%20-%20S%C3%ADtio%20Cercado%2C%20Curitiba%20-%20PR%2C%2081900-080!5e0!3m2!1spt-BR!2sbr!4v1700402850846!5m2!1spt-BR!2sbr"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            {/* <div className='imagens-loja'>
                <img src='https://lh3.googleusercontent.com/p/AF1QipMfUewCgHYhcKJdE4WbfiQqXbamsEdz2PFGnlpc=s680-w680-h510' alt='imagem fachada da loja'/>
                <img src='https://lh3.googleusercontent.com/p/AF1QipO3YwGiRelRMkS9J3BoWA6PURxdB0YEzytj8McT=s680-w680-h510' alt='imagem de dentro da loja'/>
            </div> */}
        </div>
    )
}

export default HomeScreen;