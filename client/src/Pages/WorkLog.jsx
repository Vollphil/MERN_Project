import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const fetchEmployees = () => {
    return fetch("/api/employees/").then((res) => res.json())
}

const AddWorkLogEntries = () => {
    const [employees,setEmployees] = useState([]);
    const [workingHours,setWorkinghours] = useState(0);
    const [labels,setLabels] = useState("")


const addWorklogEntries = async (employeeId) => {
    const response = await fetch(`/api/AddWorkLog/${employeeId}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({worklog: {workingHours: workingHours,labelWork: labels}})
    })
    const data = await response.json()
    return data
}   
useEffect(() => {
    fetchEmployees()
    .then((employee) => {
        setEmployees(employee)
    })
},[])
    return (
        <div>
            <label>Add Working Hours</label>
            <input 
            type="Number"
            value={workingHours}
            onChange={(e) => setWorkinghours(e.target.value)}></input>
            <label>Add Labels</label>
            <input 
            type="text"
            value={labels}
            onChange={(e)=> setLabels(e.target.value)}></input>


            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                           <th>Work Log entries</th>
                            <th>Add WorkLog</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) =>(
                            <tr key={employee._id}>
                                <td>{employee.name}</td>
                                <td>
                                    <Link to={`/WorkLogEntries/${employee._id}`}>
                                    <button>Work Log entries</button>
                                    </Link>
                                    </td>
                                <td><button 
                                type="button"
                                onClick={() => addWorklogEntries(employee._id)}>Add WorkLog</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default AddWorkLogEntries;