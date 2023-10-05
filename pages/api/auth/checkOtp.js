import axios from "axios";
import { handleError } from "lib/helper"
import { headers } from "next.config";
import cookie from "cookie";
import { toast } from "react-toastify";
import { useState } from "react";

export default async function handler(req, res) {
    if(req.method === 'POST') {


       // res.status(200).json({ message: 'ok' })

        if (!req.cookies.user_id) {
            res.status(403).json({ message: 'ورود ناموفق یکبار دیگر تلاش کنید' })
            return
        }

        if (!req.cookies.mobile) {
            res.status(403).json({ message: 'ورود ناموفق یکبار دیگر تلاش کنید' })
            return
        }




       try{
            const resApi = await axios.post('https://turkmenfood.ir/api/webapp/v1/api.php', {
                "command":"verify_act_code",
                 mobile: req.cookies.mobile ,
                  temp_user_id: req.cookies.user_id ,
                   activation_code: req.body.activation_code
                })

            // console.log(resApi.data);






            res.setHeader('set-cookie', [cookie.serialize('user_id', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: new Date(0),
                path: '/'
               }), cookie.serialize('user_id', resApi.data.user_id, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7,
                path: '/'
               }), cookie.serialize('login_token', resApi.data.login_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7,
                path: '/'
               }), cookie.serialize('username', resApi.data.user_name, {
                httpOnly: false,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7,
                path: '/'
               }), cookie.serialize('status', resApi.data.status, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7,
                path: '/'
               })])



    
              




        //  res.status(200).json( { data: resApi.data , message: 'شما وارد شدید'})
         

       
            if (resApi.data.status === 3) {
                res.status(422).json({ message: 'خطایی رخ داده است' })
                return
            }
            if (resApi.data.status === 0) {
                res.status(422).json({ message: 'خطایی رخ داده است' })
                return
            }
            if (resApi.data.status === 2) {
                res.status(422).json({ message: 'کد تایید منقضی شده است' })
                return
        }

        if (resApi.data.status === 1) {
            res.status(200).json({ data: resApi.data })
            return
        }

        if (resApi.data.status === 4) {
            res.status(200).json({ data: resApi.data })
            setstep(3)
            return
        }
    

        }catch(err){
            res.status(422).json({message: {'err': [handleError(err)] } })
            
        }




    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}
