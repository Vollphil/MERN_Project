import { useState } from "react"
import { useParams } from "react-router-dom"



const UpdateArmor = () => {
    const {id} = useParams()
    const [helm,setHelm] = useState("")
    const [body,setBody] = useState("")
    const [items,setItem] = useState("")

const handleSubmit= () => {
   
    const updateArmor =  async() => {
       const response = await fetch(`/api/armor/${id}`,{
            method:"PATCH",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({helm:helm,body:body,items:items})
        })
        if(response.ok){
            console.log("Armor was Updated")
        }else{
            console.error("Armor couldnt bet updated")
        }
    }
    updateArmor()

}
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label>Update Helm</label>
            <input 
            type="text"
            value={helm}
            onChange={(e) => setHelm(e.target.value)}></input>
            <label>Update Body</label>
            <input 
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}></input>
            <label>Update Item</label>
            <input 
            type="text"
            value={items}
            onChange={(e) => setItem(e.target.value)}></input>
            <button type="submit">Submit</button>
            </form>
            
        </div>
    )
}

export default UpdateArmor