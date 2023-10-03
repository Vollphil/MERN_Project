// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: Number,
  position: String,
  created: {
    type: Date,
    default: Date.now,
  },
  Equipment:{
    name:String,
    Type:String,
  },
  Company:{
    name:String,
  },
  Height:{
    type: Number    
  },
  salary:Number,
  favoriteBook:String,
  present:{
    type:Boolean,
    default:false
  },
  notes:[String],
  locations:{
    country:String,
    city:String
  },
  worklog:[{
    workingHours: Number,
    labelWork: String
}],
Meals:{
  starter:String,
  meal: String,
  price:Number
}

});

module.exports = mongoose.model("Employee", EmployeeSchema);
