
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"

const fetchArmors = () => {
    return fetch("/api/armors/").then((res) => res.json())
}

const createArmor= (armor) => {
   return fetch("/api/createArmor/",{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({helm: armor.helm ,body: armor.body, items: armor.items})
    }).then((res) => res.json())
}


const deleteArmor = (id) => {
    return fetch(`/api/armorDelete/${id}`,{method: "DELETE"}).then((res) => res.json())

}
const ArmorUpdate = () => {

    const [armors,setArmors]=useState([])
    const [helm,setHelm] = useState("")
    const [body,setBody] = useState("")
    const [items, setItem] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        createArmor({helm,body,items})
    }

    const handleDelete = (id) => {
        deleteArmor(id)
    }
    useEffect(() => {
        fetchArmors()
        .then((employee) => 
        setArmors(employee))
    },[])
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label>Add Helm</label>
            <input 
            type="text"
            value={helm}
            onChange={(e) => setHelm(e.target.value)}></input>
            <label>Add Armor</label>
            <input 
            type="text"
            value={body}
            onChange={(e)=> setBody(e.target.value)}></input>
            <label>Add Item</label>
            <input 
            type="text"
            value={items}
            onChange={(e)=>setItem(e.target.value)}></input>
            <button 
            type="submit">Submit</button>
            </form>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Helm</th>
                            <th>Armor</th>
                            <th>items</th>
                        </tr>
                    </thead>
                    <tbody>
                        {armors.map((armor) => (
                            <tr key={armor._id}>
                                <td>{armor.helm}</td>
                                <td>{armor.body}</td>
                                <td>{armor.items}</td>
                                <td>
                                    <Link to={`/armorUpdate/${armor._id}`}>
                                    <button type="button">Update</button>
                                    </Link>
                                    </td>
                                    <td><button type="button" onClick={() => handleDelete(armor._id)}>Delete</button></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ArmorUpdate