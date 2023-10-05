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
                "command":"verify_token",
                token: req.cookies.login_token
                });

           



                console.log(resApi.data)
              




          res.status(200).json( { user: resApi.data.data})
         

    

        }catch(err){
            res.status(422).json({message: {'err': [handleError(err)] } })
            
        }




    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}
