import { Component } from "react"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import makeService from '../services/user'
export default function Login()
{
    async function onSubmit(e){
        e.preventDefault()
        // const services = makeService()
        let form = document.querySelector("#loginform")
        const formData = new FormData(form)
        const data ={}
        for( const [key,value] of formData){
            data[key]=value
        }
       
        // console.log(data)
       
        const res = await makeService.login(data)
        console.log(res)

    }
    return (
        <>
        <form id="loginform" 
           
        //    action="/api/users/login"
            method="POST" className="align-content-center" encType="multipart/form-data">
            <h1 className="align-item-center">Login</h1>
            <input name="username" type="text" placeholder="User name" className="form-control"/>
            <input name="password" type="password" placeholder="password" className="form-control"/>
            <input type="submit" value="login" onClick={onSubmit}  className="btn btn-primary text-white"/> 
        </form>
        </>
    )
}