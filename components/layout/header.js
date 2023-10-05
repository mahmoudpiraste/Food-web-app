
import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect } from "react";
import AuthContext  from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import {BiSearchAlt, BiUser, BiRestaurant ,BiHomeSmile , BiLibrary , BiSmile , BiCycling , BiSupport , BiStore} from "react-icons/bi";
import { FiHome } from "react-icons/fi";
import { useState } from "react";



export function Header() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  
  const [cookieuser, setCookieuser] = useCookies("");
  const [cookieaddress, setCookieaddress] = useCookies("");
  
  const [detailadd, setdetailadd] = useState("");
  const [walletbalance, setwaletbalance] = useState("");

  useEffect(()=>{
    let mydatailadd = localStorage.getItem("detail");
    setdetailadd(mydatailadd);
  }, [])

  useEffect(()=>{
    let mywalletbalance = localStorage.getItem("mywallet");
    setwaletbalance(mywalletbalance);
  }, [])
    

  const [activehumber, setActivehumber] = useState(true);
  
  return( 
        <div className="navbar-main">
            <div className="logo-site"><Link href="/"><img style={{width:45,marginTop:2 ,float:"right", cursor: "pointer"}} src="/favicon.ico"/></Link></div>
            <div className="search-area"><input type="search" className="search-input" placeholder={"جست و جو . . . "} /><button className="i-search-header"><BiSearchAlt/></button></div>
            <div className="address-area"><Link href="/address/addresslist/"><button className="address-btn" > آدرس شما <img style={{width:25, paddingRight:5, marginBottom:-15}} src="/down-arrow.png"/><p className="detail-add-ress" style={{fontSize:10}}> {detailadd} </p></button></Link></div>
            <div className="shoping-card-area"><img style={{width:35}} src="/basket-shop-tmf.png"/></div>
            <div className="login-area"> {user ? (
              <Link href="/auth/profile/"><button className="login-btn"><BiUser/> {cookieuser.username} </button></Link>
            ) : (
              <Link href="/auth/login/"><button className="login-btn"> ورود </button></Link>
            ) }
              
            </div>
            <div className="humberger-area" onClick={()=> setActivehumber(!activehumber)}>{
              activehumber ? <img className="btn-menu" src="/hum-menu-tmf.png/"/> : <img className="btn-menu" src="/close-hum-menu.png/"/> 
            }</div>
            <div className={activehumber ? "sid-cls" : "sid-opn"  } >


              
              <div onClick={()=> setActivehumber(!activehumber)} className="cls-nav-opn"><img style={{width:15}} src="/close-hum-menu.png/"/></div>
              <div>
                <button className="a-btn-nav-a">   <div><a className="wallet-m-a">  موجودی کیف پول   :  {walletbalance} </a></div> <a className="wallet-m-a">افزایش موجودی +</a>  </button>
                </div>
                <div>
                <Link href="/"><button className="a-btn-nav"> <BiHomeSmile/> خانه</button></Link>
                </div>
                <div>
                <button className="a-btn-nav"> <BiRestaurant/> سفارش های من</button>
                </div>
              
                <div>
                <button className="a-btn-nav"><BiLibrary/> لیست پرداخت ها </button>
                </div>
              <div>
                <button className="a-btn-nav"> <BiSmile/> دعوت از دوست </button>
              </div>
              <div>
                <a href="#"><button className="a-btn-nav" > <BiSupport/> تماس با پشتیبانی </button></a>
              </div>
              <div>
                <button className="a-btn-nav"> <BiCycling/> ثبت نام سفیر پیک </button>
              </div>
              <div>
                <button className="a-btn-nav"> <BiStore/> ثبت نام فروشندگان </button>
              </div>
              <div className="logo-nav-menu">
              <img style={{width:40}} src="/favicon.ico"/>
              <a>  فود برسون ، شهر در دستان توست </a>
              </div>
              <div className="dwn-sec-main">
              <div className="div-download">دریافت اپلیکیشن از :</div>
              <div> <a href="https://play.google.com/store/apps/details?id=ir.turkmenfood.android&hl=ar&gl=US" target="_blank"><img style={{width:210}} src="/google-play-tmf.png"/></a></div>
              <div> <a href="https://cafebazaar.ir/app/ir.turkmenfood.android" target="_blank"><img style={{width:180, marginRight:15}} src="/bazzar-tmf.png"/></a></div>
              <div> <a href="https://sibapp.com/applications/Turkmenfood" target="_blank"><img style={{width:210}} src="/sibapp-tmf.png"/></a> </div>
              </div>
              
            </div>

            
            
            
            

            </div>
     )
}

export default Header; 