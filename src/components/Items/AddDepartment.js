import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faL } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { Form } from "react-router-dom"

const AddDepartment = ({ onBack,onReload }) => {
    const [addUser, setAddUser] = useState(false)
    const [derName, setDerName] = useState("")
    const [description, setDescription] = useState("")
    const [userName, setUserName] = useState("")
    const [loginName, setLoginName] = useState("")
    const [password, setPassword] = useState("")
    const [passCon, setPassCon] = useState("")
    const showMessage = (msg) => {
        setTimeout(() => {
            alert(msg)
        }, 100)
    }
    function isValid() {
        if (derName == "") return false
        if (addUser) {
            if (userName == "") return false
            if (loginName == "") return false
            if (password == "") return false
            if (passCon == "") return false
        }
        return true
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData()
        if (addUser && password != passCon) {
            showMessage("Xác nhận mậ khẩu không đúng, thử lại sau")
            return
        }
        data.append("name", derName)
        data.append("description", description)
        const url = "/api/department/add"
        await fetch(url, {
            method: "POST",
            body: data
        })
            .then(res => {
                if (res.status == 200) {
                    return res.json()
                }
                throw new Error
            })
            .then(async (data) => {
                if (!addUser) {
                    showMessage("Thêm phòng ban thành công")
                    return
                }
                const id = data.id
                console.log(id)
                const form = new FormData()
                form.append("name", userName)
                form.append("username", loginName)
                form.append("password", password)
                form.append("permission", "officer")
                form.append("department_id", id)
                const url = "/api/user/add"
                await fetch(url, {
                    method: "POST",
                    body: form
                })
                    .then(res => {
                        if (res.status == 200) {
                            showMessage("Thêm phòng ban và tài khoản thành công.")
                            onBack()
                        }
                        throw new Error()
                    })
                    .catch(error => console.log(error))
                onReload()

            })
            .catch(err => console.log(err))
    }
    const onRefresh = () => {
        console.log(isValid())
    }
    return (
        <div className="second-layer">
            <div className="second-layer-header">
                <button className="button" onClick={onBack}>
                    <FontAwesomeIcon icon={faArrowLeft} size="l" />
                    &nbsp;Back</button>
            </div>
            <div className="second-layer-container">
                <form>
                    <p>Thêm phòng ban</p>
                    <div className="group">
                        <label htmlFor="name">Tên phòng</label>
                        <input className="form-control"
                            name="name" type="text"
                            placeholder="Nhập tên"
                            onChange={e => setDerName(e.target.value)}
                            required />
                    </div>
                    <div className="group">
                        <label htmlFor="description">Mô tả</label>
                        <textarea
                            name="description"
                            cols="10"
                            className="form-control"
                            onChange={e => setDescription(e.target.value)}
                        >

                        </textarea>
                    </div>

                    {addUser && (<>
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
                    </>)}
                    <div style={{ marginLeft: "10px" }}>
                        <input type="checkbox"
                            onChange={e => setAddUser(e.target.checked)}
                        />
                        <label>Tạo tài khoản mặc định</label>

                    </div>
                    <div className="form-tool">

                        <button className="button" onClick={onSubmit} disabled={!isValid()}>Lưu</button>
                        <button className="button" onClick={onRefresh}>Refresh</button>

                        <button className="button" onClick={onBack}>Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddDepartment