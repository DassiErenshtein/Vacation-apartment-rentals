import bodyParser from "body-parser"
import express from "express"
import mongoose from "mongoose"
import  advertiserRouter  from "./api/routers/Advertiser.js"
import cityRouter from "./api/routers/City.js"
import apartmentRouter from "./api/routers/Apartment.js"
import categoryRouter from "./api/routers/Category.js"
import { config as configDotenv } from "dotenv"
import cors from 'cors'
configDotenv()
// require('dotenv').config()
const app=express()
const port = 4333
app.use(bodyParser.json())
mongoose.connect(process.env.URI)
.then(()=>{
    console.log("connected")
}).catch(()=>{
    console.log("error");
    
})
app.use(cors())
app.use('/advertiser',advertiserRouter)
app.use('/city',cityRouter)
app.use('/apartment',apartmentRouter)
app.use('/category',categoryRouter)

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})