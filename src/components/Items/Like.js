import { faThumbsUp as like, faThumbsDown as dislike } from "@fortawesome/free-solid-svg-icons"
import { faThumbsUp as unlike, faThumbsDown as undislike } from "@fortawesome/free-regular-svg-icons"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
const Like = () => {
    const status = ['like', 'normal', 'dislike']
    let iconLike = unlike, iconDislike = undislike
    const [state, setState] = useState("normal")
    const onLike = async (e) => {
        if (state == "like") {

            setState("normal")
            iconLike = unlike

        }
        else{

            setState("like")
            iconLike = like

        }
        console.log(state)
        iconDislike = undislike
    }
    const onDislike = async (e) => {

    }

    return (
        <div className="like-status">
            {state && (
                <>
                <FontAwesomeIcon className="like" icon={iconLike} onClick={onLike} />
                <FontAwesomeIcon className="dislike" icon={iconDislike} />
                </>
            )}
        </div>
    )
}
export default Like