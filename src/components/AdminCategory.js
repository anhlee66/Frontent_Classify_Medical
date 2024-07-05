import React, { useState, useEffect } from "react"
import makeService from '../services/model'
import logo from "../assets/logo.gif"
import { faArrowRight, faArrowLeft, faElevator } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ItemCard from "./Items/ItemCard"
import ItemSplilt from "./Items/ItemSpilt"
import NewModel from "./Items/NewModel"
import TrainModel from "./Items/TrainModel"
import ModelDetail from "./Items/ModelDetail"
import { useAsyncError } from "react-router-dom"
function AdminCategory() {
    const [models, setModels] = useState([])
    const [datasets, setDatasets] = useState([])
    const [isShowNewModel, setIsShowNewModel] = useState(false)
    const [selected, setSelected] = useState(null)
    const [showRemove, setShowRemove] = useState(false)
    const [detail, setDetail] = useState(null)
    const [valProcess, setValProcess] = useState([])
    const [datasetSelected, setDatasetSelected] = useState(null)
    const [isShowTrainModel,setIsShowTrainModel] = useState(false)
    const getAllModel = async () => {
        try {
            const res = await makeService.get_all_model()
            // setModels(res)
            //  console.log("res",res)
            setModels(res)
        }
        catch (error) {
            console.log("Error fetching api get all model")
        }
        console.log(models)

    }
    const getAllDataset = async () => {
        const url = "/api/dataset/all"
        await fetch(url, { method: "GET" })
            .then(res => {
                if (res.status == 200) {
                    return res.json()
                }
                throw new Error
            })
            .then(data => setDatasets(data))
            .catch(err => console.log(err))
    }
    const onShowNewModel = () => {
        setIsShowNewModel(true)

    }
    const onShowTrainModel = () =>{
        setIsShowTrainModel(true)
    }
    const onBack = () => {
        setIsShowNewModel(false)
        setIsShowTrainModel(false)
    }

    const onSelectedModel = (e) => {
        const id = e.target.id
        setSelected(id)
        setShowRemove(true)
        onGetDetail(id)
        console.log(id)
    }
    const onRemove = async () => {
        const url = `/api/model/${selected}/remove`
        const msg = "Bạn muốn xóa mô hình này?"
        if (window.confirm(msg) == false) {
            return
        }
        await fetch(url, { method: "GET" })
            .then(res => {
                if (res.status == 200) {
                    return res.json()
                }
                throw new Error
            })
            .then(data => {
                getAllModel()
                setShowRemove(false)
            })
            .catch(error => console.log(error))
    }
    const onGetDetail = async (id) => {
        const url = `/api/model/${id}`
        await fetch(url, { method: "GET" })
            .then(res => {
                if (res.status == 200) {
                    return res.json()
                }
                throw new Error
            })
            .then(data => {
                setDetail(data)
                // console.log(data)

            })
            .catch(err => console.log(err))
    }
    const onValidate = async () => {
        const url = `/api/model/val/${selected}`
        setValProcess([...valProcess, selected])
        await fetch(url, { method: "GET" })
            .then(async (res) => {
                if (res.status == 200) {
                    valProcess.pop(selected)
                    setValProcess(valProcess)
                    // console.log(valProcess)
                    await onGetDetail(selected)
                }
                throw new Error
            })
            .catch(error => console.log(error))
    }
    const onGetDatasetDetail = async (id) => {
        const url = `/api/dataset/${id}`
        await fetch(url, { method: "GET" })
            .then(res => {
                if (res.status == 200) {
                    return res.json()
                }
                throw new Error
            })
            .then(data => {
                setDatasetSelected(data)
            })
            .catch(error => console.log(error))
    }
    
    useEffect(() => {

        const fetchAPI = async () => {
            getAllModel()
            getAllDataset()
        }
        fetchAPI()
    }, [])
    // models && console.log(models)

    return (
        <div className="admin-category">
            {isShowNewModel && (<NewModel onBack={onBack} onComplete={getAllModel} />)}
            {isShowTrainModel && (<TrainModel onBack={onBack} id={selected} />)}
            <div className="box full category-container-item ">
                <div className="model-container">
                    <div className="model">
                        <div className="model-header">
                            <p >Tên mô hình</p>
                            <div>
                                <button className="button btn-new" onClick={onShowNewModel}>New</button>
                                <button className="button btn-remove" disabled={!showRemove} onClick={onRemove}>Remove</button>
                                <button className="button" disabled={!showRemove} onClick={onShowTrainModel}>Train</button>
                            </div>
                        </div>
                        <div>
                            {models && models.map((value, index) => (
                                <div id={value.id} key={index} className={selected == value.id ? " model-item active" : "model-item"} onClick={onSelectedModel}>
                                    {value.path}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="model-detail">
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <p style={{ margin: "0 10px" }}>Thông số chi tiết</p>
                            <button
                                className="button"
                                disabled={detail == null}
                                style={{ justifySelf: "right" }}
                                onClick={onValidate}
                            >Validate</button>
                        </div>
                        {detail &&
                            <div>
                                {Object.keys(detail).map((key) => (
                                    <div key={key}>
                                        <p><span style={{ textTransform: "capitalize" }}>{key}</span>: {detail[key]} {key == 'top1' || key == 'fitness' ? " %" : ""}</p>
                                    </div>
                                ))}
                            </div>}
                    </div>
                </div>
            </div>
            <div className="box full category-container-item " style={{}}>
                <div className="dataset-header">
                    <p>Dataset</p>
                    <select className="dataset-picker " onChange={e => onGetDatasetDetail(e.target.value)}>
                        {datasets && datasets.map((value, index) => (
                            <option key={index} value={value.id} >{value.path}</option>
                        ))}
                    </select>
                    <button className="button">Edit</button>
                </div>
                {datasetSelected && (
                    <div className="dataset-contrainer" >
                        <div className="total-image">
                            <div style={{ display: "flex", justifyContent: "space-between", }}>
                                <p>{datasetSelected.total} Total Image</p>
                                <p className="view-more">
                                    View more image	&nbsp;
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </p>
                            </div>
                            <div className="image-list">


                            </div>
                        </div>
                        <div style={{ display: "flex", margin: "20px 0" }}>
                            <p>
                                Dataset Split
                            </p>
                            <div style={{ display: "flex" }}>
                                <ItemSplilt title="TRAIN SET" value={datasetSelected.train}
                                    percent={Math.round(datasetSelected.train * 100 / datasetSelected.total)}
                                    border="#f59e0b" />
                                <ItemSplilt title="TEST SET" value={datasetSelected.test}
                                    percent={Math.round(datasetSelected.test * 100 / datasetSelected.total)}
                                    border="#38bdf8" />
                                <ItemSplilt title="VAL SET" value={datasetSelected.val}
                                    percent={Math.round(datasetSelected.val * 100 / datasetSelected.total)}
                                    border="#a78bfa" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminCategory