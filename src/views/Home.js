import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookies';
import { useEffect } from "react";

function Home() {
    const navigator = useNavigate();

    function redirect() {
        const permission = Cookies.getItem("permission");
        if (permission && permission.match('student')) {
            navigator('/student');
        } else if (permission && permission.match('admin')) {
            navigator('/admin/dashboard');
        } else {
            navigator('/login');
        }
        
        console.log("cookie", permission);
    }

    useEffect(() => {
        redirect();
    }, []); // Dependency array to ensure it runs once after the component mounts

    return (
        <>
            <button className="btn btn-primary" onClick={() => navigator('/login')}>Navi</button>
        </>
    );
}

export default Home;
