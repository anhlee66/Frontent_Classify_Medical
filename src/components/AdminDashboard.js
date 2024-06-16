import ItemCard from "./Items/ItemCard"
import logo from "../assets/logo.gif"
import { useState, useEffect } from "react"
import {
    faUser,
    faDatabase,
    faVirus,
    faMicrochip,
    faElevator,
    faArrowRight,
    faThumbsUp,
    faThumbsDown,
    faRotate
}
    from "@fortawesome/free-solid-svg-icons"
import { blue } from "@mui/material/colors"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ActiveModel from "./ActiveModel"
import { useNavigate } from "react-router-dom"
const AdminDashboard = () => {
    const [basicRes, setBasicRes] = useState(null)
    const [recentLogged, setRecentLogged] = useState([])
    const [active, setActive] = useState({})
    const [allModel, setAllModel] = useState([])
    const [newUsers, setNewUsers] = useState([])
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
        const url = "/api/model/get_active_model"
        await fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(data => setActive(data))
            .catch(err => console.log("err", err))
        console.log('refresh')

    }
    const getAllModel = async () => {
        const url = "/api/model/get_all_model"
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
        const url = "/api/user/get_new"
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
    useEffect(() => {
        getBasicRes()
        getRecentLoggedIn()
        getActiveModel()
        getAllModel()
        getNewUser()
    }, [])
    // allModel && console.log("all", allModel)
    // console.log(active)
    const request = [{
        "name": "Le Tuan Anh",
        "image": logo,
        "content": "day la hinh anh gi da hehe",
        "date": "20/3/2023"
    },
    {
        "name": "Le Tuan Anh",
        "image": logo,
        "content": "day la hinh anh gi da hehe",
        "date": "20/3/2023"
    },
    {
        "name": "Le Tuan Anh",
        "image": logo,
        "content": "day la hinh anh gi da hehe",
        "date": "20/3/2023"
    },
    {
        "name": "Le Tuan Anh",
        "image": logo,
        "content": "day la hinh anh gi da hehe",
        "date": "20/3/2023"
    },
    {
        "name": "Le Tuan Anh",
        "image": logo,
        "content": "day la hinh anh gi da hehe",
        "date": "20/3/2023"
    },
    {
        "name": "Le Tuan Anh",
        "image": logo,
        "content": "day la hinh anh gi da hehe",
        "date": "20/3/2023"
    }]
    // console.log(allModel)
    return (
        <div className="">
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
                    <p>Yêu cầu phân loại</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Content</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {request && request.map((value, index) => (
                            <tbody key={index} >
                                <tr >
                                    <td>{value.name}</td>
                                    <td><img src={value.image} style={{ width: 30 }} /></td>
                                    <td>{value.date}</td>
                                    <td>{value.content}</td>
                                    <td >
                                        <div className="request-action">
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
                        <div className="score" style={{ color: "#1ca86e" }}>{active.accuracy * 100} %</div>
                        <div className="info">
                            <div className="name">Name: {active.path}</div>
                            <div className="class">Number class: {active.class}</div>
                        </div>
                    </div>)}

                <div className="box right aquater ">
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
                </div>
            </div>
            <div className="dashboard-item">
                <div className="left box half">
                    <div  style={{ display: "flex", justifyContent: "space-between", marginRight: "50px", fontSize: "1.4em" }}>
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
                            <tbody>
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