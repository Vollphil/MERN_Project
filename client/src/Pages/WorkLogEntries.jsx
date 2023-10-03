import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const fetchEmployees=(employeeId) => {
    return fetch(`/api/employees/${employeeId}`).then((res) => res.json())
}

const WorklogEntries =() => {
    const {employeeId} = useParams()
    const [employees,setEmployees]= useState([]);

    
useEffect(() => {
    fetchEmployees(employeeId)
    .then((employee) => {
        setEmployees(employee)
    })
    
},[employeeId])


    return(
        <div>
            {employees.worklog && employees.worklog.map((employee) => (
                <ul key ={employee._id}>
                    <li>Working Hours:{employee.workingHours}</li>
                    <li>Label: {employee.labelWork}</li>
                </ul>
            ))}
        </div>
    )
}

export default WorklogEntries