import { createContext, useState } from "react"

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [currentuser, SetCurrentuser] = useState(JSON.parse(localStorage.getItem("currentuser")) || {})

    const providedValue = { currentuser, SetCurrentuser }

    return (
        <AuthContext.Provider value={providedValue}>
            {children}
        </AuthContext.Provider >
    )
}

export default AuthProvider;