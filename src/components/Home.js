import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import makeService from '../services/user'
import Cookies from 'js-cookie';
function Home() {
  const get_user = async () =>{
    const res = await makeService.get_current_user()
    console.log(res)
  }

  const logout = async () =>{
    const header   = {"Content-type":"application/json"}
    await fetch('/api/user/logout',{
      header:header,
      method:"GET",

  }).then(response => response.json())
  .then(data => console.log(data))
  }

  const get_all_user = async () =>{
    const res = makeService.get_all_user()
    console.log(res)

  
  }
  const get_user_by_id = async () =>{
    const user_id = Cookies.get("current_user")
    const res = await makeService.get_user_by_id(user_id)
    console.log(res)
  }
  return (
    <div className="App">
      <h1 className="justify-content-center">Welcom to Medical</h1>
      <button className="btn btn-primary"><a className="text-white" href="/login">Login</a></button>
      <button  className="btn btn-secondary"onClick={get_user}>Get current user</button>
      <button className='btn btn-secondary' onClick={logout}>Logout</button>
      <button className="btn btn-primary"><a className="text-white" href="/register">Register</a></button>
      <button className="btn btn-primary"><a className="text-white" href="/user/change_password">Chaneg password</a></button>
      <button className="btn btn-primary" onClick={get_user_by_id}>Get User by id</button>

      <br/>
      <button className="btn btn-primary" onClick={get_all_user}>Get All User</button> <br/>
      <button className="btn btn-primary"><a className="text-white" href="/model/request">Make request</a></button>

    </div>
  );
}

export default Home;
