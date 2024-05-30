import { Form } from 'react-router-dom'
import makeService from '../services/user'
export default function ChangePassword(){
    async function change_password(e){
        e.preventDefault()
        const form = document.querySelector("#change-password")
        const formData = new FormData(form)
        for(const [key,value] of formData){
            console.log(key,value)
        }
        const res = await makeService.change_password(formData)
        console.log(res)

    }
    return(
        <>
        <form id="change-password" encType="multipart/form-data">
            <h2>Change Password</h2>
            <label htmlFor="old-password">Old password</label>
            <input className="form-input" type="password" name="old-password" /><br/>
            <label htmlFor="new-password">New password</label>
            <input className="form-input" type="password" name="new-password" />
            <input type="submit" className="btn btn-primary" onClick={change_password} value="save" />
        </form>
        </>
    )
}