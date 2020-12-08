import { useContext, useState, createContext } from 'react'
import db from '../config/firebase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null)
    const loginUser = (data) => {
        //TODO: Handle login functionality here
        //TODO: Store login info in localstorage (don't store password!)
        setCurrentUser(data);
        db.collection("logged_user").doc("docId").update({
            username: data,
        })
    }
    const isLoggedIn = () => currentUser != null
    const logOut = () => {
        setCurrentUser(null);
        db.collection("logged_user").doc("docId").update({
            username: null,
        })
    }
    return (
        <AuthContext.Provider value={{ currentUser, loginUser, isLoggedIn, setCurrentUser, logOut}} >
            { children}
        </AuthContext.Provider >
    )
}

