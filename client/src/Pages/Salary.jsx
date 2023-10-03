import { useEffect,useState } from "react"

const fetchEmployees = () => {
    return fetch("/api/employees/").then((res) => res.json())
}

const AddSalary = () => {
const [employees,setEmployees] = useState([])
const [salary,setSalary] = useState(0);
const [searchSalary,setSearchSalary] = useState(0)

const updateSalary = async(selectedEmployee) => {
    
    const response = await fetch(`/api/employees/salary/${selectedEmployee}`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({salary: salary})
    })
    if(response.ok){
        console.log("Salary was assigned to Employee")
        setEmployees(employees.filter((employee) => employee.salary !== undefined ))
        console.log("works")
      } else {
        console.error("Could not add Salary to Employee")
      
      }
}

const giveAllEmpSalary = async() =>{
    const response = await fetch("/api/giveAllSalary",{
        method: "PATCH",
      })
   const updatedEmployees = await response.json()
   setEmployees(updatedEmployees)
}

useEffect(() => {
   
    const filterSalary = async () => {
        if(searchSalary > 1800){
        const response = await fetch(`/api/salarySearch?q=${searchSalary}`)
        const data = await response.json()
        setEmployees(data)
    }else{
        setEmployees(employees)
    }
    }
    filterSalary()
},[searchSalary,employees])

useEffect(() => {
    fetchEmployees()
    .then((employee) => {
    setEmployees(employee)        
    })
},[])

    return (
        <div>
        <div>
            <label>Add salary to Employee</label>
        <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)}></input>
        </div>
        <div>
            <label>Search for Salary</label>
            <input 
            type="number"
            value={searchSalary}
            onChange={(e)=> setSearchSalary(e.target.value)}></input>
        </div>
        <div>
            
            <button type="button" onClick={giveAllEmpSalary}>Random Salary</button>
        </div>
        <div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Salary</th>
                    <th>Add Salary</th>
                </tr>

            </thead>
            <tbody>
                {employees.map((employee) =>(
                    <tr key={employee._id}>
                        <td>{employee.name}</td>
                        <td>{employee.salary}</td>
                        <td><button type="button" onClick={() => updateSalary(employee._id)}>Update Salary</button></td>
                    </tr>
                ))}
            </tbody>

        </table>
        </div>
        </div>
    )
}

export default AddSalary