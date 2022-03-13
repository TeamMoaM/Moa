import { updateDoc,doc } from 'firebase/firestore';
import React, { useState } from 'react';
import {auth,db} from '../firebase-config';
import {updateEmail, updateProfile,EmailAuthProvider,reauthenticateWithCredential} from 'firebase/auth';


function MyPageInfoEdit(props) {
    const [nickname,setNickname] = useState('');
    const [companyName,setCompanyName] = useState('');
    // const [email,setEmail] = useState('');
    // const [currentPassword,setCurrentPassword] = useState('');
    // const [futurePassword,setFuturePassword] = useState('');
    const submit = async() => {
        //nickname
        await updateProfile(auth.currentUser, {
            displayName: nickname
          }).then(() => {
            console.log("displayName send success!");
          }).catch((error) => {
            console.log(error);//나중에 꼭 지우기!!
        });
        await updateDoc(doc(db,'userInfo',auth.currentUser.uid),{name:nickname});
        //company name
        await updateDoc(doc(db,'userInfo',auth.currentUser.uid),{company:companyName});
        //email
        // const credential = EmailAuthProvider.credential(
        //     auth.currentUser.email,
        // )
        // const result = await reauthenticateWithCredential(
        //     auth.currentUser, 
        //     credential
        // )
        // await updateEmail(auth.currentUser,email).then(()=>{console.log("emailUpdated")}).catch((error)=>{console.log(error)});
        // await updateDoc(doc(db,'userInfo',auth.currentUser.uid),{email:email});
        
        //email,password는 현재 문제가 많음(기획에 얘기하기)
        // 1. 우리가 기존 password를 저장하지 않는다
        // 2. google로 로그인 한 경우 password가 없다.

    }
    return (
        <div>
            닉네임
            <input onChange={(e)=>{setNickname(e.target.value)}}/>
            회사명
            <input onChange={(e)=>{setCompanyName(e.target.value)}}/>
            {/* 이메일
            <input onChange={(e)=>{setEmail(e.target.value)}}/> */}
            {/* 현재 비밀번호
            <input onChange={(e)=>{setNickname(e.target.value)}}/>
            변경할 비밀번호
            <input onChange={(e)=>{setNickname(e.target.value)}}/> */}
            <button onClick={()=>{submit()}}>수정 완료</button>
        </div>
    );
}

export default MyPageInfoEdit;