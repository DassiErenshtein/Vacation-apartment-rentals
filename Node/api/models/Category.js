import mongoose from "mongoose";
import Apartment from "./Apartment.js";
const Category = mongoose.Schema({
    name: String,
    apartments: [
        {
            type: mongoose.Types.ObjectId,
            // ref - reference
            ref: 'Apartment',
            require: true,
            // unique:true
        }]
})
export default mongoose.model('Category', Category)