import express from "express";
const routes = express.Router();


import { upload } from "../middleware/pic_upload.js";
import { protect } from "../middleware/user_middleware.js";
import { notificationUpdate_Read, notification_Get, notification_Update, order_Create, order_Delete, order_Get, order_Update } from "../controllers/order_controller.js";

routes.post('/order',protect,upload.single("pic"), order_Create)
routes.put('/order/:_id',protect, order_Update)
routes.get('/order', order_Get)
routes.delete('/order/:_id',protect, order_Delete)

// notification portion 
routes.get('/notifications',protect, notification_Get)
routes.put('/notifications/:_id',protect, notification_Update)
routes.put('/notifications_read/:userId',protect, notificationUpdate_Read)



export default routes