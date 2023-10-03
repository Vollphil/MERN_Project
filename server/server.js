require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model")
const CompanyModel = require("./db/companies.model")
const books = require("./books")
const ArmorModel = require("./db/armor.model")
const LocationsModel = require("./db/locations.model")
const MealModel = require("./db/meal.model")

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });
  return res.json(employees);
});
app.get("/api/employees/:id",async(req,res) => {
 
  const employees = await EmployeeModel.findById(req.params.id)
  return res.json(employees)
})
app.get("/api/Meals",async(req,res) => {
  const meals = await MealModel.find().sort({starter: "asc"})
  return res.json(meals)
})
app.get("/api/locations/", async(req,res) => {
  const locations = await LocationsModel.find().sort({created: "desc"})
  return res.json(locations)
})
app.get("/api/searchEmployee", async(req,res) => {
  const search = req.query.q
  try{
    const employees = await EmployeeModel.find({
      name: {$regex: search, $options: "i"}
    });
    res.json(employees);
  }catch(err){
    res.status(500).json({message: err.message})
  }

})
app.get("/api/same",async(req,res) => {
  const {favoriteBook, position} = req.query
  
  const employee = await EmployeeModel.find({favoriteBook, position}).sort({created: "desc"})
  return res.json(employee)
 })

app.get("/api/similar" ,async(req,res) => {
  const {level ,position} = req.query;
  const query = {level, position};
  const employees = await EmployeeModel.find(query).sort({created:"desc"})
  return res.json(employees)
})

app.get("/api/random/levelSearch",async(req,res) => {
  const search = parseInt(req.query.qu)
  const employee = await EmployeeModel.find({
    level: search
  })
  return res.json(employee)
})
app.get("/api/armors/",async(req,res) => {
  const armors = await ArmorModel.find().sort({created: "desc"})
  return res.json(armors)
})

app.get("/api/salarySearch",async(req,res) => {
  const search = parseInt(req.query.q)
  const employee = await EmployeeModel.find({
    salary: {$gte:search}
  })
  return res.json(employee)
})
app.get("/api/equipment/", async(req,res) => {
  const equipment = await EquipmentModel.find().sort({name: "asc"})
  return res.json(equipment)
});

app.get("/api/companies",async(req,res) => {
  const companies = await CompanyModel.find().sort({name: "asc"})
  return res.json(companies)
})

app.get("/api/level",async(req,res) => {
  const sortlevel = req.query.q
  const sortOrder = sortlevel === "asc" ? "asc" : "desc";
  const employees = await EmployeeModel.find().sort({level: sortOrder})
  console.log(sortlevel)
  return res.json(employees)
})

app.get("/api/sort/",async(req,res) => {
  const sortProp = req.query.q
  const sortOrder = sortProp === "asc" ? "asc" : "desc";
  const employees = await EmployeeModel.find().sort({name: sortOrder })
  return res.json(employees);
})

app.get("/api/employees/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);
  return res.json(employee);
});
  
app.get("/api/filterLevel", async(req,res)=> {
    const search = req.query.q
    try{
      const employee = await EmployeeModel.find({
        level: {$regex:search, $options: "i"},
     
      });
      res.json(employee)
    }catch (err) {
      res.status(500).json({ message: err.message });
    }

} )

app.get("/api/height",async(req,res) => {
const height = parseInt(req.query.q)
try{
  const employee = await EmployeeModel.find({
    Height:{$gte: height}
  });
  res.json(employee)
}catch(err){
  res.status(500).json({message: err.message})
}
})


app.get("/api/filterPosition", async(req,res)=> {
  const search = req.query.q
  try{
    const employee = await EmployeeModel.find({
      position: {$regex:search, $options: "i"},
   
    });
    res.json(employee)
  }catch (err) {
    res.status(500).json({ message: err.message });
  }

} )

app.post("/api/createArmor/", async(req,res,next) => {
  const armor = req.body;
  try{
    const saved = await ArmorModel.create(armor)
    return res.json(saved)
  }catch(err){
    return next(err)
  }
})
 
app.post("/api/equipment/",async(req,res,next) => {
  const equipment = req.body;
  try{
    const saved = await EquipmentModel.create(equipment)
    return res.json(saved)
  } catch(err) {
    return next(err);
  }
})

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.post("/api/createMeals",async(req,res,next) => {
  const meals = req.body;
  try{
    const saved = await MealModel.create(meals);
    return res.json(saved);
  }catch(err){
    return next(err)
  }
});

app.post("/api/companies/", async(req,res,next) => {
  const companies = req.body;

  try{
    const saved = await CompanyModel.create(companies);
    return res.json(saved)
  }catch(err){
    return next(err)
  }
})

