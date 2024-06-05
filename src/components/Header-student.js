import React from 'react';
import logo from '../assets/logo.gif';
import makeService from '../services/user'
import { useNavigate } from "react-router-dom"

const Header = () => {
    const navigator = useNavigate()
    async function onLogout() {
        const res = await makeService.logout()
        // console.log(res)

        if (res.success) {
            navigator('/login')
        }
    }
    return (
        <header className='header'>

            <img className='logo' src={logo} alt="Logo" />

            <div className='flex'>
                <div className='header-text'>HỆ THỐNG NHẬN DIỆN HÌNH ẢNH Y KHOA</div>
                {/* <p><a href='/login'>Login</a>|<a href='/register'>Register</a></p> */}
            </div>
            
            <div className='navbar'>
                <button className='btn btn-secondary' onClick={onLogout}>Logout</button>
            </div>
        </header>
    )
}

export default Header;
