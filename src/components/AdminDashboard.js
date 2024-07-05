import ItemCard from "./Items/ItemCard"
import logo from "../assets/logo.gif"
import { useState, useEffect, useSyncExternalStore } from "react"
import {
    faUser,
    faDatabase,
    faVirus,
    faMicrochip,
    faArrowRight,
    faThumbsUp,
    faThumbsDown,
    faRotate
}
    from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ActiveModel from "./ActiveModel"
import { useAsyncError, useNavigate } from "react-router-dom"
import NavigateTask from "./Items/NavigateTask"
const AdminDashboard = () => {
    const [basicRes, setBasicRes] = useState(null)
    const [recentLogged, setRecentLogged] = useState([])
    const [active, setActive] = useState({})
    const [allModel, setAllModel] = useState([])
    const [newUsers, setNewUsers] = useState([])
    const [questions, setQuestions] = useState([])
    const [departments, setDepartments] = useState([])
    const [selectedQuestion,setSelectedQuestion] = useState(null)
    const [state,setState] = useState(null)
    const navigate = useNavigate()
    const getBasicRes = async () => {
        const url = "/api/statistic/base"
        const res = await fetch(url, { method: "GET", }).then(res => res.json()).catch(err => null)
        // console.lo   g(res)
        if (!!res) {
            setBasicRes(res)
        }

    }
    const getRecentLoggedIn = async () => {
        const url = "/api/statistic/recent_logged"
        const res = await fetch(url, { method: "GET" }).then(res => res.json())
        if (res.length > 0) {
            setRecentLogged(res)
            // console.log(res)
        }
    }
    const getActiveModel = async () => {
        const url = "/api/model/active"
        await fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(data => setActive(data))
            .catch(err => console.log("err", err))
        console.log('refresh')

    }
    const getAllModel = async () => {
        const url = "/api/model/all"
        return await fetch(url, { method: "GET" })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }

                throw new Error("unauthorized!")

            })
            .then(data => setAllModel(data))
            .catch(err => {
                console.log("err", err)
                navigate("/login")
            })

    }
    const showModelPicker = () => {
        if (!!allModel) {
            const e = document.querySelector(".model-picker")
            e.classList.add("visible")
        }

    }
    const getNewUser = async () => {
        const url = "/api/user/recent"
        await fetch(url, { method: "GET" })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error("get new user error")
            })
            .then(data => setNewUsers(data))
            .catch(err => console.log("err", err))
    }

    const getQuestions = async (state) => {
        // console.log(state)
        setState(state)
        const url = `/api/question?state=${state}`
        console.log(url)
        await fetch(url, { method: "GET" })
            .then(res => {
                if (res.status == 200) {
                    return res.json()
                }
                throw new Error
            })
            .then(data => {
                // console.log(data)
                setQuestions(data)

            })
            .catch(err => console.log(err))
    }
    const getAllDepartment = async () => {
        const url = "/api/department/all"
        await fetch(url, { method: "GET" })
            .then(res => {
                if (res.status == 200) {
                    return res.json()
                }
                throw new Error
            })
            .then(data => {
                console.log("department", data)
                setDepartments(data)
            })
            .catch(err => console.log(err))
    }
    const onNavigate = async (e,id) => {
        console.log(e.pageX, e.pageY)
        let popup = document.querySelector("#popup-container")
        popup.style.left = `${e.pageX}px`
        popup.style.top = `${e.pageY}px`
        setSelectedQuestion(id)
        popup.show()
        
    }
    const onSelected = async (e,name) =>{
        console.log(e.target.className)
        const department_id = e.target.className
        const url = `/api/question/${selectedQuestion}/department/${department_id}`
        console.log(url)
        await fetch(url,{method:"POST"})
            .then(res =>{
                if(res.status == 200){
                    getQuestions(state)
                    let popup = document.querySelector("#popup-container")
                    popup.close()
                    showMessage(`Đã chuyển hướng câu hỏi đến ${name}`)
                    return
                }
                throw new Error

            })
            .catch(err => console.log(err))



    }
    const showMessage = (msg) =>{
        setTimeout(() =>{
            alert(msg)
        },100)
    }
    // window.addEventListener('click',(e) =>{
    //     const popup = document.getElementById("popup-container")
    //     popup.close()
    // })
    useEffect(() => {
        const fetchAPI = async () => {
            await getBasicRes()
            await getRecentLoggedIn()
            await getActiveModel()
            await getAllModel()
            await getNewUser()
            await getQuestions()
            await getAllDepartment()
        }
        fetchAPI()
    }, [])
    // allModel && console.log("all", allModel)
    // console.log(active)

    // console.log(allModel)
    return (
        <div className="">
            {departments && <NavigateTask departments={departments} onSelected={onSelected}/>}
            <h1 onClick={getBasicRes}>Dashboard</h1>
            {basicRes && (
                <div className="basic-satictis" >
                    <ItemCard title="Users" value={basicRes.user} icon={faUser} />
                    <ItemCard title="Models" value={basicRes.model} icon={faMicrochip} />
                    <ItemCard title="Datasets" value={basicRes.dataset} icon={faDatabase} />
                    <ItemCard title="Diseases" value={basicRes.disease} icon={faVirus} />

                </div>
            )}
            <div className="dashboard-item">
                <div className="left box a3quater scroll">

                    <div className="questions-header">
                        <p>Yêu cầu phân loại</p>
                        <select className='question-option' defaultValue="all" onChange={e => getQuestions(e.target.value)} >
                            <option value="wait">Chưa xử lí</option>
                            <option value="done">Đã xử lí</option>
                            <option value="all">Tất cả</option>
                        </select>
                        <div>
                            <button className="button" onClick={getQuestions}>Reload</button>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Content</th>
                                <th>Tag</th>
                                <th></th>
                            </tr>
                        </thead>
                        {questions && questions.map((value, index) => (
                            <tbody key={index} >
                                <tr >
                                    {/* {console.log(value)} */}
                                    <td>{value.name}</td>
                                    <td><img style={{ width: "60px", borderRadius: "10px" }} src={`data:image/jpeg;base64,${value['image']}`} /></td>
                                    <td>{value.content}</td>
                                    <td>{value.tag}</td>
                                    <td >
                                        <div className="request-action" onClick={e =>onNavigate(e,value.id)} >
                                            <FontAwesomeIcon icon={faArrowRight} size="xl" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
                {active && (
                    <div className="box right aquater">
                        <p className="model-change" onClick={showModelPicker}>Change model</p>
                        <div className="score" style={{ color: "#1ca86e" }}>{Math.round(active.accuracy * 100)} %</div>
                        <div className="info">
                            <div className="name">Name: {active.path}</div>
                            <div className="class">Number class: {active.class}</div>
                        </div>
                    </div>)}

                {/* <div className="box right aquater ">
                    <p>Response</p>
                    <div className="response-container">
                        <div className="response-left">
                            <FontAwesomeIcon icon={faThumbsUp} />
                            <span>50</span>
                        </div>
                        <div className="response-right">
                            <FontAwesomeIcon icon={faThumbsDown} />
                            <span>50</span>
                        </div>

                    </div>
                </div> */}
            </div>
            <div className="dashboard-item">
                <div className="left box half">
                    <div style={{ display: "flex", justifyContent: "space-between", marginRight: "50px", fontSize: "1.4em" }}>
                        <p>New user register</p>
                        <FontAwesomeIcon onClick={getNewUser} icon={faRotate} className="btn-refresh" />
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                            </tr>
                        </thead>
                        {newUsers && newUsers.map((value, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>{value.name}</td>
                                    <td>{value.email}</td>
                                    <td>{value.gender ? "Male" : "Female"}</td>

                                </tr>
                            </tbody>
                        ))}

                    </table>
                </div>
                <div className="right box half">
                    <div style={{ display: "flex", justifyContent: "space-between", marginRight: "50px", fontSize: "1.4em" }}>
                        <p>Recent logged in</p>
                        <FontAwesomeIcon onClick={getRecentLoggedIn} icon={faRotate} className="btn-refresh" />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date</th>
                                <th style={{ textAlign: "center" }}>Status</th>
                            </tr>
                        </thead>
                        {recentLogged && recentLogged.map((value, index) => (
                            <tbody key={index} >
                                <tr >
                                    <td>{value.user}</td>
                                    <td>{value.date}</td>
                                    <td >
                                        <div className={value.status + " status"}>
                                            {value.status}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            // {value}
                        ))}
                    </table>


                </div>
            </div>
            {!!allModel && <ActiveModel model={allModel}
                refresh={() => {
                    getActiveModel()
                    getAllModel()
                }} />}
        </div>
    )
}

export default AdminDashboard