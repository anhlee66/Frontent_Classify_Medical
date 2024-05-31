import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import makeService from "../services/user"
const Login = () => {
    const [username, setUsername] = useState('');
=======
import '../styles/style.css';

const Login = () => {
    const [email, setEmail] = useState('');
>>>>>>> fe11ceaa601d370cb2cdeb25595a0ffc93d6d3c3
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
<<<<<<< HEAD
        const auth = {
            'username':username,
            'password':password
        }
        const res = await makeService.login(auth)
        console.log(res)
        if(res.success){
            // console.log(res.user['permission'])
            if(res.user['permission'] == 'admin'){
                navigate('/admin/dashboard')
            }
            else if(res.user['permission'] == 'officer'){
                navigate('/officer')
            }
            else navigate('/student')
=======
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
>>>>>>> fe11ceaa601d370cb2cdeb25595a0ffc93d6d3c3
        }
    }

    return (
<<<<<<< HEAD
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Auth} className="box container">
                                <p className='has-text-centered '>{msg}</p>
                                <div className='field mt-5 form-group'>
                                    <label className='label' htmlFor='username'>Email or Username</label>
                                    <div className='controls'>
                                        <input 
                                            type='text' 
                                            className='input' 
                                            name="username"
                                            placeholder='Email or Username' 
                                            value={username} 
                                            onChange={(e) => setUsername(e.target.value)} 
                                        />
                                    </div>
                                </div>
                                <div className='field mt-5 form-group'>
                                    <label className='label' htmlFor='password'>Password</label>
                                    <div className='controls'>
                                        <input 
                                            type='password' 
                                            className='input' 
                                            name="password"
                                            placeholder='******' 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                        />
                                    </div>
                                </div>
                                <div className='field mt-5'>
                                    <button className='button is-success is-fullwidth'>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        // <div className='container '>
        //     <form>
        //     <div data-mdb-input-init class="form-outline mb-4">
        //         <input type="email" id="form2Example1" class="form-control" />
        //         <label class="form-label" for="form2Example1">Email address</label>
        //     </div>

        //     <div data-mdb-input-init class="form-outline mb-4">
        //         <input type="password" id="form2Example2" class="form-control" />
        //         <label class="form-label" for="form2Example2">Password</label>
        //     </div>

        //     <div class="row mb-4">
        //         <div class="col d-flex justify-content-center">
        //             <div class="form-check">
        //                 <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
        //                 <label class="form-check-label" for="form2Example31"> Remember me </label>
        //             </div>
        //         </div>

        //         <div class="col">
        //             <a href="#!">Forgot password?</a>
        //         </div>
        //     </div>

        //     <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Sign in</button>

        //     <div class="text-center">
        //         <p>Not a member? <a href="#!">Register</a></p>
        //         <p>or sign up with:</p>
        //         <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
        //             <i class="fab fa-facebook-f"></i>
        //         </button>

        //         <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
        //             <i class="fab fa-google"></i>
        //         </button>

        //         <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
        //             <i class="fab fa-twitter"></i>
        //         </button>

        //         <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
        //             <i class="fab fa-github"></i>
        //         </button>
        //     </div>
        // </form>
        // </div>
=======
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
>>>>>>> fe11ceaa601d370cb2cdeb25595a0ffc93d6d3c3
    )
}

export default Login;
