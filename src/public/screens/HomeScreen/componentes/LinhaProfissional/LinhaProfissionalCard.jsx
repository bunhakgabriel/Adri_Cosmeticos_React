import './LinhaProfissionalCard.css';

const LinhaProfissionalCard = ({url1, url2, children}) => {
    return (
        <div id='linha-profissional-card'>
            <div className='linha-profissional'>
                {children}
                <div>
                    <img className='img-1' src={url1} />
                    <img className='img-2' src={url2} />
                    <button>Ver mais</button>
                </div>
            </div>
        </div>
    );
};

export default LinhaProfissionalCard;
