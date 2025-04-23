import mongoose from "mongoose";
import Apartment from "./Apartment.js";
const Advertiser = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    phone: String,
    anotherPhone: {
        type: String,
        require: false
    },
    //apartments:Array
    apartments: [
        {
            type: mongoose.Types.ObjectId,
            // ref - reference
            ref: 'Apartment',
            require: true,
            // unique: true
        }]
})
export default mongoose.model('Advertiser', Advertiser);