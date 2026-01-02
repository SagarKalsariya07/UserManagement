import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import { AuthContext } from '../../Context/AuthProvider';
import { useContext } from 'react';

const Header = () => {
    const navigate = useNavigate();
    const { SetCurrentuser } = useContext(AuthContext);

    const handleLogout = () => {
        SetCurrentuser([]);
        localStorage.removeItem("currentuser");
        navigate('/');
    }

    return (
        <div className="headerptn">
            <div>
                <h3>User Management</h3>
            </div>
            <div>
                <ul className='headerlinks'>
                    <Link to='/homepage'>
                        <li>Home Page</li>
                    </Link>
                    <Link to='/users'>
                        <li>Users</li>
                    </Link>
                </ul>
            </div>
            <div>
                <button onClick={handleLogout} type='button' style={{ cursor: "pointer" }}>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Header;