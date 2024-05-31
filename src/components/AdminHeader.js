import logo from "../assets/logo.gif"
import Search from "./Search"
import makeService from '../services/user'
import { useNavigate } from "react-router-dom"
function AdminHeader({username, avatar,onClick}) {
    const navigator = useNavigate()
    async function onLogout(){
        const res = await makeService.logout()
        // console.log(res)
        
        if(res.success){
            navigator('/login')
        }
    }
    return (<>
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand">
                    <img src={logo} alt="logo" width={50}/>
                </div>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active" onClick={onClick}>
                            <a  id="home"  className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item" onClick={onClick} >
                            <a id="model" className="nav-link" href="#">Model</a>
                        </li>
                        <li className="nav-item" onClick={onClick} >
                            <a id="student" className="nav-link" href="#">Student</a>
                        </li>
                        
                    </ul>
                    <Search />

                    <div>
                        <button className="ml-3 btn btn-primary" onClick={onLogout}>Logout</button>
                    </div>
                </div>
               
                <div className="">
                    <div>
                        <img src={avatar} alt="avatar" width={40}/>
                    </div>
                    <div>
                        <p>{username}</p>
                    </div>
                    <div>
                        <button>setting</button>
                    </div>
                </div>
            </nav>
        </div>
    </>)
}

export default AdminHeader