import { useContext, useState, createContext } from 'react'
import { firebaseObj } from '../config/firebase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null)

    /* const signUpUser = ({email, password}) => {
        firebaseObj.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            // Signed in
            setCurrentUser(user.email);
            initAuthListener(); // set listener for further changes
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode + " " + errorMessage);
        });
    } */

    const loginUser = ({email, password}) => {
        //TODO: Handle login functionality here
        //TODO: Store login info in localstorage (don't store password!)

    }

    const logOut = () => {
        firebaseObj.auth.signOut().then(() => {
            // Sign-out successful.
            setCurrentUser(null); // this effective signs out user (regardless sign in type)
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }

    return (
        <AuthContext.Provider value={{ currentUser, loginUser, setCurrentUser, logOut}} >
            { children}
        </AuthContext.Provider >
    )
}

