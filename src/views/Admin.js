import AdminHeader from '../components/Header/AdminHeader'
import logo192 from '../assets/logo.gif'
import { useState } from 'react'
import AdminDashboard from '../components/AdminDashboard'
import AdminCategory from '../components/AdminCategory'
import AdminMember from '../components/AdminMember'
import Sidebar from '../components/Items/Sidebar'
import ProfileSidebar from "../components/Items/ProfileSidebar"
import '../styles/admin.css'
function Admin() {
    const [isShow,setIsShow] = useState(false)
    const [tab, setTab] = useState('dashboard')
    const onTagChange = e => {
        setTab(e.target.id)
    }
    const onShowProfile = () =>{
        setIsShow(!isShow)
    }
    
    return (
        <div className='admin-page'>
            <AdminHeader onShowProfileBar={onShowProfile} />
            {isShow &&<ProfileSidebar name="le tuan anh" />}
            <div>
                <Sidebar onChangedTab={onTagChange} />
                <main className='acontainer'>
                    {tab == 'dashboard' && (<AdminDashboard />)}
                    {tab == 'category' && (<AdminCategory />)}
                    {tab == 'member' && (<AdminMember />)}
                </main>
               
            </div>
           


        </div>)
}

export default Admin