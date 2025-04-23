import mongoose from "mongoose";
const Apartment = mongoose.Schema({
    name: {
        type: String,
        require: false
    },
    description: String,
    pic: String,
    codeCategory: {
        type: mongoose.Types.ObjectId,
        // ref - reference
        ref: 'Category',
        // require: true
    },
    codeCity: {
        type: mongoose.Types.ObjectId,
        // ref - reference
        ref: 'City',
        // require: true
    },
    address: String,
    numOfBeds: Number,
    adds: String,
    price: Number,
    codeAdvertiser: {
        type: mongoose.Types.ObjectId,
        // ref - reference
        ref: 'Advertiser',
        // require: true
    }
    //codeAdvertiser:String
})
export default mongoose.model('Apartment', Apartment);