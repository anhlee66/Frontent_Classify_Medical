import  { faBars, faBell } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
function ItemCard({title,value,icon,color,bg}){
    return (
        <div className="item-card" style={{color:color,backgroundColor:bg}}>
            <div className="item-card-text">
                <h2>{value}</h2>
                <p>{title}</p>
                {/* <p><a >View detail</a></p> */}
            </div>
            <div className="item-card-image">
                <FontAwesomeIcon icon={icon} size="2xl"/>
            </div>
        </div>
    )
}
export default ItemCard