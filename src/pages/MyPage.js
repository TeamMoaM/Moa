import React, { useState, useEffect } from 'react';
import { query, getDoc, collection, deleteDoc, doc, addDoc,onSnapshot} from "firebase/firestore";
import {db,auth} from '../firebase-config';
import {Link} from 'react-router-dom';
import {onAuthStateChanged} from 'firebase/auth';
import "../style/myPage.css";
import avatarImage from '../icons/avatar.svg';
import MyPageInfo from './MyPageInfo';
import MyPosts from './MyPosts';
import MyReviews from './MyReviews';
import MyCommPosts from './MyCommPosts';
import MyCommComments from './MyCommComments'
function MyPage({setList,user}){
    const [myPageList, setMyPageList] = useState(1);
    const [users,setUsers] = useState({});
    const [tier,setTier] = useState();
    setList(1);
    onAuthStateChanged(auth,(currentUser)=>{
        setUsers(currentUser);
    })
    
    useEffect(()=>{
        if(users.displayName){
            getDoc(doc(db,'userInfo',users.uid)).then((docSnap)=>{
                if(docSnap.exists()){
                    setTier(docSnap.data());
                }
            })
            
        }
    },[users])

    let myPageCard;
    if(myPageList===1){
        myPageCard = <MyPageInfo setList={setList}user={user}/>;
    }
    else if(myPageList===2){
        myPageCard = <MyPosts/>;
    }
    else if(myPageList===3){
        myPageCard = <MyReviews/>;
    }
    else if (myPageList===4){
        myPageCard = <MyCommPosts/>;
    }    
    

    return(
        <div className='myPageWrap'>
            <div className='contentsWrap'>
                <div className='userCard'>
                    <div className='userInfo'>
                        <img className='userAvatar' alt='profile' src={avatarImage}/>
                        <h4 className='userName title100'>{users&&users.displayName}</h4>
                    </div>                    
                    <div className='buttonList'>
                        <button className='gray4Button'><h3 className='subhead100'>정보 수정</h3></button>
                        <button className='gray4Button'><h3 className='subhead100'>계정 설정</h3></button>
                    </div>
                    <div className='tier'>
                        <h1 className='subhead100'>{tier&&tier.tier}</h1>
                    </div>
                </div>
                <div className='rightArea'>
                    <div className='myPageTab'>
                        <list className='tabList'>
                            <ul className='tabListItem item1'><button onClick={()=>{setMyPageList(1)}}className={myPageList===1?'selectedTab':''}><h3 className={myPageList===1?'subhead100':'body100'}>정보</h3></button></ul>
                            <ul className='tabListItem item2'><button onClick={()=>{setMyPageList(2)}}className={myPageList===2?'selectedTab':''}><h3 className={myPageList===2?'subhead100':'body100'}>베타테스트 게시글</h3></button></ul>
                            <ul className='tabListItem item3'><button onClick={()=>{setMyPageList(3)}}className={myPageList===3?'selectedTab':''}><h3 className={myPageList===3?'subhead100':'body100'}>베타테스트 리뷰</h3></button></ul>
                            <ul className='tabListItem item4'><button onClick={()=>{setMyPageList(4)}}className={myPageList===4?'selectedTab':''}><h3 className={myPageList===4?'subhead100':'body100'}>커뮤니티 게시글</h3></button></ul>
                        </list>
                    </div>
                    <div className='divider'></div>
                    <div className='myPageCard'>
                        {myPageCard}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MyPage;