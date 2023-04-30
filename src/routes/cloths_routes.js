import express from "express";
const routes = express.Router();

import {
   clothBrands_Create,clothBrands_Delete,clothBrands_Get,clothBrands_Update, cloth_Delete, cloth_Get, cloth_Update, cloth_create
} from "../controllers/cloths_controller.js"
import { protect } from "../middleware/user_middleware.js";
import { upload } from "../middleware/pic_upload.js";

routes.post('/brand_create',protect, clothBrands_Create)
routes.put('/brand_update/:_id',protect, clothBrands_Update)
routes.get('/brand', clothBrands_Get)
routes.delete('/brand_delete/:_id',protect, clothBrands_Delete)

// cloths portion 

routes.post('/cloths_create',protect,upload.single("pic"),  cloth_create)
routes.get('/cloths',  cloth_Get)
routes.put('/cloths/:_id',protect, cloth_Update)
routes.delete('/cloths/:_id',protect, cloth_Delete)



export default routes