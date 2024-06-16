import Logo from "../../assets/logo.gif"
import makeService from '../../services/user'
import { useNavigate } from "react-router-dom"
import { faChartLine, faFolder, faUsers, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
function Sidebar({ onChangedTab }) {
    const navigator = useNavigate()
    async function onLogout() {
        const res = await makeService.logout()
        // console.log(res)

        if (res.success) {
            navigator('/login')
        }
    }
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li id="dashboard" onClick={onChangedTab}>
                        <FontAwesomeIcon className="sidebar-icon" icon={faChartLine} />
                        <p>Dashboard</p>
                    </li>
                    <li id="category" onClick={onChangedTab}>
                        <FontAwesomeIcon className="sidebar-icon" icon={faFolder} />
                        <p>Category</p>
                    </li>
                    <li id="member" onClick={onChangedTab}>
                        <FontAwesomeIcon className="sidebar-icon" icon={faUsers} />
                        <p>Member</p>
                    </li>
                    <li onClick={onLogout} className="btn-logout">
                        <FontAwesomeIcon icon={faRightFromBracket} className="sidebar-icon" />
                        <p onClick={onLogout}>Logout</p>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar