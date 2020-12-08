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
    const isLoggedIn = () => {
        db.collection("logged_user").onSnapshot(snapshot => {
            const user = snapshot.docs.map(doc => (doc.data()))[0].username;
            if (user && user.length > 0)
                setCurrentUser(user)
        })
        return currentUser != null;
    }

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

