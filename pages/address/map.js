import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {Marker} from 'react-map-gl';
import { useCookies } from 'react-cookie';
import useSWR from "swr";
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';
import  Router  from 'next/router';




mapboxgl.accessToken ='pk.eyJ1IjoidHVya21lbmZvb2QzIiwiYSI6ImNsOTJvMTc2ZTEzOTYzbnFteGQyeWo2ajgifQ.Xb__rnRvEEAyAqcONXii_A';
// mapboxgl.setRTLTextPlugin(
//   'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
//   null,
//   true // Lazy load the plugin
//   );

const fetcher = url => axios.get(url).then(res => res.data)

export default function MapMain() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(54.7641844441202);
  const [lat, setLat] = useState(36.9832521020102);
  const [zoom, setZoom] = useState(7);

  const [myaddress, setMyaddress] = useState([]);
  const [myaddressdetail, setMyaddressdetail] = useState([]);
  const [myaddressvahed, setMyaddressvahed] = useState([]);
  const [myaddresspelak, setMyaddresspelak] = useState([]);

//  localStorage.setItem("lng", lng);
//  localStorage.setItem("lat", lat);

  // const [addlat, setAddlat] = useCookies(54.7641844441202);  
  // const [addlng, setAddlng] = useCookies(36.9832521020102);
  // console.log(lat);
  // console.log(lng);
  
  // setAddlng('add_lng', lng, { path: '/' });
  // setAddlat('add_lat', lat, { path: '/' });

useEffect(()=>{

 axios.get('https://api.neshan.org/v5/reverse',{
  headers:{
    "Api-Key": "service.IQ8EMNrgdyL3ZjgO7BbVh4mW3xc9Wy9ZkrKC3EL4"
  }, params:{
    lat: lat,
    lng: lng
  }
  })
  .then(function (response){
    
    setMyaddress(response.data.formatted_address);
  })
  .catch(function(error){
    // console.log(error);
  });
  
},[lat, lng]);
  

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11', 
      center: [lng, lat],
      zoom: zoom,
      scrollZoom: {around: 'center'},
      touchZoomRotate: {around: 'center'},
      
      
    });
  });

  
  



  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('moveend', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
   
    });
  });

 const handlerNewAddress = (e) =>{
  e.preventDefault()

  axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/address/neshmap`, {
    lat, lng, myaddress, myaddressdetail, myaddresspelak, myaddressvahed
  })  
  .then(function(res) {
    // console.log(res);
    Router.push('/address/addresslist');
    toast.success("آدرس جدید افزوده شد")

  })
  .catch(function(err){
    // console.log(err);
    toast.error("مشکلی پیش آمده است")
  })
 }
  


  return (
    <div className='map-main-cont'>
          {/* <div className="sidebar">
               Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div> */}
           <div className='address-auto'>{myaddress}</div>
           <div className='map-box-container'>
        <div ref={mapContainer} className="map-container" >
          </div>
          
        <div >
              <img className='marker-b' src='/markertmf.png' />
            </div>
            </div>
            <div className="new-address">
                <input onChange={(e) => setMyaddressdetail(e.target.value)} type="text" id="input-add" className="input-add" placeholder="آدرس دقیق خود را بنویسید" />
                <input onChange={(e) => setMyaddressvahed(e.target.value)} type="text" id="input-add" className="input-add2" placeholder="واحد" />
                <input onChange={(e) => setMyaddresspelak(e.target.value)} type="text" id="input-add" className="input-add2" placeholder="پلاک" />
           
                </div>
                <div>   
           <button onClick={handlerNewAddress} className='accept-map' > افزودن آدرس جدید  </button>
        
    </div>
    
    </div> 
    
  );
}

// export default MapMain ;