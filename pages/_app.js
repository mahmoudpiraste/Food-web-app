import 'bootstrap/dist/css/bootstrap.rtl.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import '@/components/layout/header.css'
import '@/components/layout/login.css'
import '@/components/layout/mapcomp.css'
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { useEffect } from 'react';
import Header from '@/components/layout/header';
import { AuthProvider } from '@/context/AuthContext';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { router, useRouter } from 'next/router';
import { Children } from 'react/cjs/react.production.min';
import { CookiesProvider } from "react-cookie";

import Login from '@/components/auth/Login';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/mousewheel';


//axios.defaults.baseURL = process.env.BACKEND_API_URL;


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import ('bootstrap/dist/js/bootstrap.bundle.js')
  }, [])

  const router= useRouter();

  if (router.pathname == "/auth/login") {
    return (
      <CookiesProvider>
      <AuthProvider>
    <Component {...pageProps} />
    <ToastContainer/>
    </AuthProvider>
    </CookiesProvider>
    )
  }

  return(
    <AuthProvider>
    <Header />
    <Component {...pageProps} />
    <ToastContainer/>
    </AuthProvider>
  ) 
}

export default MyApp
