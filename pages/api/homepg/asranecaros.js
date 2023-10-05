import axios from "axios";
import { handleError } from "lib/helper"
import { headers } from "next.config";
import cookie from "cookie";
import { toast } from "react-toastify";

export default async function handler(req, res) {
    if(req.method === 'POST') {


       // res.status(200).json({ message: 'ok' })

        if (!req.cookies.login_token) {
            router.push('/auth/login')
        }


       

       




       try{
            const resApi = await axios.post('https://turkmenfood.ir/api/webapp/v1/api.php', {
                "command": "request_time_dependent",
                user_id : req.cookies.user_id,
                selected_address_lat : req.cookies.selected_lat,
                selected_address_long : req.cookies.selected_long,
                token : req.cookies.login_token
                });

           



                // console.log(resApi.data)
              



                // res.setHeader('set-cookie', [cookie.serialize('address_id', resApi.data.address_list[0].id, {
                //     httpOnly: true,
                //     secure: process.env.NODE_ENV !== 'development',
                //     maxAge: 60 * 60 * 24 * 7,
                //     path: '/'
                //    }), cookie.serialize('address', resApi.data.address_list[0].address, {
                //     httpOnly: false,
                //     secure: process.env.NODE_ENV !== 'development',
                //     maxAge: 60 * 60 * 24 * 7,
                //     path: '/'
                //    })])



          res.status(200).json( resApi.data )
         

    

        }catch(err){
            res.status(422).json({message: {'err': [handleError(err)] } })
            
        }




    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}
