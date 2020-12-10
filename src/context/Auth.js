import { useContext, useState, createContext } from 'react'
import { firestore } from '../config/firebase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null)

    /* const signUpUser = ({email, password}) => {
        firestore.auth.createUserWithEmailAndPassword(email, password)
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

    const loginUser = () => {
        //TODO: Handle login functionality here
        //TODO: Store login info in localstorage (don't store password!)
        firestore.auth.signInWithPopup(firestore.githubProvider).then((result) => {
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;          
            setCurrentUser(user.email);
            initAuthListener(); // set listener for further changes
        }).catch((error) => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            let credential = error.credential;
            console.log(`error code: ${errorCode}\nerror message: ${errorMessage}\nemail: ${email}\ncredential: ${credential}`)
        });
    }

    const initAuthListener = () => {
        firestore.auth.onAuthStateChanged((user) => {
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

