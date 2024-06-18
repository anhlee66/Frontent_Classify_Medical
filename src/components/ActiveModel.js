import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useScrollTrigger } from "@mui/material"
import { height } from "@mui/system"
import { waitFor } from "@testing-library/react"
import { useState } from "react"
const ActiveModel = ({ model=null,refresh }) => {
    const [active, setActive] = useState(-1)
    const onClose = () => {
        const e = document.querySelector(".model-picker")
        e.classList.remove("visible")
        setActive(-1)

    }
    const onSetActive = (e, key) => {
        // console.log("key",key)
        setActive(key)
        // console.log(active)
    }
    const onChangeActive =  async() => {
        const url = "/api/model/active/change"
        const id= model[active].id
        // console.log(id)
        const formData = new FormData()
        formData.append("id",id)

        const res = await fetch(url,
            {
                method:"POST",
                body:formData
            }
        )
        .then(res => res)
        .catch(err => console.log(err))
        if(res.status == 200){
            onClose()
            alert("Change active model successful!")
        }
        else{
            onClose()
            alert("Error roi ma oi")
        }
        refresh()
        console.log(res)
    }
   
    return (
        <div className="model-picker">
            <p >Choose active model</p>
            <div className="model-picker-container">
                {model&& model.map((value, index) => (
                    <div key={index} onClick={e => onSetActive(e, index)} className={active == index ? "active" : ""}  >
                        <div style={{width:"90%"}}>
                            <p>{value.path}</p>
                            <p>{value.accuracy * 100}%</p>
                        </div>
                        {value.isActive &&
                            <FontAwesomeIcon icon={faCheck} />
                        }
                    </div>
                ))}
            </div>
            <div className="btn-group">
                <button className="button save" onClick={onChangeActive} disabled={active==-1?true:false}>Save</button>
                <button className="button cancel" onClick={onClose}>Cancel</button>
            </div>
        </div>
    )
}

export default ActiveModel