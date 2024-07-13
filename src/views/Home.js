import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookies'
import { useEffect } from "react"
function Home() {
    const navigator = useNavigate()

    function redirect() {
        const permission = Cookies.getItem("permission")
        if (permission === 'student'){
            navigator('/student')
        }
        else if (permission === 'admin') {
            navigator('/admin')
        }
        else {
            navigator('/login')
        }
        
        console.log("cookie", permission)
    }

    // redirect()

    useEffect(() =>{
        redirect()
    })
    // return (<><button className="btn btn-primary" onClick={navigator('/login')}>Navi</button></>)
}

export default Home