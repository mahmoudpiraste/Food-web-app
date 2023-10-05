import { React } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination , Autoplay } from 'swiper';




function CarroHome () {

  
   
        return (
          <div className="home-caros-main">
           <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 2000
        
      }}
      
      
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
      
   ><SwiperSlide><div className="div-slider-main-home"><img className="main-caros-home-img" src="./main-banner-food-bresoon-1.png" /></div></SwiperSlide>
   <SwiperSlide><img className="main-caros-home-img" src="./main-banner-food-bresoon-1.png" /></SwiperSlide>
   <SwiperSlide><img className="main-caros-home-img" src="./main-banner-food-bresoon-1.png" /></SwiperSlide>
                       
           
           </Swiper>
            
           </div>
        )
}

export default CarroHome ;