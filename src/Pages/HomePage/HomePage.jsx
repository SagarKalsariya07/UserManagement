import Header from "../../Component/Header/Header"
import { useNavigate } from "react-router-dom"
import './HomePage.css'
import { useContext } from "react"
import { AuthContext } from "../../Context/AuthProvider"

const HomePage = () => {
    const { currentuser } = useContext(AuthContext)
    const navigate = useNavigate();;

    const goToUsers = () => {
        navigate('/users')
    }
    return (
        <>
            <div>
                <Header />
                <div className="hometext">
                    <h2>
                        Welcome To User Management System
                    </h2>
                    <div className="userdetail">
                        <div><span>User Name:</span> {currentuser?.name}</div>
                        <div><span>User Email:</span> {currentuser?.email}</div>
                        <div><span>User Role:</span> {currentuser?.role}</div>
                        <p style={{ textAlign: "center" }}><button onClick={goToUsers}>All Users</button></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage