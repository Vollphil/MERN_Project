import { useState } from "react"
import { useParams } from "react-router-dom"

const CreateNotes = () => {
const {employeeId} = useParams()
const [notes,setNote] = useState("")


const createNote = async() => {
    const response = await fetch(`/api/employee/${employeeId}/notes`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({notes:notes})
    })
    if(response.ok){
        console.log("Notes added to Employee")
    }else{
        console.error(" Couldnt add Note to Employee ")
    }
}

const test = () => {
    console.log("a  ")
    console.log(employeeId)
}
const handleSubmit=(e) => {
    e.preventDefault()
    createNote()
}
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label>Create Note</label>
            <input 
            type="text"
            value={notes}
            onChange={(e)=>setNote(e.target.value)}
            ></input>
            <button type="submit">Submit</button>
            
            </form>
            <button type="button" onClick={test}>test</button>
        </div>
    )
}

export default CreateNotes