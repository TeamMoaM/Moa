import React from "react";
function Login({setIsAuth}){
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth",true);
            setIsAuth(true)
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