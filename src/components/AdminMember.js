import { useState, useEffect } from 'react'
import makeService from '../services/user'
import '../styles/style.css'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Pagination from './Items/Pagination'
import data from '../data'
import AddDepartment from './Items/AddDepartment'
import AddUser from './Items/AddUser'
import { json } from 'react-router-dom'
function AdminMember() {
    const [isShowNewUser, setIsShowNewUser] = useState(false)
    const [isShowDepartment, setIsShowDepartment] = useState(false)
    const [students, setStudents] = useState([])
    const [departments, setDepartments] = useState([])
    const [officers, setOfficers] = useState([])
    const [query, setQuery] = useState("")
    const onGetStudent = async () => {
        try {
            const res = await makeService.get_all_user('student')
            // setModels(res)
            //  console.log("res",res)
            setStudents(res)
        }
        catch (error) {
            console.log("Error fetching api get all model")
        }
    }
    const onGetDepartment = async () => {
        const url = "/api/department/all"
        await fetch(url, { method: "GET" })
            .then(res => {
                if (res.status == 200) {
                    return res.json()
                }
                throw new Error
            })
            .then(data => setDepartments(data))
            .catch(error => console.log(error))
    }

    const onGetOfficer = async () => {
        const url = "/api/user/officer/all"
        await fetch(url, { method: "GET" })
            .then(res => {
                if (res.status == 200) {
                    return res.json()
                }
                throw new Error
            })
            .then(data => {
                setOfficers(data)
                console.log(data)
            })
    }
    const onSearchUser = async (e) => {
        e.preventDefault()
        const query_search = query.replace(" ", "+")
        const url = `/api/user/search?name=${query_search}`
        console.log(url)
        await fetch(url, { method: "GET" })
            .then(res => {
                if (res.status == 200) {
                    return res.json()
                }
                throw new Error
            })
            .then(data => setStudents(data))
            .catch(err => console.log(err))
    }
    const onQueryChanged = async (e) => {
        const value = e.target.value
        setQuery(value)
        if (value == "") {
            onGetStudent()
        }
    }
    const showMessage = (msg) => {
        setTimeout(() => {
            alert(msg)
        }, 100)
    }
    const onShowUser = () => {
        setIsShowNewUser(true)
    }
    const onShowDepartment = () => {
        setIsShowDepartment(true)
    }
    const onDeleteOfficer = async (id) => {
        const msg = `Bạn muốn xóa người dùng này không?`
        if (window.confirm(msg) == true) {
            const url = `/api/user/${id}/delete`
            await fetch(url, { method: "GET" })
                .then(res => {
                    if (res.status == 200) {
                        showMessage("Ban đã xóa người dùng thành công")
                        onGetOfficer()
                        return
                    }
                    showMessage("Lỗi hệ thống")
                    throw new Error
                })
                .catch(err => console.log(err))
        }
    }
    useEffect(() => {
        const fetchAPI = async () => {
            await onGetStudent()
            await onGetDepartment()
            await onGetOfficer()
        }
        fetchAPI()
    }, [])
    // console.log(students)
    return (
        <div >
            {isShowNewUser && (<AddUser
                onBack={e => setIsShowNewUser(false)}
                departments={departments}
                onReload={onGetOfficer}
            />)}
            {isShowDepartment && (<AddDepartment
                onBack={e => setIsShowDepartment(false)}
                onReload={onGetDepartment} />)}
            <h2>Member</h2>
            <div className='box full  '>
                <div className='box-header'>
                    <p className='box-title'>Người dùng</p>
                    <div className='tool-box'>
                        <form >
                            <input type='text'
                                className='form-control'
                                placeholder='search '
                                onChange={onQueryChanged} />
                            <button className='button' onClick={onSearchUser}>Search</button>
                        </form>
                    </div>
                </div>
                <div className='box-container'>
                    <table className='full category'>
                        <thead>
                            <tr>
                                <th>
                                    Tên
                                </th>
                                <th>
                                    Tên đăng nhập
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    Giới tính
                                </th>
                                <th>
                                    Mật khẩu
                                </th>
                                <th style={{ textAlign: "center" }}>

                                </th>
                            </tr>
                        </thead>
                        {students.length > 0 ? students.map((value, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>
                                        {value.name}
                                    </td>
                                    <td>
                                        {value.username}
                                    </td>
                                    <td>
                                        {value.email}
                                    </td>
                                    <td >
                                        {value.gender == "male" ? "Name" : "Nữ"}
                                    </td>
                                    <td className='col-password'>
                                        <input type='password' readOnly value={value.password} />
                                    </td>
                                    <td >
                                        <div className='action'>
                                            <FontAwesomeIcon style={{ color: "#1478c3" }} icon={faPenToSquare} />
                                            <FontAwesomeIcon style={{ color: "#ff2100" }} icon={faTrash} />
                                            <input type="checkbox" />

                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        )) : (<p style={{ textAlign: "center" }}>Không tìm thấy</p>)}
                    </table>
                </div>
                {/* <Pagination current={1} length={3} max={4}/> */}

            </div>
            <div className='box full'>
                <div className='box-header'>
                    <p className='box-title'>Phòng ban</p>
                    <div className='tool-box'>
                        <button className='button' onClick={onShowDepartment}>Thêm</button>
                        <button className='button' onClick={onGetDepartment}>Reload</button>


                    </div>
                </div>
                <div className='box-container'>
                    <table className='full'>
                        <thead>
                            <tr>
                                <th>
                                    ID
                                </th>
                                <th>
                                    Tên
                                </th>
                                <th>Mô tả</th>
                                <th style={{ textAlign: "center" }}>

                                </th>
                            </tr>
                        </thead>
                        {departments && departments.map((value, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>
                                        {value.id}
                                    </td>
                                    <td>
                                        {value.name}
                                    </td>
                                    <th>{value.description}</th>

                                    <td >
                                        <div className='action'>
                                            <FontAwesomeIcon style={{ color: "#1478c3" }} icon={faPenToSquare} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
            <div className='box full'>
                <div className='box-header'>
                    <p className='box-title'>Chuyên gia</p>
                    <div className='tool-box'>
                        <button className='button' onClick={onShowUser}>Thêm</button>
                    </div>
                </div>
                <div className='box-container'>
                    <table className='full'>
                        <thead>
                            <tr>
                                <th>
                                    Tên
                                </th>
                                <th>
                                    Tên đăng nhập
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    Giới tính
                                </th>
                                <th>
                                    Mật khẩu
                                </th>

                                <th style={{ textAlign: "center" }}>

                                </th>
                            </tr>
                        </thead>
                        {officers.map((value, index) => (
                            <tbody key={index}>
                                <tr >
                                    <td style={{ marginLeft: "10px" }}>
                                        {value.name}
                                    </td>
                                    <td>
                                        {value.username}
                                    </td>
                                    <td>
                                        {value.email}
                                    </td>
                                    <td>
                                        {value.gender == "male" ? "Name" : "Nữ"}
                                    </td>
                                    <td className='col-password'>
                                        <input type='password' readOnly value={value.password} />
                                    </td>
                                    <td >
                                        <div className='action'>
                                            <FontAwesomeIcon style={{ color: "#1478c3" }} icon={faPenToSquare} />
                                            <FontAwesomeIcon style={{ color: "#ff2100" }}
                                                icon={faTrash}
                                                values={value.id}
                                                onClick={e => onDeleteOfficer(value.id)} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>

        </div>)
}

export default AdminMember