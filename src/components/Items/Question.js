import { useState } from "react"

const Question = ({ image,onClose }) => {
    const [content,setContent] = useState("")
    const onQuestion = async(e) =>{
        e.preventDefault()
        console.log(content)
        const url = "/api/question/request"
        const form = new FormData()
        form.append("image",image.image)
        form.append("content",content)

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

                    <div className="form-group">
                        <input type="submit" value="Send" onClick={onQuestion}  />
                        <input type="button" value="Cancel" onClick={onClose} />
                    </div>

                </form>
            </div>
        </div>
    )
}
export default Question