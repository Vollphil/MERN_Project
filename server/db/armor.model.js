const mongoose = require("mongoose");

const {Schema} = mongoose;

const ArmorSchema = new Schema({
    helm:String,
    body:String,
    items:[String],
    created:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Armor",ArmorSchema)