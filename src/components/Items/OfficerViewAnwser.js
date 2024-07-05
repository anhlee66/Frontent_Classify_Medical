import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
const OfficerViewAnswer = ({ onBack, questionId }) => {
    const [anwsers,setAnwsers] = useState([])
    const onGetAnwser = async (onwer) =>{
        let url = `/api/question/anwser/${questionId}`
        if (onwer == "all"){
            url = url + "/all"
        }
        await fetch(url,{method:"GET"})
            .then(res => {
                if( res.status == 200){

                    return res.json()
                }
                throw new Error
            })
            .then(data => {
                console.log(data)
                setAnwsers(data)
            })
            .catch(err => console.log(err))
        console.log(url)
    }
    const onDelete = async (id) =>{
        const url = `/api/question/`
    }
    useEffect(() =>{
        const fetchAPI = async () =>{
            onGetAnwser("all")
        }
        fetchAPI()
    },[])
    return (
        <div className="second-layer" style={{ width: "100%", marginTop: "60px" }}>
            <div className="second-layer-header header-d-flex" >
                <button className="button" onClick={onBack}>
                    <FontAwesomeIcon icon={faArrowLeft} size="l" />
                    &nbsp;Back</button>
                <p>Danh sách câu trả lời</p>
            </div>
            <div className="second-layer-container">
                <div className='question-table-container'>
                    <div>
                        <select id="question-type" className='question-option' 
                        defaultValue="all"
                        onChange={e => onGetAnwser(e.target.value)}
                        >
                            <option value="all">Tất cả</option>
                            <option value="self">Của tôi</option>
                        </select>
                    </div>
                    <table className='question-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Image</th>
                                <th>Content</th>
                                <th>Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                            {anwsers.length > 0 && anwsers.map((value, index) => (
                                <tbody key={index} >
                                    <tr>
                                        <td>{value.id}</td>
                                        <td>{value.name}</td>
                                        <td><img style={{ width: "70px" }} src={`data:image/jpeg;base64,${value['image']}`} /></td>
                                        <td>{value.content}</td>
                                        <td>{value.created}</td>
                                        <td>
                                            <button onClick={(e) => {
                                               
                                            }}>Chỉnh sửa</button>
                                            <button >Xóa</button>
                                        </td>
                                    </tr>

                                </tbody>
                            ))}
                    </table>
                </div>
            </div>
        </div>
    )
}
export default OfficerViewAnswer