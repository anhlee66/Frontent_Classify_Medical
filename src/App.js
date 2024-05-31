import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from "./components/Home"
import Register from "./components/Register"
import ChangePassword from "./components/ChangePassword"
import Request from "./components/Request"
import Login from "./components/views/Login"
export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Home}/>
                <Route path='/login' Component={Login}/>
                <Route path='/register' Component={Register} />
                <Route path='/user/change_password' Component={ChangePassword} />
                <Route path='model/request' Component={Request} />
            </Routes>
        </BrowserRouter> 
    )
}