import Typerwriter from '../../componentes/Typewriter/Typewriter';
import './HomeScreen.css'

const HomeScreen = () => {
    const textTypewriter = 'Grandes marcas e excelentes produtos.';

    return (
        <div id='home-screen'>
            <div className='typewriter'>
                <Typerwriter texto={textTypewriter} style={{ fontSize: '3em' }} />
            </div>
        </div>
    )
}

export default HomeScreen;