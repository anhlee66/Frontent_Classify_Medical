import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
const AddUser = ({ onBack, departments,onReload }) => {
    const [userName, setUserName] = useState("")
    const [loginName, setLoginName] = useState("")
    const [password, setPassword] = useState("")
    const [passCon, setPassCon] = useState("")
    const [department, setDepartment] = useState(departments[0].id)
    function isValid() {
        if (userName == "") return false
        if (loginName == "") return false
        if (password == "") return false
        if (passCon == "") return false 
        return true
    }
    const showMessage = (msg) => {
        setTimeout(() => {
            alert(msg)
        }, 100)
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        if (password != passCon) {
            showMessage("Xác nhận mậ khẩu không đúng, thử lại sau")
            return
        }
        const form = new FormData()
        form.append("name", userName)
        form.append("username", loginName)
        form.append("password", password)
        form.append("permission", "officer")
        form.append("department_id", department)
        const url = "/api/user/add"
        await fetch(url, {
            method: "POST",
            body: form
        })
            .then(res => {
                if (res.status == 200) {
                    showMessage("Thêm tài khoản chuyên gia thành công.")
                    onBack()
                    onReload()
                }
                throw new Error()
            })
            .catch(error => console.log(error))
    }
    const onSelectDepartment = (e) => {
    }
    const onRefresh = (e) => {
        e.preventDefault()
        console.log(department)

    }
    useEffect(() => {
        const fetchAPI = async () => {

        }
        fetchAPI()
    })
    return (
        <div className="second-layer">
            <div className="second-layer-header">
                <button className="button" onClick={onBack}>
                    <FontAwesomeIcon icon={faArrowLeft} size="l" />
                    &nbsp;Back</button>
            </div>
            <div className="second-layer-container">
                <form>
                    <p>Thêm tài khoản chuyên gia</p>
                    <div className="group">
                        <label htmlFor="name">Họ tên</label>
                        <input className="form-control"
                            name="user-name" type="text"
                            placeholder="Nhập tên người dùng"
                            onChange={e => setUserName(e.target.value)}
                            required />
                    </div>
                    <div className="group">
                        <label htmlFor="name">Tên đăng nhập</label>
                        <input className="form-control"
                            name="name" type="text"
                            placeholder="Nhập tên đăng nhập"
                            onChange={e => setLoginName(e.target.value)}
                            required />
                    </div>
                    <div className="group">
                        <label htmlFor="name">Mật khẩu</label>
                        <input className="form-control"
                            name="password" type="text"
                            placeholder="Nhập mật khẩu"
                            onChange={e => setPassword(e.target.value)}
                            required />
                    </div>
                    <div className="group">
                        <label htmlFor="name">Nhập lại mật khẩu</label>
                        <input className="form-control"
                            name="password-confirn" type="text"
                            placeholder="Xác nhận mật khẩu"
                            onChange={e => setPassCon(e.target.value)}
                            required />
                    </div>
                    <div>
                        <label htmlFor="department" >Bộ phận</label>
                        <select name="department"
                            className="form-control"
                            onChange={e => setDepartment(e.target.value)}>
                            {departments && departments.map((value, index) => (
                                <option key={index} value={value.id}>{value.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-tool">

                        <button className="button" onClick={onSubmit} disabled={!isValid()}>Lưu</button>
                        <button className="button" onClick={onRefresh}>Refresh</button>

                        <button className="button" onClick={onBack}>Hủy</button>
                    </div>
                </form>
            </div>
        </div >)
}
export default AddUser