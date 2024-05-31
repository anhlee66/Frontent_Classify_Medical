import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './styles/style.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <div className='form-container'>
            <form onSubmit={Auth} >
                <h3>Login Now</h3>
                <p >{msg}</p>
                        <input 
                            type='text' 
                            className='box' 
                            placeholder='Enter your username' 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <input 
                            type='password' 
                            className='box' 
                            placeholder='Enter your password' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                <button className='btn'>Login</button>
                <p>don't have an account? <a href="/register">register now</a></p>
            </form>
        </div>
    )
}

export default Login;
