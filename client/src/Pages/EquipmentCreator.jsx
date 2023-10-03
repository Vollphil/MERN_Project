
import {useState } from "react";

const EquipmentCreator= () => {
    const [name, setName] = useState("")
    const [Type,setType] = useState("")
    const [amount,setAmount] = useState("")
    


const createEquipment =  (equipment) => {

  return  fetch("/api/equipment/", {
    method: "POST",
    headers:{
        "Content-Type":"application/json",
    },
    body: JSON.stringify({
                            name: equipment.name,
                            Type: equipment.Type,
                            amount: equipment.amount})

  }).then((res) => res.json());
 };
 const handleSubmit = (e) => {
    e.preventDefault();
    createEquipment({name,Type,amount})
    
 }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}></input>
                <label>Type</label>
                <input
                  value={Type}                
                  type="text"
                  onChange={(e) => setType(e.target.value)}></input>
                <label>amount</label>
                <input
                  value={amount}
                  type="text"
                  onChange={(e) => setAmount(e.target.value)} ></input>

                <button 
                  type="submit">Submit</button>
                 
            </form>
        </div>
    )
}

export default EquipmentCreator