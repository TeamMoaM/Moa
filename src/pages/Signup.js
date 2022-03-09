import React,{useEffect, useState} from 'react';
import {auth,provider,db} from '../firebase-config';
import {updateProfile,createUserWithEmailAndPassword,onAuthStateChanged,signInWithCredential,signInWithPopup} from "firebase/auth";
import {useNavigate} from 'react-router-dom';
import { setDoc,doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import '../style/signup.css';
function Signup({setIsAuth,setList}) {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerCheckPassword, setRegisterCheckPassword] = useState("");
    // const [registerCheckBool, setRegisterCheckBool] = useState(false);
    // const [registerCheckPasswordNone,setRegisterCheckPasswordNone] = useState(true);
    const [registerNickname,setRegisterNickname] = useState("");
    const [nicknameCheckBool,setNicknameCheckBool] = useState(true);
    const [emailCheckBool,setEmailCheckBool] = useState(true);
    let navigate = useNavigate();
    setList(1);
    const register = async () => {
        try {
          const docSnap = await getDoc(doc(db,'userInfo','nicknames'));
          var userNicknames = docSnap.data().nicknames;
          if(userNicknames.includes(registerNickname)){
            setNicknameCheckBool(false);
            return 0;
          }
          setNicknameCheckBool(true);
          await updateDoc(doc(db,'userInfo','nicknames'),{nicknames:arrayUnion(registerNickname)});
          const user = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword,
          );
          
        await setDoc(doc(db,'userInfo',auth.currentUser.uid),{name:registerNickname,tier:"bronze",email:auth.currentUser.email,introduction:"저에 대한 한 줄 소개입니다.",link:"default.instagram.com/lorem"});
        await updateProfile(auth.currentUser,{
            displayName: registerNickname
            }).then(function() {
            console.log(registerNickname);
            }).catch((error)=>{console.log(error);})
          setIsAuth(true);
          navigate("/");
        } catch (error) {
        console.log(error.message);
          if(error.message=='Firebase: Error (auth/invalid-email).'){
              setEmailCheckBool(false);
              await updateDoc(doc(db,'userInfo','nicknames'),{nicknames:arrayRemove(registerNickname)});
          }
        }
        
    };
    useEffect(()=>{
        setNicknameCheckBool(true);
    },[registerNickname])
    return (
        <div className="signUpBox">
            <div className="signUp">
                <div className="signupTexts">
                    <div className="signupBigTitle"><h2 className="title150">반갑습니다!</h2></div>
                    <div className="signupSmallTitle"><h3 className="body150">MOA에서 당신의 서비스를 테스트하고<br/> 사람들과 함께 의견을 공유해보세요.</h3></div>
                </div>
                <div className="signupInputs">
                    <div className="emailIDBox">
                        <div className="idText"><h3 className="subhead100">이메일</h3></div>
                        <input className="loginID" placeholder="예:moa@naver.com" onChange={(event) => {setRegisterEmail(event.target.value);}}></input>
                        {emailCheckBool?(<></>):(<div className="registerPasswordFalse">사용할 수 없는 이메일입니다.</div>)}
                    </div>
                    <div className="nicknameBox">
                        <div className="idText"><h3 className="subhead100">닉네임</h3></div>
                        <input className="loginID" placeholder="예 : 파란하늘" onChange={(event) => {setRegisterNickname(event.target.value);}}></input>
                        {(nicknameCheckBool?(<></>):(<div className="registerPasswordFalse">사용할 수 없는 닉네임입니다.</div>))}
                    </div>
                    <div className="passwordBox">
                        <div className="idText"><h3 className="subhead100">비밀번호</h3></div>
                        <input className="loginPW" type="password" placeholder="영문,숫자,특수문자 조합 6자 이상" onChange={(event) => {setRegisterPassword(event.target.value);}}></input>
                    </div>
                </div>
                <button onClick={()=>{register()}}className="loginloginButton"><h3 className="subhead100">회원가입하고 시작하기</h3></button>
            </div>
        </div>
        
    );
}

export default Signup;