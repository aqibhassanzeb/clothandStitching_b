import { order } from "../models/order"
import { unstitchedOrder } from "../models/unstitched_order"



export const order_Create = async(req, res) => {
    const {name,phone,address,product,size,total_price,order_type} = req.body
   let picture
    if(req.file){
     picture=req.file.filename
    }
    if (!name  || !phone || !address || !size || !total_price || !order_type) {
        return res.status(422).json({ error: "please fill the fields " })
    }
   try {
    
       const unsOrder = new unstitchedOrder({...req.body,image:picture})
        let unsOrderSaved=  await unsOrder.save()
    if(unsOrderSaved){
       let un_stitched = unsOrderSaved._id
       const sOrder=new order({...req.body,un_stitched})
       await sOrder.save()
       res.status(200).json({success:true, message: "submitted successfully" })
    }else{
        res.status(422).json({ message: 'something went wrong!' })
        
    }
    } catch (error) {
        res.status(422).json({success:false, message: 'something went wrong!' })
    }
                        
               
       
}