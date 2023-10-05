import { React ,useEffect,useState } from "react";
import axios from "axios";
import useSWR from "swr";
import Loader from "@/components/layout/loader";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';
import Link from "next/link";
import  cookie  from 'cookie';
import { useCookies } from 'react-cookie';

const fetcher = url => axios.post(url).then(res => res.data)
export function cookieresid (res){
  res.setHeader('set-cookie', [cookie.serialize('selected_resturant_id', selected_resturant_id, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
   })])
   return(<div></div>);}


function caronan () {
 
  const [ selected_resturant_id, setselected_resturant_id ] = useState('');
  const [cookiesresid, setCookieresid] = useCookies('selected_res');
  setCookieresid('selected_res', selected_resturant_id, { path: '/' , HttpOnly:true});

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_APP_API_URL}/homepg/nancaros`, fetcher)

           console.log(data, error);
           if (error) return <div>مشکلی پیش آمده است</div>
           if (!data) return  <Loader/> 

    
    const foodsdata = data.foods ;
    
   
  
 
   
    if (typeof window !== 'undefined') {
      localStorage.setItem("mywallet", data.wallet_charge),
     
    
    
            console.log()
    } 
        return (

            <div  className='caros'>
           <div className='title-container'><h2 className='title-caros'>نان برسون</h2><div className="showall-sec"><a href="#"><button className='show-all'>نمایش همه</button></a></div></div>
           <Swiper
      modules={[Navigation]}
      spaceBetween={5}
      slidesPerView={1.15}
      
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      
       
    
      breakpoints={{
        // when window width is >= 640px
        640: {
          width: 640,
          slidesPerView: 1,
        },
        // when window width is >= 768px
        768: {
          width: 768,
          slidesPerView: 2,
        },
      }}
    >{Object.keys(foodsdata).map((key, index) => {
                return (
                        // <a href='/' key={index} className="main-select"><div> <img style={{width:250}} src={('https://seller.turkmenfood.ir/logos/' + data.foods[key].logo)} /><p>{foodsdata[key].name}</p> </div></a>
                        <SwiperSlide>   
                       <a href={`/resturants/${foodsdata[key].id}`}> 
                       <button className="res-id-selector" onClick={e=>setselected_resturant_id(foodsdata[key].id)}>
                        <div key={index} className="card" ><p className='starm' style={{marginTop:8, fontSize:12,}}> امتیاز {foodsdata[key].rankValue} ({foodsdata[key].rankPoints} نفر )</p>
                  <div className='img-bsl'><img className='main-img' style={{width:272 , height:195 , borderRadius:15 , marginLeft:2 , marginTop:2 , marginRight:2}} src={('https://seller.turkmenfood.ir/banners/' + data.foods[key].banner)} alt="" /></div>
                  <div className='vendor-logo'><img className='vendor-logo-m' style={{borderRadius:15 , width:85, height:85 , marginTop:-50}} src={('https://seller.turkmenfood.ir/logos/' + data.foods[key].logo)} /></div>
                  <div className='titles'><h6>{foodsdata[key].name}</h6><p className="disc-store">{foodsdata[key].order_type}</p></div>
                  <div ><button className='costm' icon='./logo.svg'>هزینه ارسال {data.prices[key]} </button></div>
                           </div> </button> </a>
                         
                      
                      
                         </SwiperSlide> );
                        })
                       }
           <SwiperSlide><div className="show-extra-main"><h5>نمایش همه</h5></div></SwiperSlide> </Swiper>
            
            </div>
        )
}

export default caronan ;