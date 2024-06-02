import React, { useState } from 'react';
// import './styles/App.css';
import './styles/style.css'
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Login from './views/Login';
import Admin from './views/Admin';
import Student from './views/Student';
import officer from './views/Officer';
import Register from './views/Register';
import UploadSection from './components/UploadSection';


function App(){
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" Component={Home}/> */}
                <Route path='/login' Component={Login}/>
                <Route path='/admin/dashboard' Component={Admin} />
                <Route path='/student' Component={UploadSection} />
                <Route path='/officer' Component={officer} /> 
                <Route path='/register/' Component={Register} />
            </Routes>
        </BrowserRouter> 
    );
}
export default App;







