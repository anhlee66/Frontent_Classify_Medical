import { useState, useEffect } from 'react'
import makeService from '../services/user'
import '../styles/style.css'
import { faTrash,faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Pagination from './Items/Pagination'
function AdminMember() {
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
        <div >
            <div className='box full student-container'>
                <p >List student</p>
                <div>
                    <table className='student'>
                        <thead>
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
                        </thead>
                        {students.map((value,index) => (
                            <tbody key={index}>
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
                                        <input type='password' readOnly value={value.password} />
                                    </td>
                                    <td >
                                        <div className='action'>
                                           <FontAwesomeIcon style={{color:"#1478c3"}}icon={faPenToSquare} />
                                           <FontAwesomeIcon style={{color:"#ff2100"}}icon={faTrash} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
                <Pagination current={1} length={3} max={4}/>

            </div>

        </div>)
}

export default AdminMember