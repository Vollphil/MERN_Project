import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";



const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};



const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
 
  const [filterPos, setFilterPos] = useState("")
  const [sortProp, setSortProp] = useState(true)
  const [height, setHeight] = useState(0);
  const [sortLevel,setSortLevel]= useState(false)
  const [searchLevel,setSearchLevel] = useState(0)
  
  

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };


  useEffect(() => {
    const handleLevelSearch = async () => {
      if(searchLevel > 0){
        const response = await fetch(`/api/random/levelSearch?qu=${searchLevel}`)
        console.log(response)
        const data = await response.json()
        setEmployees(data)
      }else{
        setEmployees(employees)
      }
    }
    handleLevelSearch()
  },[searchLevel,employees])


useEffect(() => {
  const filterPosition = async () => {
    if(filterPos.length > 0){
      const response = await fetch(`/api/filterPosition?q=${filterPos}`);
      const data = await response.json()
      setEmployees(data)
    }else{
      fetchEmployees()
        .then((employees) => {
        setLoading(false);
        setEmployees(employees);
      })
      }
  }
  filterPosition(filterPos)
 },[filterPos])

 useEffect(() => {

  const findHeight = async() => {
    if(height > 139){
    const response = await fetch(`/api/height?q=${height}`);
    const data = await response.json()
    setEmployees(data);
  }else {
    setEmployees([])
  }
}
findHeight();
 },[height])


 

   const randomizeHeight = async() => {
    try{
      const response = await fetch("/api/randomizeHeight",{
        method:"PATCH",
      });
      const updateEmployees = await response.json()
      setEmployees(updateEmployees);

    }catch(err) {
      console.error(err)
    }
  }


  useEffect(() => {
   
    const sortlevel = async () => {
      const sortedLevel = sortLevel ?"desc":"asc"
      const response = await fetch(`/api/level?q=${sortedLevel}`)
      const data = await response.json()
     
      setEmployees(data)
      console.log(response)
    }
    sortlevel()
    
  },[sortLevel])

   useEffect(() => {
  
    const sortfetch = async() => {
      const sortOrder = sortProp ? "asc" : "desc";
      const response = await fetch(`/api/sort/?q=${sortOrder}`);
      const data = await response.json()
      console.log(data)
      setEmployees(data)

  }
    sortfetch()
   
   },[sortProp])

   const toggle2 = () => {
    setSortProp(!sortProp)
   }
   const toggle = () =>{
    console.log(sortLevel)
    setSortLevel(!sortLevel)
    
   }
   
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div>
        <button 
        type="button"
        onClick={randomizeHeight}
        >Randomize Height</button>
        <label>Search greater then Height </label>
        <input 
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}>

          </input>
      </div>
      <div>
        <label>Search for Level</label>
        <input type="number" onChange={(e) => setSearchLevel(e.target.value)}></input>
      </div>
    
    
        <label>Search for Position</label>
        <input
          type="text"
          value={filterPos}
          onChange={(e) => setFilterPos(e.target.value)}></input>
          <button onClick={() => toggle2()}>Sort Names</button>

          <button type="button" onClick={()=>toggle()}>Sort Level</button>
  <EmployeeTable employees={employees} onDelete={handleDelete}  setEmployees={setEmployees}/>
  </div>
  )
};

export default EmployeeList;
