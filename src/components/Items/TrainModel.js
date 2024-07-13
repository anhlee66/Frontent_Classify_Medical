import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useScrollTrigger } from "@mui/material"
import { formToJSON } from "axios"
import { ShieldTwoTone } from "@mui/icons-material"
const TrainModel = ({ onBack, id }) => {
    const [model, setModel] = useState(null)
    const [datasets, setDatasets] = useState([])
    const [selectedDataset, setSelectedDataset] = useState(1)
    const [epoch, setEpoch] = useState(5)
    const [batch, setBatch] = useState(8)
    const [isCopy, setIsCopy] = useState(false)
    const [newName, setNewName] = useState(null)
    const [worker,setWorker] = useState(4)
    const onGetDetail = async () => {
        const url = `/api/model/${id}`
        await fetch(url, { method: "GET" })
            .then(res => {
                if (res.status == 200) {
                    return res.json()
                }
                throw new Error
            })
            .then(data => {
                setModel(data)
                console.log(data)

            })
            .catch(err => console.log(err))
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
            .then(data => {
                setDatasets(data)
                console.log(data)
            })
            .catch(err => console.log(err))
    }
    const showMessage = (msg) => {
        setTimeout(() => {
            alert(msg)
        }, 100)
    }
    const onTrain = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("path", model.path)
        data.append("dataset", selectedDataset)
        data.append("epoch", epoch)
        data.append("batch", batch)
        data.append("saveas", isCopy)
        data.append("worker",worker)
        if (isCopy) {
            data.append("new-name", newName)

        }
        console.log(formToJSON(data))
        const url = "/api/model/train"
        showMessage("Quá trình huấn luyện đang được xử lý")
        setTimeout(onBack,1000)
        await fetch(url,{
            method:"POST",
            body:data
        })
            .then(res =>{
                if( res.status == 200)
                    {
                        return res.json()
                    }
                throw new Error
            })
            .then(data => console.log(data))
            .catch(err => console.log(err))

    }
    useEffect(() => {
        const fetchAPI = async () => {
            await onGetDetail()
            await getAllDataset()
        }
        fetchAPI()
    }, [])
    return (
        <div className="second-layer">
            <div className="second-layer-header">
                <button className="button" onClick={onBack}>
                    <FontAwesomeIcon icon={faArrowLeft} size="l" />
                    &nbsp;Back</button>
                {/* <p>Thêm model</p> */}
            </div>
            <div className="second-layer-container">

                <form method="POSt" >
                    <p>Huấn luyện mô hình</p>
                    <div className="group">
                        <label>Tên model</label>
                        {model && <input className="form-control" name="name" type="text" value={model.path} readOnly={true} />}
                    </div >
                    <div className="group">
                        <label>Chọn dataset</label>
                        <select className="form-control"
                            name="dataset"
                            onChange={e => setSelectedDataset(e.target.value)}
                            value={selectedDataset} >
                            {datasets && datasets.map((value, index) => (
                                <option key={index} value={value.id}>{value.path}</option>
                            ))}
                        </select>
                    </div>
                    <div >
                        <label htmlFor="epoch ">Epoch</label>
                        <input name="epoch" type="number"
                            className="form-control"
                            required={true}
                            onChange={e => setEpoch(e.target.value)}
                            value={epoch} />
                    </div>
                    <div>
                        <label htmlFor="batch ">Batch size</label>
                        <select className="form-control"
                            name="batch"
                            onChange={e => setBatch(e.target.value)}
                            value={batch}>
                            <option value={4}>4</option>
                            <option value={8}>8</option>
                            <option value={16}>16</option>
                            <option value={32}>32</option>
                            <option value={64}>64</option>
                            <option value={72}>72</option>

                        </select>
                    </div>
                    <div>
                        <label htmlFor="batch ">Worker</label>
                        <select className="form-control"
                            name="worker"
                            value={worker}
                            onChange={e => setWorker(e.target.value)}
                            >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>




                        </select>
                    </div>
                    <div className="group">
                        <div>
                            <input name="saveas"
                                type="checkbox"
                                onChange={e => setIsCopy(e.target.checked)} />
                            <label>Save as copy</label>
                        </div>

                    </div>
                    {isCopy && (
                        <div className="group">
                            <label>Tên model mới</label>
                            <input className="form-control"
                                type="text" name='new-name'
                                required={true}
                                onChange={e => setNewName(e.target.value)} />
                        </div >
                    )}

                    <div className="btn-group">
                        <button id="btn-new-model" className="button" onClick={onTrain} >Train</button>

                        <button className="button " >Validate</button>
                        <button className="button">Refresh</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TrainModel