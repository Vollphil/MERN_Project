const mongoose = require("mongoose");

const {Schema} = mongoose;

const CompanySchema = new Schema({
    name:String,
    created:{
        type:Date,
        default:Date.now,
    }
})

module.exports = mongoose.model ("Company",CompanySchema);