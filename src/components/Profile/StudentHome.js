const StudentHome = ({onClick}) => {
    return (
        <div>
            <h2>Home</h2>
            <div>
                <button  onClick={onClick("predict")}>
                    Predict
                </button>
            </div>
        </div>
    )
}
export default StudentHome