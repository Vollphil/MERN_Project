const mongoose= require("mongoose");

const {Schema} = mongoose

const MealSchema = new Schema({
starter:String,
meal:String,
price:Number

});

module.exports = mongoose.model("Meal",MealSchema)