import { useEffect, useState } from "react"

const fetchEmployees = () => {
    return fetch("/api/employees/").then((res) => res.json())
}
const FavortieBook= () => {
    const [employees,setEmployees]= useState([])
    const [assignBook,setAssignBook] = useState("")

    const handleAssignBook = async (employeeId) => {
        const response = await fetch(`/api/labl/${employeeId}`,{
            method:"PATCH",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({  favoriteBook: assignBook})
        })
        if(response.ok){
            console.log("Book was assigned to Employee")
            console.log(assignBook)
            console.log("dei mama")
          
        }else{
            console.error("Could not assign Book to employee")
        }
    }

    const handleRandomBooks = async () => {
        const response = await fetch("/api/books/random",{
            method:"PATCH",
        })
        const updatedEmployees = await response.json()
        setAssignBook(updatedEmployees)
    }
    
    const handleSearchSame = (employee) => {
       return  fetch(`/api/same?favoriteBook=${employee.favoriteBook}&position=${employee.position}`)
       .then((res) => res.json())
       .then((sameEmployees) =>{
        setEmployees(sameEmployees)
       })
    }


   
    useEffect(() => {
        fetchEmployees()
        .then((employee) => {
            setEmployees(employee)
        })
    },[])

    return (
        <div>
            <label>Assign Book to Employee</label>
            <input
            type="text"
            value={assignBook}
            onChange={(e) => setAssignBook(e.target.value)}></input>
            <div>
                <button type="button" onClick={handleRandomBooks}>Random Books</button>
                
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Favorite Books</th>
                            <th>Position</th>
                            <th>Assign Book</th>    
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee._id}>
                                <td>{employee.name}</td>
                                <td>{employee.favoriteBook}</td>
                                <td>{employee.position}</td>
                                <td><button type="button" onClick={() =>handleAssignBook(employee._id)}>Assign Book</button></td>
                                <td><button type="button" onClick={() => handleSearchSame({position: employee.position,favoriteBook: employee.favoriteBook})}>Similar Pos and Books</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FavortieBook