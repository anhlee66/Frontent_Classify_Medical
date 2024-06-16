function ItemSplilt({title,value,icon,percent=10,color,border}){
    return (
        <div className="item-card" style={{color:color,border:`1px solid ${border}`,backgroundColor:"white"}}>
            <div className="item-card-text">
                <h2 style={{fontSize:30}}>{value}</h2>
                <p>{title}</p>
                {/* <p><a >View detail</a></p> */}
            </div>
            <div className="item-card-image" style={{width:200,margin:"0 10px",backgroundColor:border,opacity:0.9}}>
                <p>{percent} %</p>
            </div>
        </div>
    )
}
export default ItemSplilt