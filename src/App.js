import React, { useEffect, useState,useContext, createContext } from 'react';
// import './styles/App.css';
import {BrowserRouter,Route, Routes, useAsyncError} from 'react-router-dom'
import Login from './views/Login';
import Admin from './views/Admin';
import Student from './views/Student';
import Officer from './views/Officer';
import Register from './views/Register';
import Home from './views/Home'
import Profile from './components/Profile';
import { jwtDecode } from 'jwt-decode';

export const UserContext = createContext(null)

function App(){
    const [user,setUser] = useState(null)
    const onGetUser = async () =>{
        const url = "/api/user/current"
        const option = {
            method:"GET"
        }
        await fetch(url,option)
        .then(res => {
            if(res.status == 200){
                return res.json()
            }
            throw new Error
        })
        .then(data =>setUser(data))        
        .catch(err => console.log(err))
    }
    useEffect(async() =>{
        await onGetUser()
    },[])
   
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Home}/>
                <Route path='/login' Component={Login}/>
                <Route path='/admin/dashboard' Component={Admin} />
                <Route path='/profile' Component={<Profile token={jwtDecode} />}/>
                <Route path='/student' Component={Student} />
                <Route path='/officer' Component={Officer} /> 
                <Route path='/register/' Component={Register} />
            </Routes>
        </BrowserRouter> 
    );
}
export default App;







