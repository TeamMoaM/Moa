import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getDoc,doc} from 'firebase/firestore';
import {db} from '../firebase-config';
import Bookmark from '../icons/bookmark.svg';
import '../style/reviewpost.css';
function ReviewPost(props) {
    const {roomId} = useParams();
    const [post, setPost] = useState([]);
    const styles = {backgroundImage: "url(" + post.imageUrl +")", backgroundSize: '142px',backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}
    useEffect(()=>{
        getDoc(doc(db, "posts", roomId)).then(docSnap => {
            setPost({title:docSnap.data().title,content:docSnap.data().content,imageUrl:docSnap.data().imageURL,id:docSnap.data().id, authorName:docSnap.data().author.name,authorId:docSnap.data().author.id})
        })
    },false);
    return (
        <div className='postWrap'>
            <div className='serviceInfo'>
                <div className='serviceImgWrap' style={styles}></div>
                <div className='serviceCon'>
                    <h4 className='title100'>{post.title}</h4>
                    <div className='userInfo'>
                        <div className='userImg'></div><h4 className='body100'>{post.authorName}</h4><h2 className='caption100'>Company name</h2>{/* 회사 이름은 회원가입 페이지 이후 작업 시작 */}
                    </div>
                    <div className='serviceEx'>
                        <h2 className='body150'>{post.content}</h2>
                    </div>
                </div>
            </div>
            <div className='scrapReview'>
                <button className='scrap'><div className='scrapFrame'><img className='bookmarkImage' src={Bookmark}/><h3 className='subhead100'>스크랩 하기</h3></div></button>
            </div>
                 <list className='tabList'>
                    <ul className='tabListItem'><button onClick={()=>{alert("글을 작성한 후 리뷰 등록하기 버튼을 눌러주세요!");}}className='serviceIntro0'><h3 className='body100'>서비스 소개</h3></button></ul>
                    <ul className='tabListItem'><button className='serviceIntro1'><h3 className='subhead100'>리뷰</h3></button></ul>
                </list>
            
            <div className='divider'></div>
            <div>
                <input className="reviewPostInput"></input>
            </div>

        </div>
    );
}

export default ReviewPost;