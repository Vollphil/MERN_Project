import { Link } from "react-router-dom";
import "./EmployeeTable.css";



const EmployeeTable = ({ employees, onDelete,setEmployees}) => {
  


const handleCheck= (id,present) => {
  const checkEmloyee = async () => {
    const response = await fetch(`/api/present/${id}`,{
      method:"PATCH",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({present: present})
    })
    const data = await response.json()
    console.log(data)

    setEmployees((employees)=> employees.map((employee)=>
    (employee._id === id)? 
    {...employee, present}:
    (employee)
  ));
   
  }
  checkEmloyee()
}

  

  return (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th >Name</th>
          <th>Level</th>
          <th>Position</th>
          <th>Height</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>{employee.Height}</td>
            <td>
              <Link to={`/update/${employee._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(employee._id)}>
                Delete
              </button>
            </td>
            <td><button type="button" onClick={() => console.log(employee.present)}></button></td>
            <td><label><input 
            type="checkbox"
            checked={employee.present}
            onChange={(e) => handleCheck(employee._id,e.target.checked)}
             />present</label></td>

             <td>
              <Link to={`/employee/${employee._id}/notes`}>
              <button type="button">Notes</button>
              </Link>
              </td> 
              
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
)
        }

export default EmployeeTable;
