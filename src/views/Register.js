import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom"
<<<<<<< HEAD
=======
import '../styles/style.css';

>>>>>>> fe11ceaa601d370cb2cdeb25595a0ffc93d6d3c3

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setconfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Register = async (e) => {
        e.prevenDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
            navigate("/");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
<<<<<<< HEAD
        <div className='form_wrapper'>
            <form onSubmit={Register} className="box">
                <p className='has-text-centered'>{msg}</p>
                <div className='field mt-5'>
                    <label className='label'>Name</label>
                    <div className='controls'>
                        <input type='text' className='input' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
                <div className='field mt-5'>
                    <label className='label'>Email</label>
                    <div className='controls'>
                        <input type='text' className='input' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className='field mt-5'>
                    <label className='label'>Password</label>
                    <div className='controls'>
                        <input type='password' className='input' placeholder='******' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className='field mt-5'>
                    <label className='label'>Confirm Password</label>
                    <div className='controls'>
                        <input type='password' className='input' placeholder='******' value={confPassword} onChange={(e) => setconfPassword(e.target.value)} />
                    </div>
                </div>
                <div className='field mt-5'>
                    <button className='button is-success is-fullwidth'>Register</button>
                </div>
=======
        <div className='form-container'>
            <form onSubmit={Register} >

                <h3>register form</h3>
                <p>{msg}</p>

                <label className='label'>Name</label>
                <input
                    type='text'
                    className='box'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label className='label'>Email</label>
                <input 
                    type='text' 
                    className='box' 
                    placeholder='Email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />

                <label className='label'>Password</label>
                <input 
                    type='password' 
                    className='box' 
                    placeholder='******' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />


                <label className='label'>Confirm Password</label>
                <input 
                    type='password' 
                    className='box' 
                    placeholder='******' 
                    value={confPassword} 
                    onChange={(e) => setconfPassword(e.target.value)}
                    required 
                />

                <input 
                    type='submit'
                    name='submit'
                    className='btn' 
                    value="Register"
                />

                <p>Already have an account? <a href="/login">login now</a></p>

>>>>>>> fe11ceaa601d370cb2cdeb25595a0ffc93d6d3c3
            </form>
        </div>
    )
}

export default Register