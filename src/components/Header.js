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
            <div className='flex'>
                <img className='logo' src={logo} alt="Logo" />
                <div className='header-text'>HỆ THỐNG NHẬN DIỆN HÌNH ẢNH Y KHOA</div>
                {/* <p><a href='/login'>Login</a>|<a href='/register'>Register</a></p> */}
                <button className='btn btn-secondary logout' onClick={onLogout}>Đăng xuất</button>
            </div>
        </header>
    )
}

export default Header;
