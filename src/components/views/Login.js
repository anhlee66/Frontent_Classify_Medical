import { useState } from "react";

export default function Login(){

    return (<>
       <div className="container ">
        <h1 className="justify-content-center">Login Page</h1>
            <form className="">
                <div className="form-group">
                    <label htmlFor="username">User name</label>
                    <input className="form-control" type="text" name="username" placeholder="Enter your username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" type="password" name="password" placeholder="Enter your username"/>
                </div>
                <div>
                    <input type="submit" className="btn btn-primary" value="Login"/>
                </div>
            </form>
       </div>
    </>)
}