import axios from "axios";
import { handleError } from "lib/helper";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import Loader from '@/components/layout/loader';
import { BiBold, BiKey } from "react-icons/bi";
import BackButton from '@/components/layout/backbutton'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from "swiper";
import { numberFormat } from "lib/helper";
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';


dayjs.extend(jalaliday)

const fetcher = url => axios.post(url).then(res => res.data)



const ResturantPage = ({resturantId}) =>{

//   useEffect(() =>{
//     error && toast.error(error)
//   }, [error])

const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_APP_API_URL}/resturant/resturantdetail`, fetcher)

console.log(data, error);



if (error) return <div>ERROR</div>

if (!data) return <Loader/>

const topicdata = data.topics ;
const foodsdata = data.foods ;
const basketdata = data.basket.length ;

//Day and Time
const toDay = dayjs().calendar('jalali').locale('fa').format('dddd');
console.log(toDay);
let myfri = data.rest.fri;
var newFormat = myfri.replace( "pp", " و ");
var newFormatFRI = newFormat.replace( "@", "  الی ");
var newFormatFRII = newFormatFRI.replace( "@", "  الی ");

var startFriH = (myfri).slice(0,2);
console.log(startFriH)
var startFriHh = (myfri).slice(13,15);
console.log(startFriH)

var endFriH = (myfri).slice(6,8);
console.log(endFriH)
var endFriHh = (myfri).slice(19,21);
console.log(endFriH)




let mysat = data.rest.sat;
var newFormatsa = mysat.replace( "pp", " و ");
var newFormatSAT = newFormatsa.replace( "@", "  الی ");
var newFormatSATT = newFormatSAT.replace( "@", "  الی ");

let mysun = data.rest.sun;
var newFormatsu = mysun.replace( "pp", " و ");
var newFormatSUN = newFormatsu.replace( "@", "  الی ");
var newFormatSUNN = newFormatSUN.replace( "@", "  الی ");



let nowTime = dayjs().calendar('jalali').locale('fa').format('H');
console.log(nowTime);
console.log(myfri);
    return(
        <>
            <div className="back-resturant-pg"><BackButton/></div>
            <div className="main-banner-detail-rest"><img className="img-banner-main-rest" src={('https://seller.turkmenfood.ir/banners/' + data.rest.banner)}  /></div>
            <div className="m-page-sec-detail">
                
                <img className="logo-img-detail-res" src={('https://seller.turkmenfood.ir/logos/'+ data.rest.logo)}/>
                
                <div><h1 className="h1-detail-b" style={{ fontSize:25 }}>{data.rest.name} ({data.rest.Neighborhood}) </h1></div>
                <div className="rank-detail-res-sec"> <img style={{width:25, height:25}} src="/star-1.png"/> <p>امتیاز کاربران {data.rest.rankValue} ({data.rest.rankPoints} نفر) </p> </div>
                
                
                <div className="time-delivery-sec">
                   
                    {startFriH>nowTime &&  <p className="p-open-close">  سفارش نمیگیرد</p>}

                    <div className="open-close-sec"><p style={{fontFamily:'Yekan'}}>امروز {toDay} فروشگاه  باز است. ساعات سفارش گیری از {toDay === 'جمعه' &&
        
        <p>{newFormatFRII} </p> 
       
   
               }
   {toDay === 'شنبه' &&
   
        <p>{newFormatSATT}</p>
       
 
               }{toDay === 'یکشنبه' &&
   
               <p>{newFormatSUNN}</p>
              
        
                      }{toDay === 'دوشنبه' &&
   
                      <p>{data.rest.mon}</p>
                     
               
                             }{toDay === 'سه شنبه' &&
   
                             <p>{data.rest.tue}</p>
                            
                      
                                    }{toDay === 'چهارشنبه' &&
   
                                    <p>{data.rest.wed}</p>
                                   
                             
                                           }{toDay === 'پنجشنبه' &&
   
                                           <p>{data.rest.thu}</p>
                                          
                                    
                                                  }</p></div>
                    <div className="main-deli-detal-sec">
                    <div className="delivery-sec"><img style={{width:28}} src="/helmet.png/"/><p style={{fontSize:12}}>مبلغ پیک 11500</p> </div>
                    <div className="detail-ress-sec"><img style={{width:28}} src="/pieces-of-cutlery.png/"/><p style={{fontSize:12}}>نظرات و اطلاعات  </p></div>
                    </div>
                </div>

                
                <div className="categury-detail-pg-res">
                    
                    {Object.keys(data).map((key, value) =>{
                        return(
                            
                           
                                <button className="btn-categury-detail-pg">{topicdata[1].title}</button>
                          
                           
                        )
                    })}
                   
                </div>

                <div className="main-foods-basket-sec-det-pg">

                    
                    {!basketdata > 0 &&
                    <div className="basket-sec-detail-pg">
                         <p>سبد خرید شما خالی است </p> 
                        
                    </div>
                                }
                    {basketdata > 0 &&
                    <div className="basket-sec2-detail-pg">
                         <p>تکمیل خرید ({basketdata})</p> 
                        
                    </div>
                                }


                </div>
                {Object.keys(foodsdata).map((key, index) =>{
                        return(
                    <div className="main-foods-listed-detail-pg">

                        <p className="cate-p-details-foods">{foodsdata[key].topic.title}</p>
                        
                     <div className="main-dev-sec-cards-food-detail-pg">
                        {Object.keys(foodsdata[key].this_food).map((value, index) =>{
                        return(
                        <div className="foods-list-det-pg">
                            <div className="img-name-disc-food-list-det-pg">
                             <div>
                              <img className="img-food-detail-rest-pg" src={('https://seller.turkmenfood.ir/foods/'+ foodsdata[key].this_food[value].food.foodImage)}/>
                             </div>
                             <div className="name-dis-sec-det-pg">
                               <p style={{fontSize:14 , fontFamily:'IranSansB'}}>{foodsdata[key].this_food[value].food.foodName}</p>
                               <p style={{fontSize:12}}>{foodsdata[key].this_food[value].food.foodIngredients}</p>
                             </div>
                            </div>
                            {/* {Object.keys(foodsdata[key].this_food[value].var).map(  (key, value , item )  =>{
                              
                        return(
                             <div className="price-butoon-basket-sec">
                                <div className="price-sec-dt-pg" >
                                <p >{foodsdata[key].this_food[value].var[item].var_title} </p>
                               <p style={{fontSize:15,paddingTop:5 ,paddingRight:15, fontFamily:'IranSansB'}}>    {foodsdata[0].this_food[0].var[0].foodPrice} تومان     </p>
                               
                                </div>
                                <div className="basket-button-sec-dt-pg"><button className="btn-basket-add-dt-pg">افزودن</button></div>
                            </div>
                         
                          
                             )
                             
                        })}  */}


                        {/* {[0,1,2,3,4,5,6].map((key, value , [key1 = index ] , item ) =>{
                              
                              return(
                                   <div className="price-butoon-basket-sec">
                                      <div className="price-sec-dt-pg" >
                                      <p >{foodsdata[key].this_food[value].var[item].var_title} </p>
                                     <p style={{fontSize:15,paddingTop:5 ,paddingRight:15, fontFamily:'IranSansB'}}>    {foodsdata[0].this_food[0].var[0].foodPrice} تومان     </p>
                                     
                                      </div>
                                      <div className="basket-button-sec-dt-pg"><button className="btn-basket-add-dt-pg">افزودن</button></div>
                                  </div>
                               
                                
                                   )
                                   
                              })}  */}

                               {foodsdata[key].this_food[value].var.map((item, i ) =>{
                              
                              return(
                                   <div className="price-butoon-basket-sec">
                                      <div className="price-sec-dt-pg" >
                                      <p style={{paddingTop:5, fontFamily:'Yekan' , fontSize:14}} >{item.var_title} </p>
                                     <p style={{fontSize:14,paddingTop:5 ,paddingRight:15, fontFamily:'Yekan'}}>    {numberFormat(item.foodPrice)} تومان     </p>
                                     
                                      </div>
                                      <div className="basket-button-sec-dt-pg"><button className="btn-basket-add-dt-pg">افزودن</button></div>
                                  </div>
                               
                                
                                   )
                                   
                              })}


                        </div>
                        
                      )
                      })}

                    </div>
                     </div>  
                 
                 )
                })}
                    

                </div>
                {/* {foodsdata[0].this_food[3].var[2].var_title} */}
                <br></br>
                <br></br>
                <br></br>
                <br></br>
               
                


    </>
    )

}

export default ResturantPage;




// export async function getServerSideProps({ query }) {
// console.log(query.resturantId)
//     try {
//         const resApi = await axios.post('https://turkmenfood.ir/api/webapp/v1/api.php', {
//                 "command": "getRestaurantFoods",
//                 restaurant_id: req.cookies.selected_res,
//                 user_id : req.cookies.user_id,
//                 selected_address_lat : req.cookies.selected_lat,
//                 selected_address_long : req.cookies.selected_long,
//                 token : req.cookies.login_token
//                 });
//         // const res = await axios.get(`/resturants/${(query.resturantId)}`)
//         // console.log(res.data.data)

//         return {
//             props: {
//                 resturant: res.data.data
//             }
//         }
//     } catch (err) {
//         return {
//             props:{
 
//                     error: handleError(err)

//             }
//         }
//     }
// }