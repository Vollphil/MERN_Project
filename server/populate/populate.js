/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const EmployeeModel = require("../db/employee.model");

const LocationsModel = require("../db/locations.model");
const countrys = require("./country.json");
const cities = require("./city.json");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    worklog:[]
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const populateLocations = async () => {
  await LocationsModel.deleteMany({});

const locations = countrys.map((country,index) =>({
  city: cities[index],
  country,
  
}))

  await LocationsModel.create(...locations)
  console.log("Locations Created")
}
const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();

  await populateLocations();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
