import { useState } from "react"

const CreateCompanies = () => {
    const [name,setName] = useState("")

    const createCompanies= (company) => {
        return fetch("/api/companies/",{
            method:"POST",
            headers:{"Content-Type":"application/json",},
            body: JSON.stringify({name: company.name})
        }).then((res) => res.json())
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createCompanies({name})
        console.log(createCompanies({name}))
    }

    return (<div>
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}></input>
            <button type ="submit">Submit</button>
        </form>
    </div>)
}

export default CreateCompanies