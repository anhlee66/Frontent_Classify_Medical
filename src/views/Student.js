import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header/Header-student"
import StudentHome from "../components/Profile/StudentHome"
import StudentPredict from "../components/StudentPredict"
import Cookies from "js-cookies"
import "../styles/student.css"
import { UserContext } from '../App'
import { SettingsApplicationsTwoTone } from "@mui/icons-material"
import Notification from "../components/Items/Notification"
const Student = () => {
    const [tab, setTab] = useState("home")
    const user = useContext(UserContext)
    const [anwser, setAnwser] = useState([])
    const [isShowNotification, setIsShowNotification] = useState(false)
    const navigate = useNavigate()
    const onTagChange = (value) => {
        setTab(value)
        console.log(value)
    }
    const onNotifyClick = () => {
        setIsShowNotification(!isShowNotification)
        onGetNotification()

    }
    const onGetNotification = async () => {
        let id = null
        try {
            id = Cookies.getItem("current_user")
            console.log(id)
        }
        catch (e) {
            console.log("cookies error", e)
            navigate("/login")
        }
        const url = `/api/question/user/${id}`

        await fetch(url, { method: "GET" })
            .then(res => {
                if (res.status == 200) {
                    return res.json()
                }
                throw new Error
            })
            .then(data => {
                setAnwser(data)
                console.log(data)
            })
            .catch(err => console.log(err))
    }
    // setInterval(() => {
    //     onGetNotification()
    // }, 60 * 1000);
    // const iconNotify = document.getElementById("icon-notify")
    // document.addEventListener("click",(e)=>{
    //     const event = iconNotify.contains(e.target)
    //     if(!event){
    //         setIsShowNotification(false)
    //     }
    // })
    const notify = [{ "tag": "anwser", "content": "hello fen" }, { "tag": "anwser", "content": "hello my name is dieu nhi" }]
    return (
        <div>
            <Header onNotifyClick={onNotifyClick} />
            <div>
                {/* {tab == "home" && (<StudentHome onClick={onTagChange} />)}
                {tab == "predict" && (<StudentPredict onCLick={onTagChange}/>)} */}
                <StudentPredict />
                {isShowNotification && (<Notification notify={anwser} />)}
            </div>
        </div>
    )
}

export default Student