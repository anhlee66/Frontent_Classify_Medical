import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import makeService from "../services/user"
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        const auth = {
            'username': username,
            'password': password
        }
        setMsg("")
        const res = await makeService.login(auth)
        console.log(res)
        if (res.success) {
            // console.log(res.user['permission'])
            if (res.user['permission'] == 'admin') {
                navigate('/admin/dashboard')
            }
            else if (res.user['permission'] == 'officer') {
                navigate('/officer')
            }
            else navigate('/student')
        }
        else {
            setMsg(res.msg)
        }
    }

    return (
        <div className='form-container'>
            <form onSubmit={Auth} >
                <h3>Login Now</h3>
                <div className='form-group'>
                    <input
                        type='text'
                        className='box'
                        placeholder='Enter your username'
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                            setMsg("")
                        }}
                    />
                </div>
                <input
                    type='password'
                    className='box'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setMsg("")
                    }}
                />
                <p className='msg-error'>{msg}</p>
                <button className='btn btn-primary form-control'>Login</button>
                <p>don't have an account? <a href="/register">register now</a></p>
            </form>
        </div>
    )
}

export default Login;
