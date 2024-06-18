import OfficerHeader from '../components/Header/AdminHeader'
import logo192 from '../assets/logo.gif'
import { useEffect, useState } from 'react'
import OfficerDashboard from "../components/OfficerDashboard"
import Sidebar from '../components/Items/Sidebar'
import ProfileSidebar from "../components/Items/ProfileSidebar"
import '../styles/officer.css'
import { Form } from 'react-router-dom'
function Officer() {
    const [isShow, setIsShow] = useState(false)
    const [questions, setQuestions] = useState([])
    const [selectedImage, setSelectedImage] = useState(null)
    const [tab, setTab] = useState('dashboard')
    const [isShowAnwser, setIsShowAnwser] = useState(false)
    const [content, setContent] = useState(null)
    const onTagChange = e => {
        setTab(e.target.id)
    }
    const onShowProfile = () => {
        setIsShow(!isShow)
    }
    const GetQuestion = async (state = "all") => {
        const url = `/api/question/all/question?state=${state}`
        console.log(state)
        const res = await fetch(url, { method: "GET" })
            .then(res => {
                if (res.status == 200) {
                    return res.json()
                }
                throw new Error
            })
            .then(data => {
                console.log(data)
                setQuestions(data)

            })
            .catch(err => console.log(err))
    }
    const onSendAnwser = async (e) => {
        e.preventDefault()
        const url = "/api/question/anwser"
        const img = document.getElementById("image")
        const image = await fetch(img.src)
            .then(res => res.blob())


        const form = new FormData()
        form.append("image", image, `image.jpg`)
        form.append("content", content)
        form.append("question_id", selectedImage.id)

        await fetch(url, {
            method: "POST",
            body: form
        })
            .then(res => {
                if (res.status == 200) {
                    return res.json()
                }
                throw new Error
            })
            .then(async (data) => {
                onShowMessage(data.msg)
                setIsShowAnwser(false)
                await GetQuestion()

            })
            .catch(err => console.log(err))
        // console.log(form)
    }
    const onShowMessage = (msg) => {
        setTimeout(() => {
            alert(msg)
        }, 100)
    }
    useEffect(() => {
        const startUp = async () => {
            await GetQuestion()
        }
        startUp()
    }, [])
    return (
        <div className='admin-page'>
            <OfficerHeader onShowProfileBar={onShowProfile} />
            {isShow && <ProfileSidebar name="le tuan anh" />}
            <main className='officer-container'>
                <div className='question-table-container'>
                    <div>
                        <select className='question-option' defaultValue="all" onChange={e => GetQuestion(e.target.value)}>
                            <option value="wait">Chờ phản hồi</option>
                            <option value="done">Đã phản hồi</option>
                            <option value="all">Tất cả</option>
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
                        {questions.length > 0 && questions.map((value, index) => (
                            <tbody key={index} >
                                <tr>
                                    <td>{value.id}</td>
                                    <td>{value.name}</td>
                                    <td><img style={{ width: "70px" }} src={`data:image/jpeg;base64,${value['image']}`} /></td>
                                    <td>{value.content}</td>
                                    <td>{value.created}</td>
                                    <td>
                                        <button onClick={(e) => {
                                            setIsShowAnwser(true)
                                            setSelectedImage(value)
                                        }}>Anwser</button>
                                        <button onClick={() => setSelectedImage(value)}>View</button>
                                    </td>
                                </tr>

                            </tbody>
                        ))}
                    </table>
                </div>
                <div>
                    {selectedImage && (
                        <img id='selected-image' src={`data:image/jpeg;base64,${selectedImage["image"]}`} />
                    )}
                    {isShowAnwser && (
                        <div>
                            <div className="question-container anwser">
                                <div className="question-header">
                                    <p>Send question</p>
                                </div>
                                <div className="question-main">

                                    <div>
                                        <img id="image" src={`data:image/jped;base64,${selectedImage.image}`} alt="image" />
                                    </div>
                                    <form>
                                        <label
                                            htmlFor='question-content'
                                            style={{ fontSize: "18px", marginLeft: "20px" }}

                                        >
                                            {selectedImage.name}
                                        </label>
                                        <textarea
                                            name="question-content"
                                            className="form-control"
                                            value={selectedImage.content}
                                            readOnly
                                            style={{ height: "100px" }} />
                                        <textarea
                                            name="content"
                                            className="form-control"
                                            onChange={(e) => setContent(e.target.value)} />

                                        <div className="form-group">
                                            <input type="submit" value="Send" onClick={onSendAnwser} />
                                            <input type="button" value="Cancel" onClick={() => setIsShowAnwser(false)} />
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

        </div>)
}

export default Officer