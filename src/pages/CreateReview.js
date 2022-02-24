import React,{useState,useEffect} from 'react';
import {useParams,Link} from 'react-router-dom';
import {getDoc,doc,setDoc,arrayUnion} from 'firebase/firestore';
import {db} from '../firebase-config';
import Bookmark from '../icons/bookmark.svg';
import '../style/reviewpost.css';
import Editor from './Editor'
function CreateReview({user}) {
    const {roomId} = useParams();
    const [post, setPost] = useState([]);
    const [desc, setDesc] = useState('');
    useEffect(()=>{
        getDoc(doc(db, "posts", roomId)).then(docSnap => {
            setPost({...docSnap.data()})
        })
    },false);
    const scrap = () =>{   
        if(post.id&&user.uid){
            setDoc(doc(db,'userInfo',user.uid),{scrap:arrayUnion(post.id)},{merge:true});
            alert("scrap에 성공하셨습니다!");
        }
    }
    function onEditorChange(value) {
        setDesc(value);
    }

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
                        <button onClick={()=>scrap()}className='scrap'><div className='scrapFrame'><img className='bookmarkImage' src={Bookmark}/><h3 className='subhead100'>스크랩 하기</h3></div></button>
                        <button onClick={()=>{console.log("review작성완료!");}} className="reviewButton"><h3 className='subhead100'>리뷰 등록하기</h3></button>
                    </div>
                </div>
                <list className='tabList'>
                    <ul className='tabListItem'><button onClick={()=>{alert("리뷰를 작성한 후에 이동하실 수 있습니다.")}}className='serviceIntro0'><h3 className='body100'>서비스 소개</h3></button></ul>
                    <ul className='tabListItem'><button className='serviceIntro1'><h3 className='subhead100'>리뷰</h3></button></ul>
                </list>
                <div className='divider'></div>
            </div>
            <Editor value={desc} onChange={onEditorChange}></Editor>
        </>
    );
}


export default CreateReview;