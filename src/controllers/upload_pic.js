
export const uploadPicture = async(req, res) => {
  let picture=req.file.filename
      if(picture){
         res.status(200).json({success:true,upload_picture:picture, message: "uploaded successfully" })  
        } else{
          res.status(400).json({success:false, message: "something went wrong!" })  
      } 
       
     
}