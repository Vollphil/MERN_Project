import { useEffect, useState } from "react"

const fetchSimilar = (similar) => {
    const url = similar 
    ?`/api/similar?level=${similar.level}&position=${similar.position}`
    :"/api/employees";
    return fetch(url)
        .then((res) => { return res.json()
        })
        .then((data)=>{
            console.log("fetch similar", data)
            return data;
        })
        .catch((error) => {
            console.error("Error fetching similar employees", error )
        })
}
const SearchEmployeeName = () => {
    const [nameSearch, setNameSearch] = useState("")
    const [employee, setEmployee] = useState([])

    useEffect(() => {
        const searchEmployees = async () => {
            if(nameSearch.length > 0){
                const response = await fetch(`/api/searchEmployee?q=${nameSearch}`);
                const data = await response.json()  
                setEmployee(data);          
            }else{
                setEmployee([])
            }

            
        }
        searchEmployees();
    },[nameSearch])

    const handleSimiliar = (similar) =>{
        fetchSimilar(similar)
        .then((simEmp) => {
            setEmployee(simEmp)
        });
    }   

    return (
        <div>
            <label>Search for Employees by Name</label>
            <input 
            value={nameSearch}
            type="text"
            onChange={(e) => setNameSearch(e.target.value)}></input>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Level</th>
                            <th>Position</th>
                            <th>Similar Pos and Lvl</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.map((employ) => (
                            <tr key={employ._id}>
                                <td>{employ.name}</td>
                                <td>{employ.level}</td>
                                <td>{employ.position}</td>
                                <td><button 
                                type="button"
                                onClick={()=> handleSimiliar({level: employ.level, position: employ.position})}>Similar</button></td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SearchEmployeeName