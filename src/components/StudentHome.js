const StudentHome = ({onNavigate}) => {
    return (
        <div>
            <h2>Home</h2>
            <div>
                <button className="btn btn-primary"  onClick={onNavigate("predict")}>
                    Nhận dạng hình ảnh
                </button>
            </div>
        </div>
    )
}
export default StudentHome