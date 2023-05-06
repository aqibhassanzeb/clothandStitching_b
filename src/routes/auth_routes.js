import express from "express";
const routes = express.Router();

import {
    userSignup,
    userLogin,
    userUpdate,
    userGet,
    forgotPass,
    newPass,
} from "../controllers/auth_controller.js"
import { upload } from "../middleware/pic_upload.js";
import { protect } from "../middleware/user_middleware.js";
import { uploadPicture } from "../controllers/upload_pic.js";

routes.post('/user_signup',upload.single("pic"), userSignup)
routes.put('/user_update/:_id',protect, userUpdate)
routes.get('/user_get',protect, userGet)
routes.post('/user_login', userLogin)
routes.post('/reset_password', forgotPass)
routes.post('/new_password', newPass)

// picture upload 

routes.post('/picture_upload',protect,upload.single("pic"), uploadPicture)



export default routes