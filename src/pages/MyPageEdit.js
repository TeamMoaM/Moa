import React, { useState } from 'react';
import { getDocs, collection, deleteDoc, doc, addDoc,setDoc} from "firebase/firestore";
import {db,auth} from '../firebase-config';
function MyPageEdit({user}){
    const [company,setCompany] = useState("");
    const [time,setTime] = useState({
        timeStartYear:0,
        timeStartMonth:0,
        timeEndYear:0,
        timeEndMonth:0
    });
    // if(user.displayName){
    //     const usersInfoCollectionRef = collection(db,'userInfo');
    //     const userDocRef = doc(usersInfoCollectionRef,user.uid);
    //     // const carrerCollectionRef = collection(userDocRef,'career');
    // }
   
    const addData = async () => {
        try {
            await setDoc(doc(db,'userInfo',user.uid),{
                career:{
                    company:{
                        name:company,
                        time:time
                    }
                }
            });
        } catch (e) {
          console.log(e);
          console.log(user.uid);
          console.log({
            company:{
                name:company,
                time:time
            }
        })
        }
    };
    const updateTimeData = e => {
        setTime({
            ...time,
            [e.target.name]: +e.target.value
        })
    }
    // const createPost = async () => {
    //     await addDoc(postsCollectionRef, {title,postText,author:{name:auth.currentUser.displayName,id:auth.currentUser.uid}});
    //     navigate("/");
    // }
    return(
        <>
            <div><h1>{user.displayName}</h1></div>
            <input className="event" placeholder="회사 이름을 입력하세요" onChange={(event)=>{setCompany(event.target.value)}}></input>
            <input className='timeStartYear' name='timeStartYear' placeholder='시작한 연도' type='number' min='1900' max='2100' onChange={updateTimeData} ></input>
            <input className='timeStartMonth' name='timeStartMonth' placeholder='시작한 달' type='number' min='1' max='12' onChange={updateTimeData} ></input>
            <input className='timeEndYear' name='timeEndYear' placeholder='끝난 연도' type='number' min='1900' max='2100' onChange={updateTimeData} ></input>
            <input className='timeEndMonth' name='timeEndMonth' placeholder='끝난 달' type='number' min='1' max='12' onChange={updateTimeData} ></input>
            <button onClick = {addData} >Button Post</button>
        </>
    )
}
export default MyPageEdit;