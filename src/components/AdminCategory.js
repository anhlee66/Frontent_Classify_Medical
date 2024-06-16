import { useState, useEffect } from "react"
import makeService from '../services/model'
import ModelItem from "./Items/ModelItem"
import logo from "../assets/logo.gif"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ItemCard from "./Items/ItemCard"
import ItemSplilt from "./Items/ItemSpilt"
import { colors } from "@mui/material"
function AdminCategory() {
    const [models, setModels] = useState([])
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
    useEffect(() => {

        fetchAPI()
    }, [])
    models && console.log(models)

    return (
        <div className="">

            <div className="box full category-container-item ">
                <div className="model-container">
                    <div className="model">
                        <div className="model-header">
                            <p >Tên mô hình</p>
                            <button className="button">Edit</button>
                        </div>
                        <div>
                            {models && models.map((value, index) => (
                                <ModelItem model={value} />
                            ))}
                        </div>
                    </div>
                    <div className="model-detail">
                        <p>Thông số chi tiết</p>
                    </div>
                </div>
            </div>
            <div className="box full category-container-item " style={{}}>
                    <div className="dataset-header">
                        <p>Dataset</p>
                        <select className="dataset-picker ">
                            <option>Medical</option>
                            <option>Medical</option>
                            <option>Medical</option>
                            <option>Medical</option>
                            <option>Medical</option>
                        </select>
                        <button className="button">Edit</button>
                    </div>
                    <div className="dataset-contrainer" >
                        <div className="total-image">
                            <div style={{ display: "flex", justifyContent: "space-between", }}>
                                <p>2400 Total Image</p>
                                <p className="view-more">
                                    View more image	&nbsp;
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </p>
                            </div>
                            <div className="image-list">
                                <img  src={logo} />
                                <img src={logo} />
                                <img src={logo} />
                                <img src={logo} />
                                <img src={logo} />
                                <img src={logo} />
                                <img src={logo} />
                                <img src={logo} />
                                <img src={logo} />
                                <img src={logo} />
                                <img src={logo} />

                            </div>
                        </div>
                        <div style={{display:"flex",margin:"20px 0"}}>
                            <p>
                                Dataset Split
                            </p>
                            <div style={{display:"flex"}}>
                                <ItemSplilt title="TRAIN SET" value="240" border="#f59e0b"/>
                                <ItemSplilt title="TRAIN SET" value="240" border="#38bdf8" />
                                <ItemSplilt title="TRAIN SET" value="240" border="#a78bfa"/>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default AdminCategory