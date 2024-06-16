import { useEffect, useState } from "react"

const Pagination = ({current,length,max}) =>{
    const half = Math.floor(length/2)
    let start = current - half
    let end = current + half
    const nav = []
    const [page,setPage] = useState([])
    useEffect(() =>{
        if(current == 1){
            start = 1
        }
        if(current == max){
            end  = max
        }
        for (let i=start;i<=end;i++){
            nav.push(i)
        }
        // nav.map((value,index) =>console.log(value))
        console.log("pagination",nav)
        setPage(nav)
    },[])
    return (
        <div className="pagination">
            <div>Prevous</div>
            {!!page && page.map((value,index) =>(
                <div key={index} className="pagi-item">{value}</div>
            ))}
            <div>Next</div>
        </div>
    )
}

export default Pagination