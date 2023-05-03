import express from "express";
const routes = express.Router();


import { upload } from "../middleware/pic_upload.js";
import { protect } from "../middleware/user_middleware.js";
import { order_Create, order_Delete, order_Get, order_Update } from "../controllers/order_controller.js";

routes.post('/order',protect,upload.single("pic"), order_Create)
routes.put('/order/:_id',protect, order_Update)
routes.get('/order', order_Get)
routes.delete('/order/:_id',protect, order_Delete)




export default routes