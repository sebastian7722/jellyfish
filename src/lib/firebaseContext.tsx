import { createContext, ReactChild, useContext, useState } from "react";
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
const provider = new GoogleAuthProvider();
const auth = getAuth();

interface ContextProps {
    userData?: object;
    isSignedIn?: boolean;
    checkUser?: () => void;
    signIn?: () => void;
    logout?: () => void;
}

const AuthContext = createContext<ContextProps>({});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider( props: {children: ReactChild} ) {

    const { children } = props;
    
    const [userData, setUserData] = useState({})

    const [isSignedIn, setIsSignedIn] = useState(false);

    const value = {
        userData,
        isSignedIn,
        signIn,
        logout,
        checkUser
    }
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

    function checkUser() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsSignedIn(true);
                setUserData(user);
            } else {
                setIsSignedIn(false)
                setUserData({});
            }
        });
    }

    function signIn() {
        signInWithPopup(auth, provider)
        .then((result) => {
         console.log("Sucessfuly logged in! 😄")
        }).catch((e) => {
         const errorCode = e.code;
         const errorMessage = e.message;
         const email = e.email;
         const credential = GoogleAuthProvider.credentialFromError(e);
         console.log("💩 Doesnt work! Error: ", errorCode, errorMessage, email, credential);
        });
    }
    
    function logout() {
        signOut(auth).then(() => {
            console.log("sign out sucessful 😄")
          }).catch((e) => {
            console.log("💩 Doesnt work! Error: ", e)
          });
    }
}
