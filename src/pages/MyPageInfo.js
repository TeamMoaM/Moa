import React, { useState, useEffect } from 'react';
import { query, getDoc, collection, deleteDoc, doc, addDoc,onSnapshot} from "firebase/firestore";
import {db,auth} from '../firebase-config';
import {Link} from 'react-router-dom';
import {onAuthStateChanged} from 'firebase/auth';
import "../style/myPageInfo.css";
import avatarImage from '../icons/avatar.svg';
function MyPageInfo({setList,user}){
    const [myPage, setMyPage] = useState([]);
    const [users,setUsers] = useState({});
    const [postList,setCareerList]= useState([]);
    const [tier,setTier] = useState();
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
            getDoc(doc(db,'userInfo',users.uid)).then((docSnap)=>{
                if(docSnap.exists()){
                    setTier(docSnap.data());
                }
            })
            
        }
    },[users])

    return(
        <div className='infoCard'>
            <h3 className='body100'>경력</h3>
            <Link to='/MyPage/edit'>추가</Link>
            {postList && postList.map((post)=>{
                return(
                    <div>
                        <h1 className='subhead100'>{post.company.name}</h1>
                        <h4 className='body100'>{post.company.time.timeStartYear}년 {post.company.time.timeStartMonth}월 ~ {post.company.time.timeEndYear}년 {post.company.time.timeEndMonth}월</h4>
                    </div>
                )
            })}
        </div>
    )
}
export default MyPageInfo;