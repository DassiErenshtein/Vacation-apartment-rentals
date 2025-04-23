import express from "express"
import { addCategory, getAll } from "../controllers/Category.js";
import { checkAuth } from "../middleWares.js";
const categoryRouter=express.Router()
categoryRouter.post('/add',checkAuth,addCategory)
categoryRouter.get('/all',getAll)
export default categoryRouter;