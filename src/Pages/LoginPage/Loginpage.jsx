import { useContext, useEffect, useState } from "react";
import './LoginPage.css'
import Users from "../../Users";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const LoginPage = () => {
    const { SetCurrentuser } = useContext(AuthContext);
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState({
        isError: false,
        errorMsg: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setError({
            isError: false,
            errorMsg: ""
        })
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleLogin = (e) => {
        e.preventDefault();

        const loginUser = Users?.find((user) => user?.email === loginData?.email && user?.password === loginData?.password);

        let verifiedUser = false;
        if (loginUser) {
            if (loginUser?.role === "superadmin") {
                verifiedUser = true;
            } else if (loginUser?.active === "true") {
                verifiedUser = true;
            } else {
                setError({
                    isError: true,
                    errorMsg: "You are inactive please contact to superadmin"
                })
            }
        } else {
            setError({
                isError: true,
                errorMsg: "Email or Password is wrong"
            })
        }

        if (verifiedUser) {
            localStorage.setItem("currentuser", JSON.stringify(loginUser));
            SetCurrentuser(loginUser);
            navigate('/homepage');
        }
    }

    return (
        <>
            <div className="loginformdiv">
                <form className="loginform" onSubmit={handleLogin}>
                    <div className="formfeilddiv">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={(e) => handleChange(e)}
                            required
                            placeholder="Enter Your Email"
                        />
                    </div>
                    <div className="formfeilddiv">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={(e) => handleChange(e)}
                            required
                            placeholder="Enter Your Password"
                        />
                    </div>
                    {error?.isError &&
                        <div style={{ color: "red" }}>{error?.errorMsg}</div>
                    }
                    <div style={{ textAlign: "center" }}>
                        <button type="submit" className="loginButton">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginPage