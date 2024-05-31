import { useState, useEffect } from 'react'
import makeService from '../services/user'
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
    return (<>
        <div>List student</div>
        {students.map((value) => (
            <div>
                <span>{value.id}</span>
                <span>{value.name}</span>
                <span>{value.email}</span>
                <span>{value.gender}</span>
                <span>{value.password}</span>
                <button >Edit</button>
            </div>))}
    </>)
}

export default AdminStudent