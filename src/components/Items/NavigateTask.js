import { useState } from "react"

const NavigateTask = ({departments, onSelected}) =>{
    return (
        <dialog id="popup-container">
            {departments && departments.map((value,index) =>(
                <div key={index} onClick={e =>onSelected(e,value.name)} className={value.id} >
                    {value.name}
                </div>
            ))}
        </dialog>
    )
}
export default NavigateTask