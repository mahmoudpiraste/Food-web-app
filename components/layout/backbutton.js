import Router from "next/router";
import React from "react";

export default function BackButton (){
    
    
    
    return(
        <>
        <span onClick={() => Router.back()} className="back-button-main">برگشت <img style={{width:18}} src="/previous-main.png" /> </span>
        </>
    )
}
