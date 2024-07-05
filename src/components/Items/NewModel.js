import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import model from "../../services/model"

const NewModel = ({ onBack, onComplete }) => {
    const [model, setModel] = useState(null)
    const [name, setName] = useState(null)

    const [showAdd, setShowAdd] = useState(false)
    const [showValidate, setShowValidate] = useState(false)
    const [msg, setMsg] = useState(null)
    const onModelChanged = (e) => {
        setModel(e.target.files[0])
        setName(e.target.files[0].name)
        setShowAdd(true)
    }
    const onAdd = async (e) => {
        e.preventDefault()
        const data = new FormData()
        console.log("info", name)
        data.append("model", model)
        data.append("name", name)

        const url = "api/model/save"
        await fetch(url, {
            method: "POST",
            body: data
        })
            .then(res => {
                if (res.status == 200) {
                    console.log("oke")
                    return res.json()
                }
                throw new Error

            })
            .then(data => {
                setMsg("Thêm mô hình thành công")
                onShowMessage()
                onComplete()
                onBack()


            })
            .catch(err => {
                console.log(err)
                setMsg("error")
            })
    }
    const onShowMessage = () => {
        setTimeout(() => {
            alert("Thêm mô hình thành công")
        }, 200)
    }

    const onValidate = () => {

    }
    const onRefresh = (e) => {
        e.preventDefault()
        document.querySelector("#model").value = null
        setModel(null)
        setName("")
    }
    return (
        <div className="second-layer new-model">
            <div className="second-layer-header">
                    <button className="button" onClick={onBack}>
                        <FontAwesomeIcon icon={faArrowLeft} size="l" />
                        &nbsp;Back</button>
                {/* <p>Thêm model</p> */}
            </div>
            <div className="second-layer-container">

                <form>
                    <p>Thêm mô hình mới</p>
                    <div className="group">
                        <label>Tên model</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder={model ? model.name : "Enter model name"}
                            onChange={e => setName(e.target.value)}
                             />
                    </div >
                    <div className="group">
                        <label>Chọn file</label>
                        <input id="model" className="form-control" type="file" accept=".pt" onChange={onModelChanged} />
                    </div>
                    <div id="more-tool">

                    </div>

                    <div className="btn-group">
                        <button id="btn-new-model" className="button" onClick={onAdd} disabled={!showAdd} >Upload</button>

                        <button className="button " onClick={onValidate} disabled={!showValidate}>Validate</button>
                        <button className="button" onClick={onRefresh}>Refresh</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewModel