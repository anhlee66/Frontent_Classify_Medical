import { useState, useEffect } from "react"
import makeService from '../services/model'
import ModelItem from "./ModelItem"
function AdminModel() {
    const [models, setModels] = useState([])
    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const res = await makeService.get_all_model()
                // setModels(res)
                //  console.log("res",res)
                setModels(res)
            }
            catch (error) {
                console.log("Error fetching api get all model")
            }
        }
        fetchAPI()
    }, [])
    // console.log(models)

    return (
        <div className="row">
            <div className="col-md-3 bg-primary  ">
                side bar
                {models.map((value) =>(
                    <ModelItem model={value} key='1'  />
                ))}
            </div>
            <div className="col-md-8 bg-secondary">
                container
            </div>
        </div>
    )
}

export default AdminModel