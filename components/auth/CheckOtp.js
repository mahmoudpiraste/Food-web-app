import AuthContext from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

function CheckOtp  ({ setstep })  {
    const {CheckOtp, resendOtp, loading} = useContext(AuthContext);
    const [activation_code, setactivation_code] = useState('');
    const [show, setShow] = useState(false);
    const [timer, setTimer] = useState('');

    useEffect (() => {
        let time = "0:59";
        let interval = setInterval(() => {
            let countdown = time.split (':');
            let minutes = parseInt(countdown[0], 10);    
            let seconds = parseInt(countdown[1], 10);
            --seconds;
            minutes = (seconds < 0) ? --minutes : minutes;
            if (minutes < 0) {
                clearInterval(interval);
                setShow(true)
            };
            seconds = (seconds < 0) ? 59 : seconds;    
            seconds = (seconds < 10) ? '0' + seconds : seconds;    
            minutes = (minutes < 10) ? '0' + minutes : minutes;
                time = minutes + ':' + seconds;
                setTimer(time);
        }, 1000);

        return () => {
            clearInterval(interval);
            setTimer('')
        }
    }, [])


    

    const handleCheckOtp = async () => {
        if(activation_code === ''){
            toast.error('کد تایید الزامی است');
            return;
        }

       

        const pattern = /^[0-9]{5}$/;
        if (!pattern.test(activation_code)) {
            toast.error("فرمت کد تایید معتبر نیست")
            return;
        }

        await CheckOtp(activation_code)
      }

      const handleResendOtp = async () => {
    //    await resendOtp()
            setstep(1)

}

    return(
        <>
        <p> کد فعالسازی پیامک شده را وارد نمایید</p>
        <input onChange={(e) => setactivation_code(e.target.value)} type="text"  className='input-num'></input>
       <br/>
       <div className="main-cl-v">
       <button onClick={handleCheckOtp} disabled={loading} className='acc-btn-login'>
            تایید و ارسال
            {loading && <div className="spinner-border spinner-border-sm ms-2"></div> }
            </button>
            <div>
                {show ? (<button onClick={handleResendOtp}  className="resend-btn">
                ارسال مجدد کد
            </button >): (<div className="resend-btn">
                {timer}
            </div>)}
           
            </div>
       </div>
        </>
  
    )
}

export default CheckOtp;