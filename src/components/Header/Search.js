import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const Search = () => (
    <div className="search-box">
        <button className="btn-search" type="submit">
            <FontAwesomeIcon icon={faSearch} color="#b9bdd3"/>
        </button>
        <input className="search" type="text" placeholder="Search" aria-label="Search" />
        
       
    </div>
)

export default Search