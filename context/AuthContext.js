import { handleError } from "lib/helper";
import { toast } from "react-toastify";

import { createContext, useEffect, useState } from "react" ;
import axios from "axios";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)

    const router = useRouter();

    useEffect(() => {
        checkUserLoggedIn()
    }, [])
   


    const login = async ( mobile ) => {
        try{
            setLoading(true)

            const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/auth/login`,  { "command":"verify_mobile" , mobile })
           
            toast.success(res.data.message);



        }catch(err){
            toast.error(handleError(err))
        }finally{
            setLoading(false)
        }
    }

    const resendOtp = async (  ) => {
        try{
            

            const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/auth/login`,  { "command":"verify_mobile"  })
           
            toast.success('کد ورود دوباره ارسال شد');



        }catch(err){
            toast.error(handleError(err))
        }finally{
            setLoading(false)
        }
    }

    const CheckOtp = async ( activation_code ) => {
        try{
            setLoading(true)

            const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/auth/checkOtp`,  {
                  "command":"verify_mobile",
                    activation_code 
                } )
           


            toast.success(res.data.data.message);
           
            
           setUser(res.data.data);

            router.push('/address/addresslist')

        }catch(err){
            toast.error(handleError(err));

           
        }finally{
            setLoading(false)
        }
    }

    const UserName = async ( fill_userName ) => {
        try{
            setLoading(true)

            const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/auth/checkOtp`,  {
                  "command":"verify_mobile",
                  fill_userName
                } )
           


            toast.success(res.data.data.message);
           
            
           setUser(res.data.data);

            router.push('/address/addresslist')

        }catch(err){
            toast.error(handleError(err));

           
        }finally{
            setLoading(false)
        }
    }

    const checkUserLoggedIn = async ( ) => {
        try{
            

            const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/auth/me`,)
           


            
           
            
           setUser(res.data);

            

        }catch(err){
            setUser(null);
            router.push('/auth/login')

           
        }
    }
   


    return (
        <AuthContext.Provider value={{ login, CheckOtp, UserName, resendOtp, user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;