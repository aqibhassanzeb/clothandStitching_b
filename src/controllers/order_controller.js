import { notification } from "../models/notification.js"
import { order } from "../models/order.js"
import { unstitchedOrder } from "../models/unstitched_order.js"
import { User } from "../models/user.js"



export const order_Create = async(req, res) => {
    const {name,total_price,order_type,user} = req.body
   let picture
    if(req.file){
     picture=req.file.filename
    }
    if (!name || !total_price || !order_type || !user) {
        return res.status(422).json({ error: "please fill the fields " })
    }
    let title
    let titlehelp="order placed"
    title= order_type + " " + titlehelp;

   try {
    
       const unsOrder = new unstitchedOrder({...req.body,image:picture})
        let unsOrderSaved=  await unsOrder.save()
    if(unsOrderSaved){
       let un_stitched = unsOrderSaved._id
       const sOrder=new order({...req.body,un_stitched})
       let saveOrder=  await sOrder.save()
       const notifi=new notification({title,order_id:saveOrder._id,createdby:user,...req.body})
       await notifi.save()
       
       res.status(200).json({success:true, message: "submitted successfully" })
    }else{
        res.status(422).json({ message: 'something went wrong!' })
        
    }
    } catch (error) {
        res.status(422).json({success:false, message: 'something went wrong!' })
    }
     
}

export const order_Get = async(req, res) => {
    let filter = {isActive:true}
    if (req.query._id) {
        filter._id=req.query._id.split(',') 
    }
    if (req.query.user) {
        filter.user=req.query.user.split(',') 
    }
    if (req.query.product) {
        filter.product =req.query.product.split(',') 
    }
    if (req.query.payment_status) {
        filter.payment_status=req.query.payment_status 
    }
    if (req.query.delivery_status) {
        filter.delivery_status=req.query.delivery_status 
    }
    if (req.query.un_stitched) {
        filter.un_stitched=req.query.un_stitched.split(',')
    }
    if (req.query.assign_tailor) {
        filter.assign_tailor=req.query.assign_tailor.split(',')
    }
        try {
            const result= await order.find(filter).populate("un_stitched").populate("product").populate({ path: 'user', select: '-password' })
            .populate({ path: 'assign_tailor', select: '-password' });
               res.json({data:result})
        } catch (error) {
               res.status(400).json({ error: "something went wrong!" })
            
        }
  
    }

export const order_Update = async(req, res) => {
    const {_id} = req.params
        try {
            let getOrder= await order.findOne({_id })
            let unStitchedId=getOrder.un_stitched
            await unstitchedOrder.findByIdAndUpdate({_id:unStitchedId},req.body)
            await order.findByIdAndUpdate({_id },req.body)
               res.json({ message: "updated successfully" })
        } catch (error) {
               res.status(400).json({ error: "something went wrong!" })   
        }
     
}
export const order_UpdatebyTailor = async(req, res) => {
    const {_id} = req.params
    const {assign_tailor}=req.body
    if(!assign_tailor){
        return res.status(422).json({ error: "tailor is required " })
    }
        try {
            let getOrder= await order.findById({_id })
            let result =  await notification.findOneAndUpdate({order_id:getOrder._id},{assign_tailor})
            
            await order.findByIdAndUpdate({_id },{assign_tailor})
               res.json({ message: "Assign Tailor Successfully" })
        } catch (error) {
               res.status(400).json({ error: "something went wrong!" })   
        }
     
}

export const order_Delete = async(req, res) => {
    const {_id} = req.params
        try {
            let getOrder= await order.findOne({_id })
            let unStitchedId=getOrder.un_stitched
            await unstitchedOrder.findByIdAndDelete({_id:unStitchedId})
            await order.findByIdAndDelete({_id })
               res.json({ message: "deleted successfully" })
        } catch (error) {
               res.status(400).json({ error: "something went wrong!" })
            
        }
     
}

                                                        // notification section 


export const notification_Get = async(req, res) => {
    let filter = {isActive:true}
    if (req.query._id) {
        filter._id=req.query._id.split(',') 
    }
    if (req.query.createdby) {
        filter.createdby=req.query.createdby.split(',') 
    }
    if (req.query.product) {
        filter.product =req.query.product.split(',') 
    }
    if (req.query.un_stitched) {
        filter.un_stitched=req.query.un_stitched.split(',')
    }
    if (req.query.assign_tailor) {
        filter.assign_tailor=req.query.assign_tailor.split(',')
    }
        try {
            const result= await notification.find(filter).populate("un_stitched").populate("product").populate({ path: 'createdby', select: '-password' })
            .populate({ path: 'assign_tailor', select: '-password' });
               res.json({data:result})
        } catch (error) {
               res.status(400).json({ error: "something went wrong!" })
            
        }
  
    }


    export const notification_Update = async(req, res) => {
        const {_id} = req.params
            try {
                await notification.findByIdAndUpdate({_id },req.body)
                   res.json({ message: "updated successfully" })
            } catch (error) {
                   res.status(400).json({ error: "something went wrong!" })   
            }
         
    }

    export const notificationUpdate_Read = async(req, res) => {
        const { userId } = req.params;

        let admin=false
            try {
            let user=  await User.findById({_id:userId})
            let filter = { readby: { $ne: userId } };
            
            if(user.status !="admin") {
              filter["$or"] = [{ assign_tailor: userId }, { createdby:userId }];
            } 

                await notification.updateMany( filter, { $push: { readby: userId } });
                   res.json({message: "All messages marked as read successfully" })
            } catch (error) {
                   res.status(400).json({ error: "something went wrong!" })   
            }
         
    }