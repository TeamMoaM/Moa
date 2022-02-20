import React from "react";
import {signInWithPopup} from "firebase/auth";
import {auth,provider} from '../firebase-config';
import { useNavigate } from "react-router-dom";
function Login({setIsAuth}){
    let navigate = useNavigate();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth",true);
            setIsAuth(true);
            navigate("/");
        })
        
    }
    return(
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
            Sign in with Google
        </button>
    )
}
export default Login;