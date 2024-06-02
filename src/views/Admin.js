import AdminHeader from '../components/AdminHeader'
import logo192 from '../assets/logo.gif'
import { useState } from 'react'
import AdminHome from '../components/AdminHome'
import AdminModel from '../components/AdminModel'
import AdminStudent from '../components/AdminStudent'
function Admin(){
    const [tab, setTab] = useState('home')
    const onTagChange = e =>{
        setTab(e.target.id)
    }
    return (<>
        <AdminHeader username="le tuan anh" avatar={logo192} onClick={onTagChange}/>
        {tab == 'home' && (<AdminHome />)}
        {tab == 'model' && (<AdminModel />)}
        {tab == 'student' && (<AdminStudent />)}


    </>)
}

export default Admin