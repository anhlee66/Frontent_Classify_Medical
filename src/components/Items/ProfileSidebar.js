import logo from "../../assets/logo.gif"

function ProfileSidebar({id,name}){
    return (
        <div className="profile-sidebar">
            <section className="profile-section">
                <div>
                    <img  src={logo} />
                </div>
                <div className="profile-section-info">
                    <p>{name}</p>
                    <p>admin</p>
                </div>
                <br />
            </section>
            <section className="profile-sidebar-item">
                <p>
                    Profile
                </p>
            </section>
            <section className="profile-sidebar-item">

                <p>
                    Account information
                </p>
            </section>
            <section className="profile-sidebar-item">

                <p>
                    Language:English
                </p>
            </section>
            <section className="profile-sidebar-item">

                <p>
                    Logout
                </p>
            </section>
        </div>
    )
}

export default ProfileSidebar