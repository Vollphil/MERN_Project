const { default: mongoose } = require("mongoose");
const mongosse = require("mongoose");

const {Schema} = mongosse

const LocationSchema = new Schema({
    country:String,
    city:String,
    created:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Locations", LocationSchema)