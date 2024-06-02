import { useState, useEffect } from 'react'
import makeService from '../services/user'
import '../styles/style.css'
function AdminStudent() {
    const [students, setStudents] = useState([])
    useEffect(() => {
        const fetchAPI = async () => {
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
        fetchAPI()
    }, [])
    console.log(students)
    return (
    <div className='student-container'>
        {/* <div >List student</div> */}
        <table className='student'>
            <tr>
                <th>
                    Student Name
                </th>
                <th>
                    Email
                </th>
                <th>
                    Gender
                </th>
                <th>
                    Password
                </th>
                <th >
                    Action
                </th>
            </tr>
            {students.map((value) => (
                <tr>
                    <td>
                        {value.name}
                    </td>
                    <td>
                        {value.email}
                    </td>
                    <td>
                        {value.gender}
                    </td>
                    <td>
                        <input type='password' readOnly value={value.password}/>
                    </td>
                    <td className='action'>
                        <button className='btn btn-primary'>Edit</button>
                        <button className='btn btn-danger'>Delete</button>
                    </td>
                </tr>
            ))}
        </table>
        
    </div>)
}

export default AdminStudent