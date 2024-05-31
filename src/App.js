<<<<<<< HEAD
import React, { useState } from 'react';
import './App.css';

import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Login from './views/Login';
import Admin from './views/Admin';
import Student from './views/Student';
import officer from './views/Officer';
=======
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import Login from './views/Login';
import Register from './views/Register';
>>>>>>> fe11ceaa601d370cb2cdeb25595a0ffc93d6d3c3


function App(){
    return (
        <BrowserRouter>
            <Routes>
<<<<<<< HEAD
                {/* <Route path="/" Component={Home}/> */}
                <Route path='/login' Component={Login}/>
                <Route path='/admin/dashboard' Component={Admin} />
                <Route path='/student' Component={Student} />
                <Route path='/officer' Component={officer} /> 
            </Routes>
        </BrowserRouter> 
    );
}





















=======
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route
                    path='/'
                    element = {
                        <>
                            <div>
                                <Header />
                                <UploadSection />
                            </div>
                        </>
                    }
                />    
            </Routes>
        </BrowserRouter>

    );
}

>>>>>>> fe11ceaa601d370cb2cdeb25595a0ffc93d6d3c3
export default App;







