
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import cookieClient from 'cookies-next';
import useSWR from "swr";
import { toast } from 'react-toastify';
import { handleError } from 'lib/helper';
import  cookie  from 'cookie';
import { useCookies } from 'react-cookie';
import Loader from '@/components/layout/loader';

export function cookieaddress (res){
  
  res.setHeader('set-cookie', [cookie.serialize('selected_address_lat', selected_address_lat, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
   }), cookie.serialize('selected_address_long', selected_address_long, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
   })])
   return(<div></div>);}



 const fetcher = url => axios.post(url).then(res => res.data)


 function AddressList  (res) {
  const [ selected_address_long, setselected_address_long ] = useState('');
  const [ selected_address_lat, setselected_address_lat ] = useState('');
  const [ selected_address_detail, setselected_address_detail ] = useState('');
  const [cookieslong, setCookielong] = useCookies('selected_long');
  const [cookieslat, setCookielat] = useCookies('selected_lat');
  setCookielong('selected_long', selected_address_long, { path: '/' , HttpOnly:true});
  setCookielat('selected_lat', selected_address_lat, { path: '/' , HttpOnly:true});

  if (typeof window !== 'undefined') {
    localStorage.setItem("detail", selected_address_detail)
    
  }


            console.log(selected_address_lat);
            console.log(selected_address_long);


    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_APP_API_URL}/address/addresslist`, fetcher)

            console.log(data, error);

  

  if (error) return <div>ERROR</div>
   
  if (!data) return <Loader/>

  
    const listedaddress = data.address_list ;
            console.log(listedaddress);

  return (<div className='main-list-add'>

    <div className='top-maplist-items'>
    <Link href='/address/map'><button className='btn-add-res'>  + افزودن آدرس جدید  </button></Link> 
    </div>
     <p style={{fontSize:10}}>راهنما : بر روی یکی از آدرس ها کلیک و یا آدرس جدیدی اضافه کنید</p>


            {listedaddress? (
              <div className="address-storage-container">

              {Object.keys(listedaddress).map((key, index) => {
               return (
                        <a href='/' key={index} className="main-select">
                           <button className='btn-main-list'  onClick={e=>{setselected_address_lat(data.address_list[key].add_lat); setselected_address_long(data.address_list[key].add_long); setselected_address_detail(data.address_list[key].address); }}  >
                              <div className="address-card"  ><p className="addresst"> آدرس {listedaddress[key].city}  - {listedaddress[key].address} </p><p className="addresst">پلاک {listedaddress[key].pelak}     طبقه {listedaddress[key].vahed} </p></div>
                               </button></a>       
                   //label and input type radio to show, selected address must use, but when use this two, cant link to home page
               );
              })
             } 
   
             {/* { [data.address_list]
             ? [data.address_list].map( (keys , index) =>
                      (    <label key={index} className="main-select">  [index] <input type="radio" name="radioaddress" onChange={e=>{setselected_address_lat(data.address_list[index].add_lat); setselected_address_long(data.address_list[index].add_long)}} /> <div className="address-card"  ><p className="addresst"> آدرس {data.address_list[index].city} - {data.address_list[index].address}</p><p className="addresst">پلاک {data.address_list[index].pelak}    طبقه {data.address_list[index].vahed}</p></div> </label>       
             )
             )
             : null} */}
   
   
              
                  </div>
            ):(<><p>لیست آدرس شما خالی است</p></>)}
           
           <p></p>
      </div>)
}

export default AddressList;

