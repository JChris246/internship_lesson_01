import { useContext, useState, createContext } from 'react'
import { firebase } from '../config/firebase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null)

    /* const signUpUser = ({email, password}) => {
        firebase.auth.createUserWithEmailAndPassword(email, password)
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
        firebase.auth.signInWithEmailAndPassword(email, password).then((user) => {
            setCurrentUser(user.email);
            initAuthListener(); // set listener for further changes
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode + " " + errorMessage);
        });
    }

    const initAuthListener = () => {
        firebase.auth.onAuthStateChanged((user) => {
            if (user) {
              // User is signed in.
              // user.displayName was null ... resort to email as display name
              setCurrentUser(user.email);
            } else {
              // No user is signed in.
              setCurrentUser(null);
            }
        });
    }

    const logOut = () => {
    
    }

    return (
        <AuthContext.Provider value={{ currentUser, loginUser, setCurrentUser, logOut, initAuthListener}} >
            { children}
        </AuthContext.Provider >
    )
}

