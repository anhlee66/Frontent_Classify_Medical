const Search = () => (
    <form className="form-inline row g-3 ">
        <div className="col-auto">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
           
        </div>
        <div className="col-auto">
        <button className="btn btn-primary " type="submit">Search</button>
        </div>
    </form>
)

export default Search