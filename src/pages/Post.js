import { doc } from 'firebase/firestore';
import React, { useEffect,useState } from 'react';
import {Link, useParams, useResolvedPath} from 'react-router-dom';
import {db} from '../firebase-config';
import {getDoc} from 'firebase/firestore';
import Bookmark from '../icons/bookmark.svg'
import "../style/post.css";
import PostServiceIntro from './PostServiceIntro';
import PostReview from './PostReview';
function Post({user}) {
    const [post, setPost] = useState([]);
    const {roomId} = useParams();
    useEffect(()=>{
        getDoc(doc(db, "posts", roomId)).then(docSnap => {
            setPost({...docSnap.data()});
        })
    },false);
    const link = '/post/reviewpost/'+roomId;
   const styles = {backgroundImage: "url(" + post.imageUrl +")", backgroundSize: '142px',backgroundPosition: 'center',backgroundRepeat: 'no-repeat'};
    const [tabList,setTabList] = useState(1);
    return (
        <>
        <div className='postWrap'>
          <div className="postWrapBox">
            <div className="postBlank"></div>
            <div className='serviceInfo'>
                <img className='serviceImgWrap' src={post&&post.imageURL}></img>
                <div className='serviceCon'>
                    <h4 className='title100'>{post&&post.title}</h4>
                    <div className='userInfo'>
                        <div className='userImg'></div><h4 className='body100'>{post.author&&post.author.name}</h4><h2 className='caption100'>company namy</h2>{/* 회사 이름은 회원가입 페이지 이후 작업 시작 */}
                    </div>
                    <div className='serviceEx'>
                        <h2 className='body150'>{post&&post.content}</h2>
                    </div>
                </div>
            </div>
            <div className='scrapReview'>
                <button className='scrap'><div className='scrapFrame'><img className='bookmarkImage' src={Bookmark}/><h3 className='subhead100'>스크랩 하기</h3></div></button>
                <Link to={link} className='reviewButton'><h3 className='subhead100'>리뷰 작성하기</h3></Link>
            </div>
          </div>
            {tabList?
                <list className='tabList'>
                    <ul className='tabListItem'><button onClick={()=>{setTabList(1)}}className='serviceIntro1'><h3 className='subhead100'>서비스 소개</h3></button></ul>
                    <ul className='tabListItem'><button onClick={()=>{setTabList(0)}}className='serviceIntro0'><h3 className='body100'>리뷰</h3></button></ul>
                </list>
            :
                 <list className='tabList'>
                    <ul className='tabListItem'><button onClick={()=>{setTabList(1)}}className='serviceIntro0'><h3 className='body100'>서비스 소개</h3></button></ul>
                    <ul className='tabListItem'><button onClick={()=>{setTabList(0)}}className='serviceIntro1'><h3 className='subhead100'>리뷰</h3></button></ul>
                </list>
            }
            <div className='divider'></div>
        </div>
        {tabList?<PostServiceIntro/>:<PostReview/>}
        </>
    )
        
}

export default Post;