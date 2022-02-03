import { doc } from 'firebase/firestore';
import React, { useEffect,useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import {db} from '../firebase-config';
import {getDoc} from 'firebase/firestore';
import Bookmark from '../icons/bookmark.svg'

function Post() {
    const [post, setPost] = useState([]);
    const {roomId} = useParams();
    useEffect(()=>{
        getDoc(doc(db, "posts", roomId)).then(docSnap => {
            console.log(docSnap.data());
            console.log(docSnap.data().timestamp);
            setPost({title:docSnap.data().title,content:docSnap.data().content,imageUrl:docSnap.data().imageURL,id:docSnap.data().id})
        })
    },false);

   const styles = {backgroundImage: "url(" + post.imageUrl +")", backgroundSize: '142px',backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}

    return (
        // 레퍼런스로 쓰는 법 써놓은거임 참고하셈
        <div>
            <div className='serviceInfo'>
                <div className='serviceImgWrap' style={styles}></div>
                <div className='serviceCon'>
                    <h4 className='title100'>{post.title}</h4>
                    <div className='userInfo'>
                        <div className='userImg'></div><h4 className='body100'>user name</h4><h2 className='caption100'>Company name</h2>
                    </div>
                    <div className='serviceEx'>
                        <h2 className='body150'>{post.content}</h2>
                    </div>
                </div>
            </div>
            <div className='scrapReview'>
                <button className='scrap'><div className='scrapFrame'><img className='bookmarkImage' src={Bookmark}/>스크랩 하기</div></button>
                <button className='reviewButton'>리뷰 작성하기</button>
            </div>
            <list className='tabList'>
                <ul className='tabListItem'><Link to='' className='serviceIntro'><h3 className='subhead100'>서비스 소개</h3></Link></ul>
                <ul className='tabListItem'><Link to='' className='review'><h3 className='subhead100'>리뷰</h3></Link></ul>
            </list>
            <div className='divider'></div>
            {/* {roomId}
            <br/>
            {post.title}
            <br></br>
            {post.content}
            <br/>
            <img src={post.imageUrl} alt={post.imageUrl}/>
            <br/>
            {post.id} */}

        </div>
    );
}

export default Post;