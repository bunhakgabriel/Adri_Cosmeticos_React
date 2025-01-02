import Typerwriter from '../../componentes/Typewriter/Typewriter';
import Marcas from './componentes/Marcas/Marcas';
import Slide from './componentes/Slide/Slide';
import './HomeScreen.css'

const HomeScreen = () => {
    const textTypewriter = 'Grandes marcas e excelentes produtos.';

    return (
        <div id='home-screen'>
            <div className='typewriter'>
                <Typerwriter texto={textTypewriter} style={{ fontSize: '3em' }} />
            </div>
            <Slide />
            <Marcas />
        </div>
    )
}

export default HomeScreen;