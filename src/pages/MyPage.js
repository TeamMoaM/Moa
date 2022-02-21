import React, { useState, useEffect } from 'react';
import { query, getDoc, collection, deleteDoc, doc, addDoc,onSnapshot} from "firebase/firestore";
import {db,auth} from '../firebase-config';
import {Link} from 'react-router-dom';
import {onAuthStateChanged} from 'firebase/auth';
import "../style/myPage.css";
import avatarImage from '../icons/avatar.svg';
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
                <div className='userCard'>
                    <img className='userAvatar' src={avatarImage}/>
                    <h4 className='title100'>{users&&users.displayName}</h4>
                    <div className='buttonList'>
                        <button className='gray4Button'><h3 className='subhead100'>정보 수정</h3></button>
                        <button className='gray4Button'><h3 className='subhead100'>계정 설정</h3></button>
                    </div>
                    <h1 className='subhead100'>{tier&&tier.tier}</h1>
                </div>
                <div className='leftArea'>
                    <div className='myPageTab'>Tab Lists</div>
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
                </div>
            </div>
        </div>
    )
}
export default MyPage;