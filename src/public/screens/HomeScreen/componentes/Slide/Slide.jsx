import { Carrossel } from "../../../../componentes/Carrossel/Carrossel";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import './Slide.css'
import 'swiper/css/autoplay';
import 'swiper/css';
import { Link } from "react-router-dom";

const Slide = () => {
  const imagens = [
    { url: '/imagens/carrossel/nailDesigner1.jpg', path: '/produtos?colecao=manicurePedicure' },
    { url: '/imagens/carrossel/nailDesigner2.jpg', path: '/produtos?colecao=manicurePedicure' },
    { url: '/imagens/carrossel/nailDesigner3.jpg', path: '/produtos?colecao=manicurePedicure' },
    { url: '/imagens/carrossel/salao1.jfif', path: '/produtos?colecao=salao' },
    { url: '/imagens/carrossel/lash2.jpg', path: '/produtos?colecao=lash' },
    { url: '/imagens/carrossel/salao2.jpg', path: '/produtos?colecao=salao' },
    { url: '/imagens/carrossel/lash1.jpg', path: '/produtos?colecao=lash' },
    { url: '/imagens/carrossel/nailDesigner4.jpeg', path: '/produtos?colecao=manicurePedicure' },
    { url: '/imagens/carrossel/lash3.jpg', path: '/produtos?colecao=lash' },
    { url: '/imagens/carrossel/salao3.jpg', path: '/produtos?colecao=salao' },
    { url: '/imagens/carrossel/salao4.jfif', path: '/produtos?colecao=salao' },
    { url: '/imagens/carrossel/lash4.jpg', path: '/produtos?colecao=lash' },
  ]

  return (
    <div id="slide">
      <Swiper
        className="container-swiper"
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={1200}
        allowTouchMove={false}
        spaceBetween={2}
        slidesPerView={3}
      >
        {imagens.map((imagem, index) =>
          <SwiperSlide key={index} className="container-slide" >
            <Link to={imagem.path}>
              <img src={imagem.imagem} className="img-slide" />
            </Link>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}

export default Slide;