import { Carrossel } from "../../../../componentes/Carrossel/Carrossel";

const Slide = () => {
  const imagens = [
    '/imagens/carrossel/nailDesigner1.jpg',
    '/imagens/carrossel/nailDesigner2.jpg',
    '/imagens/carrossel/nailDesigner3.jpg',
    '/imagens/carrossel/salao1.jfif',
    '/imagens/carrossel/lash2.jpg',
    '/imagens/carrossel/salao2.jpg',
    '/imagens/carrossel/lash1.jpg',
    '/imagens/carrossel/nailDesigner4.jpeg',
    '/imagens/carrossel/lash3.jpg',
    '/imagens/carrossel/salao3.jpg',
    '/imagens/carrossel/salao4.jfif',
    '/imagens/carrossel/lash4.jpg',
  ]

  return (
    <div>
      <Carrossel
        imagens={imagens}
        estiloImg={{width: '250px', height: '100%'}}
        estiloCarrossel={{width: '750px', height: '200px'}}
        transicao={4000}
      />
    </div>
  );
}

export default Slide;