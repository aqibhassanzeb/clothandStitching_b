import express from "express";
const routes = express.Router();

import {
   clothBrands_Create,clothBrands_Delete,clothBrands_Get,clothBrands_Update
} from "../controllers/cloths_controller.js"

routes.post('/brand_create', clothBrands_Create)

routes.put('/brand_update/:_id', clothBrands_Update)
routes.get('/brand', clothBrands_Get)
routes.delete('/brand_delete/:_id', clothBrands_Delete)



export default routes