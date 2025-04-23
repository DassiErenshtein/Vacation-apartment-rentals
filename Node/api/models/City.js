import mongoose from "mongoose";
import Apartment from "./Apartment.js";
const City = mongoose.Schema({
    name: String,
    apartments: [
        {
            type: mongoose.Types.ObjectId,
            // ref - reference
            ref: 'Apartment',
            require: true,
        }]
})
export default mongoose.model('City', City)