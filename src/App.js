import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import Login from './views/Login';
import Register from './views/Register';


function App(){
    return (
        <BrowserRouter>
            <Routes>
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

export default App;







