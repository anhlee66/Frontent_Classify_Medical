import React from 'react';
import logo from '../assets/logo.gif';

const Header = () => (
    <header className='header'>
        <div className='flex'>
            <img className='logo' src={logo} alt="Logo" />
            <div className='header-text'>HỆ THỐNG NHẬN DIỆN HÌNH ẢNH Y KHOA</div>
            <p><a href='/login'>Login</a>|<a href='/register'>Register</a></p>
        </div>
    </header>
);

export default Header;
