import './Marcas.css'

const Marcas = () => {
    const imagens = [
        '/imagens/marcas/fadvan.png',
        '/imagens/marcas/nagaraku.png',
        '/imagens/marcas/deceMars.png',
        '/imagens/marcas/D&Z.png',
        '/imagens/marcas/beltrat01.png',
        '/imagens/marcas/realLove.png',
        '/imagens/marcas/dengo.png',
        '/imagens/marcas/navina.png',
        '/imagens/marcas/apolo.png',
        '/imagens/marcas/missFrandy01.png',
        '/imagens/marcas/farmax.png',
        '/imagens/marcas/faceBeautiful01.png',
        '/imagens/marcas/fengshangmei.png',
        '/imagens/marcas/dafu.png',
        '/imagens/marcas/cruzeiro.png',
        '/imagens/marcas/helloMini.png',
        '/imagens/marcas/amend.png',
        '/imagens/marcas/cinco.png',
        '/imagens/marcas/mundial1.png',
        '/imagens/marcas/begonia.png',
    ]

    return (
        <div id='marcas'>
            <div className='logo-marcas'>
            {imagens.map((imgMarca, index) => {
                return (
                    <div key={index} >
                        <img src={imgMarca} />
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default Marcas;
