import './LinhaProfissionalCard.css';
import { Link } from 'react-router-dom';

const LinhaProfissionalCard = ({url1, url2, children, colecao}) => {
    return (
        <div id='linha-profissional-card'>
            <div className='linha-profissional'>
                {children}
                <div>
                    <img className='img-1' src={url1} />
                    <img className='img-2' src={url2} />
                    <Link to={'/produtos?colecao=' + colecao} className='link' >Ver mais</Link>
                </div>
            </div>
        </div>
    );
};

export default LinhaProfissionalCard;
