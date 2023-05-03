import { order } from "../models/order.js"
import { unstitchedOrder } from "../models/unstitched_order.js"



export const order_Create = async(req, res) => {
    const {name,total_price,order_type,user} = req.body
   let picture
    if(req.file){
     picture=req.file.filename
    }
    if (!name || !total_price || !order_type || !user) {
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

export const order_Get = async(req, res) => {
    let filter = {}
    if (req.query._id) {
        filter = { _id: req.query._id.split(','),isActive:true }
    }
    if (req.query.user) {
        filter = { user: req.query.user.split(','),isActive:true }
    }
    if (req.query.product) {
        filter = { product: req.query.product.split(','),isActive:true }
    }
    if (req.query.payment_status) {
        filter = { payment_status: req.query.payment_status,isActive:true }
    }
    if (req.query.delivery_status) {
        filter = { delivery_status: req.query.delivery_status,isActive:true }
    }
    if (req.query.un_stitched) {
        filter = { un_stitched: req.query.un_stitched.split(','),isActive:true }
    }
        try {
            const result= await order.find(filter).populate("un_stitched").populate("product").populate({ path: 'user', select: '-password' });
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