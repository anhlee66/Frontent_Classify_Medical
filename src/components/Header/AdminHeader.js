import { useNavigate } from "react-router-dom"

import logo from "../../assets/logo.gif"
import Search from "./Search"
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import user from "../../assets/fontawesome/svgs/regular/user.svg"
function AdminHeader({ username, avatar, onShowProfileBar }) {
    const navigate = useNavigate()
    const onBranchCLick = () => {
        navigate("/admin/dashboard")
    }
    return (
        <div className="admin-header">
            <div className="header-menu">
                <FontAwesomeIcon className="meun-icon" icon={faBars} size="2xl" />
                <div className="header-brand" onClick={onBranchCLick}>
                    <img src={logo} alt="logo" width={50} />
                    <p>Medical</p>
                </div>
            </div>

            <Search />
            <div className="header-profile">
                <div>
                    <FontAwesomeIcon icon={faBell} size="xl" style={{ color: "#ffffff" }} />
                </div>
                <div className="profile" onClick={onShowProfileBar}>
                    <img src={logo} style={{ width: 30 }} />
                </div>
            </div>

        </div>
    )
}

export default AdminHeader