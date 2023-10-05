import AuthContext from "@/context/AuthContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

function UserName  ()  {
    const {UserName, loading} = useContext(AuthContext);
    const [fill_userName, setfill_userName] = useState('')
    

    const handleUserName = async () => {
        if(fill_userName === ''){
            toast.error('نام کاربری الزامی است');
            return;
        }

    

        // const pattern = /^[0-9]{5}$/;
        // if (!pattern.test(activation_code)) {
        //     toast.error("فرمت کد تایید معتبر نیست")
        //     return;
        // }

        await UserName(fill_userName)
      }

    return(
        <>
        <p> نام کاربری را وارد نمایید</p>
        <input onChange={(e) => setfill_userName(e.target.value)} type="text"  className='input-num'></input>
       <br/>
        <button onClick={handleUserName} disabled={loading} className='acc-btn-login'>
            تایید و ارسال
            {loading && <div className="spinner-border spinner-border-sm ms-2"></div> }
            </button>
        </>
  
    )
}

export default UserName;