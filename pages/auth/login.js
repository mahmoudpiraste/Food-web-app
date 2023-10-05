
import CheckOtp from '@/components/auth/CheckOtp';
import Login from '@/components/auth/Login';
import UserName from '@/components/auth/UserName';

import React, { useState } from 'react';


export default function LoginPage ()  {
  
  const [step, setstep] = useState(1);
  

  return (
  <div className='countainer-login'>
        <img style={{width:100, marginBottom:25}} src='/favicon.ico'/>

    <div className='main-login'>

    {step === 1 && <Login setstep={setstep} /> } 
    
     {step === 2 && <CheckOtp setstep={setstep}/> } 

     {step === 3 && <UserName /> } 


    </div>

    </div>
    )
}

// export default LoginPage;