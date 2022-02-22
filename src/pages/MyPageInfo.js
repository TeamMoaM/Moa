import React, { useState, useEffect } from 'react';
import { query, getDoc, collection, deleteDoc, doc, addDoc,onSnapshot} from "firebase/firestore";
import {db,auth} from '../firebase-config';
import {Link} from 'react-router-dom';
import {onAuthStateChanged} from 'firebase/auth';
import "../style/myPageInfo.css";
import MyPageEdit from './MyPageEdit';
import MyPageEduEdit from './myPageEduEdit';
function MyPageInfo({setList,user}){
    const [add, setAdd] = useState(0);
    const [eduAdd, setEduAdd] = useState(0);
    const [users,setUsers] = useState({});
    const [postList,setCareerList]= useState([]);
    const [eduList,setEduList]= useState([]);
    setList(1);
    onAuthStateChanged(auth,(currentUser)=>{
        setUsers(currentUser);
    })
    
    useEffect(()=>{
        if(users.displayName){
            const postRef = query(collection(doc(collection(db,'userInfo'),users.uid),'career'));
            onSnapshot(postRef,(snapshot)=>{
                setCareerList(snapshot.docs.map((doc)=>({
                    ...doc.data(),id:doc.id
                })));
            })
            const educationRef = query(collection(doc(collection(db,'userInfo'),users.uid),'education'));
            onSnapshot(educationRef,(snapshot)=>{
                setEduList(snapshot.docs.map((doc)=>({
                    ...doc.data(),id:doc.id
                })));
            })
        }
    },[users])

    return(
        <div className='infoCard'>
            <h3 className='body100'>경력</h3>
            {!add?
                <button className='add' onClick={()=>{setAdd(1)}}>추가(경력)</button>
            :
                <><button className='add' onClick={()=>{setAdd(0)}}>취소</button>
                <MyPageEdit/></>
            }
            {postList && postList.map((post)=>{
                return(
                    <div>
                        <h1 className='subhead100'>{post.company.name}</h1>
                        <h4 className='body100'>{post.company.time.timeStartYear}년 {post.company.time.timeStartMonth}월 ~ {post.company.time.timeEndYear}년 {post.company.time.timeEndMonth}월</h4>
                    </div>
                )
            })}
            {!eduAdd?
                <button className='add' onClick={()=>{setEduAdd(1)}}>추가(학력)</button>
            :
                <><button className='add' onClick={()=>{setEduAdd(0)}}>취소</button>
                <MyPageEduEdit/></>
            }
            <h3 className='body100'>학력</h3>
            {eduList && eduList.map((post)=>{
                return(
                    <div>
                        <h1 className='subhead100'>{post.school.name}</h1>
                        <h2 className='body100'>{post.school.major}</h2>
                        <h4 className='body100'>{post.school.time.timeStartYear}년 {post.school.time.timeStartMonth}월 ~ {post.school.time.timeEndYear}년 {post.school.time.timeEndMonth}월</h4>
                    </div>
                )
            })}
        </div>
    )
}
export default MyPageInfo;