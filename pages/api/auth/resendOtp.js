import axios from "axios";
import { handleError } from "lib/helper"
import { headers } from "next.config";
import cookie from "cookie";
import { NodeNextRequest } from "next/dist/server/base-http/node";


export default async function handler(req, res) {
    if(req.method === 'POST') {

        if (!req.cookies.mobile) {
            res.status(403).json({ message: 'ورود ناموفق یکبار دیگر تلاش کنید' })
            return
        }
       // res.status(200).json({ message: 'ok' })

        try{
            const resApi = await axios.post('https://turkmenfood.ir/api/webapp/v1/api.php', {
                "command":"verify_mobile",
                mobile: req.cookies.mobile
                });

            
            

            

//             console.log(resApi.data.user_id);



           res.setHeader('set-cookie', [cookie.serialize('user_id', resApi.data.user_id, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
           }), cookie.serialize('mobile', resApi.data.mobile, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
           })])

          // console.log(req.body.mobile);
           

          


            res.status(200).json({ message: 'کد ورود برای شما دوباره ارسال شد' })


        }catch(err){
            res.status(422).json({message: {'err': [handleError(err)] } })
        }




    }else{
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}