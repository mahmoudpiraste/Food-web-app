import axios from "axios";
import { handleError } from "lib/helper";
import { toast } from "react-toastify";
import { useEffect } from "react";
import CarroBest from "@/components/carosel/caroselbest";
import Carodisc from "@/components/carosel/caroseldisc";
import Caroasr from "@/components/carosel/carosasrane";
import Caronan from "@/components/carosel/caroselnan";
import Carojust from "@/components/carosel/caroseljust";
import Caronew from "@/components/carosel/caroselnew";
import Caromarket from "@/components/carosel/caroselmarket";
import CarroHome from "@/components/carosel/homecarosel";
import BannerOne from "@/components/banners/bannerhomeone";



function Home ()  {
  
  return (
    <div>
      <CarroHome/>
      <CarroBest/>
      <Carodisc/>
      <BannerOne/>
      <Caroasr/>
      <Caronan/>
      <Carojust/>
      <Caronew/>
      <Caromarket/>
      

      </div>
  )
}

export default Home;


