import React, { useState, useEffect } from 'react';
import { query, getDoc, collection, deleteDoc, doc, addDoc,onSnapshot} from "firebase/firestore";
import {db,auth} from '../firebase-config';
import {Link} from 'react-router-dom';
import {onAuthStateChanged} from 'firebase/auth';
import "../style/myPage.css";
function MyPage({setList,user}){
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
        <div className='myPageWrap'>
            <div className='contentsWrap'>
                <div className='userCard'><h4 className='title100'>{users&&users.displayName}</h4></div>
                <div className='infoCard'><Link to='/MyPage/edit'>추가</Link></div>
                {postList && postList.map((post)=>{
                    return(
                        <div>
                            {post.company.name}
                            {post.company.time.timeEndYear}
                            {tier&&tier.tier}
                        </div>)
                })}
            </div>
        </div>
    )
}
export default MyPage;