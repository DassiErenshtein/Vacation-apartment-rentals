import express from "express"
import { addCity, getAll, getWeather } from "../controllers/City.js"
import { checkAuth } from "../middleWares.js"
const cityRouter=express.Router()
cityRouter.post('/add',checkAuth,addCity)
cityRouter.get('/all',getAll)
cityRouter.get('/weather/:id',getWeather)

export default cityRouter;