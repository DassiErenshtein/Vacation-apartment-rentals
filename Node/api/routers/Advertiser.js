import express from "express"
import {  login, register } from "../controllers/Advertiser.js"
const advertiserRouter=express.Router()
advertiserRouter.post('/register',register)
advertiserRouter.post('/login',login)
export default advertiserRouter;