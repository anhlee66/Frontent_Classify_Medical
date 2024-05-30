import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import makeService from '../services/user'
export default function Register(){
    async function onSubmit(e){
        e.preventDefault()
        const form = document.querySelector("#register")
        const formData = new FormData(form)
        const data = {}
        for(const [key,value] of formData){
            data[key] = value
        }
        console.log(data)
        const res = await makeService.register(data)
        console.log(res)
    }
    return (
    <>
    <form id="register" encType="multipart/form-data" method="POST">
        <h2>Register</h2>
        <label htmlFor="name">full name</label>
        <input name="name" input="text" className="form-input" /><br/>
        <label htmlFor="email">email</label>
        <input name="email" input="email" className="form-input" /><br/>
        <label htmlFor="username">username</label>
        <input name="username" input="text" className="form-input" /><br/>
        <label htmlFor="password">password</label>
        <input name="password" input="password" className="form-input" /><br/>
        <label htmlFor="re-password">re password</label>
        <input name="re-password" input="password" className="form-input" /><br/>

        <input type="submit" value="Register" onClick={onSubmit} className="btn btn-primary"/>
    </form>

    </>)
}