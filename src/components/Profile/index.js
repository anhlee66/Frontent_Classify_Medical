import React, { useEffect, useState } from 'react'
import Header from '../Header/Header-student'
import axios from 'axios'
import { IoPersonCircleOutline } from 'react-icons/io5'
import UploadAvatar from './UploadAvatar'


const Profile = ({token}) => {

    const [user, setUser] = useState({})
    const [isUserUpdated, setisUserUpdated] = useState(false)


    useEffect(() => {
        const getProfileData = async () => {
            try {
                const { data } = axios.get(`http://localhost:8080/api/user`, { 
                    // GET: /api/user
                    // Yêu cầu JWT token để xác thực người dùng.
                    // Tìm người dùng trong cơ sở dữ liệu bằng _id từ token.
                    // Trả về thông tin người dùng.
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                });
                setUser(data);
                setisUserUpdated(false);
            } catch (error) { 
                console.log({ error });
            }
        };  
        getProfileData()
    }, [token, isUserUpdated])


    return (
        <>
        
        <Header />

        <div className='profile'>
            <div className='avatar'>
                <div className='avatar-wrapper'>
                    {user.avatarUrl ? (
                        <img 
                            src={`http://localhost:8080${user.avatarUrl}`}
                            alt={`${user.username} avatar`}
                        />
                        // POST /api/user/avatar                       
                        // Yêu cầu JWT token để xác thực người dùng.
                        // Upload file avatar sử dụng multer.
                        // Cập nhật URL avatar của người dùng trong cơ sở dữ liệu.
                        // Trả về URL avatar mới.
                    ) : (
                        <IoPersonCircleOutline />                   
                    )}
                    <UploadAvatar 
                        token={token}
                        userId={user.id}
                        username={user.username}
                        avatarUrl={user.avatarUrl}
                        setisUserUpdated={setisUserUpdated}
                    />
                </div>
            </div>
            <div className='body'>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Username: {user.username}</p>
                <p>Account create at: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
        </>

    )
}

export default Profile