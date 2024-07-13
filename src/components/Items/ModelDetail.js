import { Key, Mode } from "@mui/icons-material"

const ModelDetail = ({details}) =>{
    return (
        <div>
            { Object.keys(details).forEach((key) =>(
                <div key={key}>
                    {key}: {details[key]}
                </div>
            ))}
        </div>
    )
}
 export default ModelDetail