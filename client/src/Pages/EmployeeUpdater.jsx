import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import Loading from "../Components/Loading";
const fetchLocations = () => {
  return fetch("/api/locations/").then((res) => res.json())
}

const updateEmployee = (employee) => {
  return fetch(`/api/employees/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchEmployee = (id) => {
  return fetch(`/api/employees/${id}`).then((res) => res.json());
};

const fetchEquipment = () => {
  return fetch("/api/equipment/").then((res) => res.json());
}

const fetchCompany = () => {
  return fetch("/api/companies/").then((res) => res.json());
}

const fetchMeals = () => {
return fetch("/api/Meals").then((res) => res.json());  
}

const EmployeeUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [companies,setCompanies] = useState([]);
  const [equipment,setEquipment] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);
  const [locations,setLocations] = useState([])
  const [cities,setCities] = useState("");
  const [countries, setCountries] = useState("")
  const [showMeal,setShowMeal] = useState([])
  const [starter,setStarter] = useState("");
  const [meal,setMeal] = useState("");
  const [price,setPrice] = useState(0);
 

  const assignEqtoEmp = async ( equipmentId) => {
    const selectedEquipment = equipment.find(equip => equip._id === equipmentId)
    if(!selectedEquipment){
      console.log("Equipment not found")
      return
    }
    try{
      const resoponse = await fetch(`/api/equipment/assign/${id}`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({name: selectedEquipment.name,
                              Type: selectedEquipment.Type})
      });
      if(resoponse.ok){
        console.log("Equipment was assigned to Employee")
      } else {
        console.error("Could not add Equipment to Employee")
      }

    }catch(err){
    console.error(err)
    }
  } 

  const companyAssign = async(companyId) => {
    const selectedCompany = companies.find(company => company._id === companyId)

    if(!selectedCompany){
      console.log("Company not found")
      return
    }
    try{
      const response = await fetch(`/api/companiesAssign/${employee._id}`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({name: selectedCompany.name})
      })
      if(response.ok){
        console.log("Company was assigned to Employee")
        console.log(selectedCompany.name)
  
      }else{
        console.error("Could not assign Company")
    }
    }catch(err){
      console.error(err)
    }
  }
    const assignDropdown = async () => {
     
      const response = await fetch(`/api/locations/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({locations:{city: cities, country: countries,},Meals: {starter: starter,meal: meal,price: price}})
      })
      if(response.ok){
        console.log("City was assigned to Employee")
      }else{
        console.error("Could not assign City")
      }
    }

 useEffect(()=> {
  fetchCompany()
  .then((company) =>{
    setCompanies(company)
  })
  fetchMeals()
  .then((meals) => 
  setShowMeal(meals))
 },[])

  useEffect(() => {
    setEmployeeLoading(true);
    fetchEmployee(id)
      .then((employee) => {
        setEmployee(employee);
        setEmployeeLoading(false);
      });
  }, [id]);

  const handleUpdateEmployee = (employee) => {
    setUpdateLoading(true);
    updateEmployee(employee)
      .then(() => {
        setUpdateLoading(false);
        navigate("/");
      });
  };
 
useEffect(() => {
  fetchLocations()
  .then((location) => {
    setLocations(location)
  })
},[])
useEffect(() => {
  fetchEquipment()
  .then((equipment) => {
    setEquipment(equipment)
  })
},[])

  if (employeeLoading) {
    return <Loading />;
  }

  return (
    <div>
    <EmployeeForm
      employee={employee}
      onSave={handleUpdateEmployee}
      disabled={updateLoading}
      onCancel={() => navigate("/")}
    />
    {(employee.level !== "Junior")?(
      <div>
      <label>Specifing Years</label>
   <input type ="text"></input>
   </div>
   ):""}
  
   <label>Add a City</label>
   <select value={cities} onChange={(e) => setCities(e.target.value)} onClick={assignDropdown}>
   <option value=""> Select an City</option>
    {locations.map((location) => (
      <option key={location._id} value={location.city} >{location.city}</option>
    ))}
    </select>

   <label>Add a Country</label>
   <select value={countries} onChange={(e) => setCountries(e.target.value)} onClick={assignDropdown}>
   <option value="">Select a Country</option>
   {locations.map((location)=> (
    <option key={location._id} value={location.country} >{location.country}</option>
  ))}
   </select>

   <label>Add Starter</label>
   <select value={starter} onChange={(e)=> setStarter(e.target.value)} onClick={assignDropdown}>
    <option vlaue="">Select a Starter</option>
    {showMeal.map((meal) => (
      <option key={meal._id} value={meal.starter}>{meal.starter}</option>
    ))}
   </select>

   <label>Add Meal</label>
   <select value={meal} onChange={(e)=> setMeal(e.target.value)} onClick={assignDropdown}>
    <option vlaue="">Select a Meal</option>
    {showMeal.map((meal) => (
      <option key={meal._id} value={meal.meal}>{meal.meal}</option>
    ))}
   </select>

   <label>Add Price</label>
   <select value={price} onChange={(e)=> setPrice(e.target.value)} onClick={assignDropdown}>
    <option vlaue="">Select a Price</option>
    {showMeal.map((meal) => (
      <option key={meal._id} value={meal.price}>{meal.price}</option>
    ))}
   </select>

    <label>Equipment</label>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Assign Eq to Emp</th>
        </tr>
      </thead>
      <tbody>
        {equipment.map((equip) => (

          <tr key={equip._id}>
            <td>{equip.name}</td>
            <td>{equip.Type}</td>
            <td>{equip.amount}</td>
            <td><button  type="button" onClick={() => assignEqtoEmp(equip._id)}>Assign</button></td>
          </tr>
        ))}
      </tbody>
    </table>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Assign Company</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) =>(
                  <tr key={company._id}>
                    <td>{company.name}</td>
                    <td><button type="button" onClick={() => companyAssign(company._id)}>Assign</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </div>
  );
};

export default EmployeeUpdater;
