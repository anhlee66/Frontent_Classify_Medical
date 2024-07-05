import { useState } from "react"

const Question = ({ image,onClose }) => {
    const [content,setContent] = useState("")
    const [tag,setTag] = useState("Bệnh da liễu")
    const onQuestion = async(e) =>{
        e.preventDefault()
        console.log(content)
        const url = "/api/question/request"
        const form = new FormData()
        form.append("image",image.image)
        form.append("content",content)
        form.append("tag",tag)
        // console.log(form)
        await fetch(url,
            {
                method:"POST",
                body:form
            })
        .then(res => {
            if(res.status == 200){
                return res.json()
            }
        })
        .then(data => {
            showMessage("Đã gửi câu hỏi thành công")
            onClose()
        })
        .catch(err =>console.log(err))
    }
    const showMessage = (msg) =>{
        setTimeout(() =>{
            alert(msg)
        },100)
    }
    return (
        <div className="question-container">
            <div className="question-header">
                <p>Send question</p>
            </div>
            <div className="question-main">
                <div>
                    <img src={image.src} alt="image" />
                </div>

                <form>
                    <textarea name="content" className="form-control" onChange={e =>setContent(e.target.value)}/>
                    <div>
                        <label htmlFor="tag" style={{marginLeft:"20px"}}>Tag: </label>
                        <select name="tag" onChange={e=>setTag(e.target.value)}>
                            <option value="Da liễu">Bệnh da liễu</option>
                            <option value="Xương khớp">Bệnh xương khớp</option>
                            <option value="Não">Bệnh não</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Send" onClick={onQuestion} disabled={content == ""}  />
                        <input type="button" value="Cancel" onClick={onClose} />
                    </div>

                </form>
            </div>
        </div>
    )
}
export default Question