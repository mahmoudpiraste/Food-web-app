import React, { useRef, useEffect, useState } from 'react';
import mapboxgl , {Marker} from 'mapbox-gl';
import  MapMain  from './map';
import   myaddress  from './map';
import { useCookies } from 'react-cookie';
import useSWR from "swr";
import axios from 'axios';


const fetcher = url => axios.get(url).then(res => res.data)

export default function MapSelect(){

    // const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_APP_API_URL}/address/neshmap`, fetcher)

    // console.log(data, error);
    // if (error) return <div>ERROR</div>
   
    // if (!data) return <div>در حال بارگذاری . . .</div>
   
    return(
        <div className="map-main-cont">
          
            <div  className="map-box-container"><p style={{paddingTop:10, paddingRight:30}}>محل دقیق خود را بر روی نقشه اتخاب کنید</p>
            <div >
              {myaddress}
                </div>
            <MapMain />
            
            
            </div>
            <div className="new-address">
                <input type="text" id="input-add" className="input-add" placeholder="آدرس دقیق خود را بنویسید" />
                <input type="text" id="input-add" className="input-add2" placeholder="واحد" />
                <input type="text" id="input-add" className="input-add2" placeholder="پلاک" />
           
            </div>
              <button className="accept-map" > تایید آدرس</button> 

        </div>
    )


}