import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom"
import '../styles/style.css';
import makeService from '../services/user'
import user from '../services/user';

const Register = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [repassword, setRepassword] = useState("")
    const [msg,setMsg] = useState("")
    const navigator = useNavigate()
    const onRegister =async (e) =>{
        e.preventDefault()
        setMsg("")
        if(password !== repassword){
            setMsg("Re password not correct")
            // alert(msg)
            return
        }
        
        const user = {name,username,email,password}
        const res = await makeService.register(user)
        console.log(res)
        if(res.success){
            navigator("/login")
        }
        else{
            setMsg(res.msg)
        }
    }
    return (
        <div className='form-container'>
            <form onSubmit={onRegister} >
                <h3>Register form</h3>

                <div>
                    <label className='label'>Full name</label>
                    <input type="text"
                        className='box'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder='Type your name' />
                </div>
                <div>
                    <label className='label'>Username</label>
                    <input type="text"
                        className='box'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder='Type your name' />
                </div>
                <div>
                    <label className='label'>Email</label>
                    <input type="text"
                        className='box'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='Type your name' />
                </div>
                <div>
                    <label className='label'>password</label>
                    <input type="text"
                        className='box'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder='Type your name' />
                </div>
                <div>
                    <label className='label'>Re password</label>
                    <input type="text"
                        className='box'
                        value={repassword}
                        onChange={(e) => setRepassword(e.target.value)}
                        required
                        placeholder='Type your name' />
                </div>
                <p className='msg-error' >{msg}</p>
                <input type="submit" value="Register"  className='btn' />
            </form>
        </div>
    )
}

export default Register

