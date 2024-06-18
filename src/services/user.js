import { hydrateRoot } from "react-dom/client"
import { Form } from "react-router-dom"
// import Cookie from 'js-cookie'
function makeService(){
    const header = {
        "Content-type":"application/json"
    }
    
    //example user={
    //     'username':'admin',
    //     'password':'0101'
    // }
    async function login(user){
        const url = "/api/user/login"
        const form = new FormData()
        form.append("username",user.username)
        form.append("password",user.password)
        // console.log(form.values())

        const option = {
            // headers:header,
            method:"POST",
            body: form
        }
       
        return await fetch(url,option)
        .then(res => res.json())
    }


    
    async function logout(){
        const url = "/api/user/logout"
        const option = {
            header:header,
            method:"GET",
        }
        return await fetch(url,option)
        .then(res => res.json())
    }

    async function get_current_user(){
        const url = "/api/user/current"
        const option = {
            header:header,
            method:"GET"
        }
        return await fetch(url,option)
        .then(res => res.json())
    }

    /*
    exampple:  user={
        'name':'le tuan anh',
        'email':'anh@gmail.com',
        'username':'anhle'
        'password':'0101',
    }
    */

    // register account for students
    async function register(user){
        const url = "/api/user/register"
        const form = new FormData()
        form.append("username",user.username)
        form.append("email",user.email)
        form.append("password",user.password)
        form.append("name",user.name)
        const option = {
            method:"POST",
            body: form
        }
        return await fetch(url,option)
        .then(res => res.json())
    }

    async function get_all_user(user_type){
        const url = `/api/user/${user_type}/all`
        const option = {
            Headers:header,
            method:"GET",
        }
        return await fetch(url,option).then(res => res.json())
    }

    /*
    example: 
    form = document.querySelector("#form-id")
    const formData = new FormData(form)
    */
    async function change_password(form){
        const url = "/api/user/password/change"
       
        const option ={
            method:"POST",
            body: form
        }
        return await fetch(url,option).then(res => res.json())
    }

    async function get_user_by_id(id){
        const url =`/api/user/${id}`
        const option = {
            headers:header,
            method:"GET"
        }

        return await fetch(url,option)
        .then(res => res.json())
    }
    return {
        login,
        logout,
        get_current_user,
        register,
        get_all_user,
        change_password,
        get_user_by_id
    }
}

export default makeService()