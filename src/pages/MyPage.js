import React, { useState } from 'react';
import { getDocs, collection, deleteDoc, doc, addDoc} from "firebase/firestore";
import {db,auth} from '../firebase-config';
function MyPage({user}){
    const [company,setCompany] = useState("");
    const [time,setTime] = useState({
        timeStartYear:0,
        timeStartMonth:0,
        timeEndYear:0,
        timeEndMonth:0
    });
    const addData = async () => {
        try {
            await db.collection('userInfo').doc(user.uid).collection('career').add({
                company:company,
                time:{
                    company:{
                        name:company,
                        time
                    }
                }
            })
        } catch (e) {
          console.log(e);
        }
    };
    const updateTimeData = e => {
        setTime({
            ...time,
            [e.target.name]: e.target.value
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
            <input className='timeStartYear' placeholder='시작한 연도' onChange={updateTimeData} ></input>
            <input className='timeStartMonth' placeholder='시작한 달' onChange={updateTimeData} ></input>
            <input className='timeEndYear' placeholder='끝난 연도' onChange={updateTimeData} ></input>
            <input className='timeEndMonth' placeholder='끝난 달' onChange={updateTimeData} ></input>
            <button onClick = {addData} >Button Post</button>
        </>
    )
}
export default MyPage;