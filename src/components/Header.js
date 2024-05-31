import React from 'react';
import logo from '../assets/logo.gif';

const Header = () => (
    <header>
        <img src={logo} alt="Logo" />
        <div className='header-text'>HỆ THỐNG NHẬN DIỆN HÌNH ẢNH Y KHOA</div>
        <p><a href='Register.js'>Register</a>Login</p>
    </header>
);

export default Header;
