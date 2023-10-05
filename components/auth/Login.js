import AuthContext from "@/context/AuthContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";




function Login  ( { setstep } )  {
    const { login, loading } = useContext(AuthContext);
    const [mobile, setmobile] = useState('');
    

    const handlelogin = async () => {
        if(mobile === ''){
            toast.error('شماره موبایل الزامی است');
            return;
        }

        const pattern = /^(\+98|0)?9\d{9}$/;
        if (!pattern.test(mobile)) {
            toast.error("فرمت شماره مبایل معتبر نیست")
            return;
        }

        await login(mobile)
        
        setstep(2)
      }

    return(
        <>
        <p> جهت ورود شماره موبایل خود را وارد نمایید</p>
        <input onChange={(e) => setmobile(e.target.value)} type="email"  className='input-num'></input>
       <br/>
        <button onClick={handlelogin} disabled={loading} className='acc-btn-login'>
            دریافت کد فعال سازی
            {loading && <div className="spinner-border spinner-border-sm ms-2"></div> }
            </button>
        </>
  
    )
}

export default Login;