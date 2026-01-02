import { createContext, useState } from "react"

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [currentuser, setCurrentuser] = useState(JSON.parse(localStorage.getItem("currentuser")) || {})

    const providedValue = { currentuser, setCurrentuser }

    return (
        <AuthContext.Provider value={providedValue}>
            {children}
        </AuthContext.Provider >
    )
}

export default AuthProvider;