app.put("/api/addDropdown:id", async (req, res) => {
  try {
    const {id} = req.params
    const { locations,Meals } = req.body;
    const employee = await EmployeeModel.findById(id);
  if(locations != undefined){
    employee.locations = locations;

  }
  if(Meals != undefined){
    employee.Meals = Meals
  }
    await employee.save()
    return res.json(employee);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
});

app.patch("/api/employee/:employeeId/notes",async(req,res) => {
  try{
  const {notes} = req.body;
  const employe = await EmployeeModel.findByIdAndUpdate(
    {_id: req.params.employeeId},
    {$push: {notes: notes}},
    {new: true}

  )
  return res.json(employe)
}catch(err){
  console.error(err)
    return res.status(500).json({error: "Server Error"})

}
})

app.patch("/api/labl/:employeesid",async(req,res) => {
  const {favoriteBook} = req.body
  const employee = await EmployeeModel.findByIdAndUpdate(
    {_id: req.params.employeesid},
    {$set: {favoriteBook: favoriteBook}},
    {new: true}
  ) 
  return res.json(employee)
})

app.patch("/api/present/:id",async(req,res) => {
  const {present} = req.body
  const employee = await EmployeeModel.findByIdAndUpdate(
    {_id: req.params.id},
    {$set: {present: present} },
    {new: true}
  )
  return res.json(employee)
 })
app.patch("/api/armor/:Id",async(req,res) => {
  const {helm,body,items} = req.body
  const employee = await ArmorModel.findByIdAndUpdate(
    {_id:req.params.Id},
    {$set: {helm: helm,body: body,items: items}},
    {new: true}
  )
  return res.json(employee)
})

app.patch("/api/employees/salary/:employeeid",async(req,res) => {
  const {salary} = req.body
  const employee = await EmployeeModel.findByIdAndUpdate(
    { _id: req.params.employeeid},
    { $set: {salary: salary}},
    { new: true}

  )
  return res.json(employee)
})
app.patch("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});


app.patch("/api/companiesAssign/:id",async(req,res,next)=>{
  try{
    const {id} = req.params;
    const {name} = req.body;

    const employee = await EmployeeModel.findById(id)

    if(!employee){
      return res.status(404).json({ error: 'Employee not foung'})
    }
    employee.Company.name = name;
    await employee.save();
    return res.json(employee)
  }catch(err){
    console.error(err)
    return res.status(500).json({error: "Server Error"})
  }
})
app.patch("/api/equipment/assign/:id",async(req,res,next) => {
  try{
      const {id} = req.params;
      const {name, Type} = req.body;
      
      const employee = await EmployeeModel.findById(id)
      if(!employee) {
        return res.status(404).json({ error: 'Emplyoee not found'})
      }
      employee.Equipment.name = name
      employee.Equipment.Type = Type
      await employee.save();
      return res.json(employee)
  }catch(err){
    console.error(error);
    return res.status(500).json({error :'Server Error'})
  }
})


app.patch("/api/giveAllSalary", async(req,res)=>{
  const employees = await EmployeeModel.find().sort({name: "asc"})
  const updateEmployees = await Promise.all(
    employees.map(async(employee) => {
    const randomSalary = Math.floor(Math.random()*(3000-1800 + 1))+1800
    employee.salary = randomSalary
    return employee.save()
  })
  )
  res.status(200).json(updateEmployees)
})
app.patch('/api/books/random',async(req,res) => {
  const employees = await EmployeeModel.find().sort({name: "asc"})
  const updatedEmployees = await Promise.all(
    employees.map(async(employe) => {
      const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))]
      employe.favoriteBook = pick(books)
      return employe.save()
    })
   
  )
  res.status(200).json(updatedEmployees)
})

app.patch('/api/randomizeHeight', async(req,res) => {
  try{
    const employee = await EmployeeModel.find().sort({name:"asc"})
    const updateEmployees = await Promise.all(
      employee.map(async(employe) => {
        const randomHeight = Math.floor(Math.random()*(190-140 +1)) +140
        employe.Height = randomHeight 
        return employe.save();
      })
    )
     res.status(200).json(updateEmployees)
  }catch(err){
    res.status(500).json({error: err.message})
  }


})

app.put("/api/randomizeHeight/",async(req,res) => {
  try{
    const employee = await EmployeeModel.find().sort({name: "asc"})
    const updateEmployee = await Promise.all(
      employee.map((employee) => {
        const randomizeHeight = Math.floor(Math.random() *(190-140+1))+140
        employee.height = randomizeHeight
        return employee.save();
      })
    )
    res.status(200).json(updateEmployee)
  }catch(err){
    res.status(500).json({error: err.message})
  }
})

app.put("/api/AddWorkLog/:id",async(req,res) => {
  const {id} = req.params
  const {worklog} = req.body
  try{
    const employee = await EmployeeModel.findById(id)
    if(worklog!= undefined){
      employee.worklog.push(worklog)
    }
    await employee.save()
    return res.json(employee)
  }catch(err){
    console.error(err)
    return res.status(500).json({error: "Server Error"})
  }
})

app.put("/api/")
app.delete("/api/armorDelete/:id",async(req,res,next) => {
  try{
    const armor = await ArmorModel.findById(req.params.id)
    const deleted = await armor.delete();
    return res.json(deleted)
  }catch(err){
    return next(err)
  }
})
app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
