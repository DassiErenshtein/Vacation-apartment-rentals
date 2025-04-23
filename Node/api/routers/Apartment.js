import express from "express"
import { addApartment, deleteApart, equalBed, equalPrice, getAll, getByAdvertiser, getByBed, getByCodeCat, getByCodeCity, getById, getByPrice, update } from "../controllers/Apartment.js";
import { checkAuth } from "../middleWares.js";
const apartmentRouter=express.Router()
apartmentRouter.post('/add',checkAuth,addApartment)
apartmentRouter.get('/all',getAll)
apartmentRouter.get('/byId/:id',getById)
apartmentRouter.get('/byCat/:id',getByCodeCat)
apartmentRouter.get('/byCity/:id',getByCodeCity)
apartmentRouter.get('/byAdver/:id',checkAuth,getByAdvertiser)
apartmentRouter.get('/bybed',getByBed)
apartmentRouter.get('/bybed/equal/:val',equalBed)
apartmentRouter.get('/byprice',getByPrice)
apartmentRouter.get('/byprice/equal/:val',equalPrice)
apartmentRouter.put('/update',checkAuth,update)
apartmentRouter.delete('/delete/:id',checkAuth,deleteApart)
export default apartmentRouter;