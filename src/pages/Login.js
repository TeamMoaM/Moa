import React,{useState} from "react";
import {signInWithPopup,signInWithEmailAndPassword} from "firebase/auth";
import {auth,provider,db} from '../firebase-config';
import {setDoc,doc} from 'firebase/firestore';
import { useNavigate,Link } from "react-router-dom";
import logoImg from '../img/login/MOA.svg';
import '../style/login.css';
function Login({setIsAuth,setList}){
    let navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginSuccess,setLoginSuccess] = useState(true);
    setList(1);
    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
            );
            setIsAuth(true);
            navigate("/");
            
        } catch (error) {
            setLoginSuccess(false);
        }   
    }

    const signInWithGoogle = async () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth",true);
            setDoc(doc(db,'userInfo',auth.currentUser.uid),{name:auth.currentUser.displayName,tier:"bronze",email:auth.currentUser.email,introduction:"저에 대한 한 줄 소개입니다.",link:"default.instagram.com/lore",scrapCommunity:[]});
            setIsAuth(true);
            navigate("/");
        })
    }
    return(
        <div className="login">
            <div className="loginTexts">
                <img src={logoImg}/>
                <div className="loginText"><h2 className="subhead100">당신을 위한 베타테스트 플랫폼</h2></div>
            </div>
            <div className="loginInputs">
                <div className="emailIDBox">
                    <div className="idText"><h3 className="subhead100">이메일</h3></div>
                    <input className="loginID" placeholder="예:moa@naver.com" onChange={(event) => {setLoginEmail(event.target.value);}}></input>
                </div>
                <div className="passwordBox">
                    <div className="idText"><h3 className="subhead100">비밀번호</h3></div>
                    <input className="loginPW" type="password" placeholder="" onChange={(event) => {setLoginPassword(event.target.value);}}></input>
                </div>
                {loginSuccess?(<></>):(<div className="registerPasswordFalse">등록되지 않은 이메일이거나, 비밀번호가 일치하지 않아요.</div>)}
            </div>
            <div className="loginFindandSignup">
                <Link to='/Signup' className="loginFindandSignupText"><h3 className="subhead100">회원가입</h3></Link>
                <div className="loginBreakLine">|</div>
                <Link to='' className="loginFindandSignupText"><h3 className="subhead100">아이디 찾기</h3></Link>
                <div className="loginBreakLine" >|</div>
                <Link to=''className="loginFindandSignupText"><h3 className="subhead100">비밀번호 찾기</h3></Link>
            </div>
            <div className="loginButtons">
                <button onClick={()=>{login()}}className="loginloginButton"><h3 className="subhead100">로그인 하고 시작하기</h3></button>
                <button className="googleLoginButton" onClick={signInWithGoogle}>
                    <img className="googleImage" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4="/>
                    <h3 className="subhead100">구글 로그인</h3>
                    <img className="googleImage" />
                </button>
            </div>
            
            {/* <img className="loginBoxVector" src={image}></img> */}
        </div>
    )
}
export default Login;