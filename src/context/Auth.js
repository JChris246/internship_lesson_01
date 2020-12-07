import { useContext, useState, createContext } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null)
    const loginUser = (data) => {
        //TODO: Handle login functionality here
        //TODO: Store login info in localstorage (don't store password!)
        setCurrentUser(data);
        localStorage.setItem("user", data);
    }
    const isLoggedIn = () => localStorage.getItem("user");
    return (
        <AuthContext.Provider value={{ currentUser, loginUser, isLoggedIn}} >
            { children}
        </AuthContext.Provider >
    )
}

