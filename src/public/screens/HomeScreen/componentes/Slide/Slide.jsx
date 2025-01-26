import { Carrossel } from "../../../../componentes/Carrossel/Carrossel";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import './Slide.css'
import 'swiper/css/autoplay';
import 'swiper/css';

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
        {imagens.map((urlImage, index) =>
          <SwiperSlide key={index} className="container-slide" >
            <img src={urlImage} className="img-slide" />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}

export default Slide;