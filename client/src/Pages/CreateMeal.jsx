import { useState } from "react";

const CreateMeal = () => {
    const [starter,setStarter] = useState("");
    const [meal,setMeal] = useState("");
    const [price,setPrice] = useState(0);

    const createMeal = () => {
        return fetch("/api/createMeals",{
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({starter: starter,meal: meal, price: price})
        }).then((res) => res.json())
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        createMeal()
    }
    return (
        <div>
            <form className="EmployeeForm" onSubmit={handleSubmit}>
            <label>Create Starter</label>
            <input 
            type="text"
            value={starter}
            onChange={(e)=> setStarter(e.target.value)}></input>
            <label>Create Meal</label>
            <input 
            type="text"
            value={meal}
            onChange={(e)=> setMeal(e.target.value)}></input>
            <label>Create price for Meal</label>
            <input 
            type="number"
            value={price}
            onChange={(e)=> setPrice(e.target.value)}></input>
            <button type="submit">Create Meal</button>
            </form>
        </div>
    )
}

export default CreateMeal