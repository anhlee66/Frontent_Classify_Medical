
const Notification = ({notify}) =>{
    return (
        <div className="notification-container">
            <p>Notification</p>
            {notify && notify.map((value,index) =>(
                <div className="notification-item" key={index}>
                    <p className="item-title">{value.tag}</p>
                    <p className="item-content">{value.content}</p>
                    <p className="item-author">{value.name}</p>
                </div>
            ))}
        </div>
    )
}
export default Notification