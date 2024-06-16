import { useState } from "react"

const AddModel = ()=>{
    const [model,setModel] = useState(null)
    return (
        <div>
            <p>Add model</p>
            <form>
                <label>Name</label>
                <input type="text" name="name" />
                <label htmlFor="model"></label>
                <input name="model" type="file" onChange={(e) =>console.log(e.target.files)}/>

            </form>
        </div>
    )
}
export default AddModel