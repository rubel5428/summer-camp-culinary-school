import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile  } from "firebase/auth";
import axios from "axios";


export const AuthContext = createContext(null)

const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider;


    const creatUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
     }
     const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
     }
     const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
     }
     const logOut = () => {
        setLoading(true)
        return signOut(auth)
     }
     const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
           displayName: name,
           photoURL: photo,

        })
           
     }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged (auth, (currentUser) => {
           setUser(currentUser)
           if(currentUser){
            axios.post('https://master-coocking-assignment-server-rubel5428.vercel.app/jwt_token', {email: currentUser.email})
            .then(data =>{
                localStorage.setItem('mc-school-access-token', data.data.token)
                setLoading(false);
            })
        }
        else{
           localStorage.removeItem('mc-school-access-token')
        }
        })
        return () => {
           return unSubscribe()
        }
     }, [])

    const authInfo={
        user,
        loading,
        creatUser,
        signInWithGoogle,
        signIn,
        logOut,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
           {children} 
        </AuthContext.Provider>
    );
};

export default AuthProvider;