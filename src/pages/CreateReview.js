import React,{useState,useEffect} from 'react';
import {useParams,Link} from 'react-router-dom';
import {getDoc,doc,addDoc,setDoc,updateDoc,arrayRemove,arrayUnion} from 'firebase/firestore';
import {db} from '../firebase-config';
import BookmarkClicked from '../icons/bookmarkClicked.svg';
import Bookmark from '../icons/bookmark.svg';
import defaultprofileImg from '../img/communityImg/defaultprofile.svg';
import '../style/reviewpost.css';
import Editor from './Editor'
import UserInfo from '../components/UserInfo';
function CreateReview({user,setList}) {
    const {roomId} = useParams();
    const [post, setPost] = useState([]);
    const [desc, setDesc] = useState('');
    const [scrapBool,setScrapBool] = useState(0);
    const [title,setTitle] = useState("");
    setList(2);
    useEffect(()=>{
        getDoc(doc(db, "posts", roomId)).then(docSnap => {
            setPost({...docSnap.data()})
        })
    },false);
    function onEditorChange(value) {
        setDesc(value);
    }
    useEffect(()=>{
        if(user.uid){
            getDoc(doc(db,'userInfo',user.uid)).then(docSnap => {
                if(docSnap.exists()){
                    const scrap = docSnap.data().scrap;
                    console.log("success:",scrap);
                    if(scrap.includes(roomId)){
                        console.log("include true!");
                        setScrapBool(true);
                    }
                }
            })
        }
    },[scrapBool,post])
    const scrap = () =>{    
        if(user.uid){
            setScrapBool(true);
            setDoc(doc(db,'userInfo',user.uid),{scrap:arrayUnion(roomId)},{merge:true});
        }
    }
    const unscrap = () =>{    
        if(user.uid){
            setScrapBool(false);
            updateDoc(doc(db,'userInfo',user.uid),{scrap:arrayRemove(roomId)});
        }
    }
    const uploadReview = async () => {
        if(title.length==0){
            alert("제목을 입력해주세요!");
            return 0
        }
        else if(desc.length==0){
            alert("내용을 입력해주세요!");
            return 0
        }
        const reviewCountRef = doc(db,'posts',roomId);
        let data = await getDoc(reviewCountRef);
        let reviewCount = await data.data().reviewCount;
        reviewCount = reviewCount+1;
        await updateDoc(reviewCountRef,{reviewCount:reviewCount});
        reviewCount = String(reviewCount);
        const reviewRef = doc(db,"posts",roomId,"review",reviewCount);
        await setDoc(reviewRef,{reviewPeople:user.uid,reviewTitle:title,reviewContent:desc,time:new Date().getTime()/1000,like:[],likeCount:0});
        window.location.href=`/post/${roomId}`;
    };

    return (
        <div className="wrap">
            <div className='postWrap'>
                <div className="postWrapBox">
                    <div className='serviceInfo'>
                        <img className='serviceImgWrap' src={post&&post.imageURL}></img>
                        <div className='postCon'>
                            <div className="postTitle"><h4 className='title100'>{post&&post.title}</h4></div>
                            {post.author&&<UserInfo uid={post.author.id}/>}
                            <div className='postIntro'>
                                <h2 className='body150'>{post&&post.content}</h2>
                            </div>
                        </div>
                    </div>
                    <div className='scrapReview'>
                        {scrapBool?<button style={{backgroundColor:"#E4E4FF"}}onClick={()=>unscrap()}className='scrap'><div className="scrapFrame"><img className='bookmarkImage' src={BookmarkClicked}/><h3 className='subhead100'>스크랩 완료</h3></div></button>:<button onClick={()=>scrap()}className='scrap'><div className='scrapFrame'><img className='bookmarkImage' src={Bookmark}/><h3 className='subhead100'>스크랩 하기</h3></div></button>}
                        <button onClick={()=>{uploadReview();}} className="reviewButton"><h3 className='subhead100'>리뷰 등록하기</h3></button>
                    </div>
                </div>
                <list className='tabList'>
                    <ul className='tabListItem'><button onClick={()=>{alert("리뷰를 작성한 후에 이동하실 수 있습니다.")}}className='serviceIntro0'><h3 className='body100'>서비스 소개</h3></button></ul>
                    <ul className='tabListItem'><button className='serviceIntro1'><h3 className='subhead100'>리뷰</h3></button></ul>
                </list>
                <div className='divider'></div>
            </div>
            <div className="createReviewTitleBox">
                <input className="createReviewTitleInput" placeholder="리뷰 제목을 입력하세요." onChange={(event)=>{setTitle(event.target.value)}}/>
                {user&&<UserInfo uid={user.uid}/>}
            </div>
            
            <Editor value={desc} onChange={onEditorChange}></Editor>
                

            
        </div>
    );
}


export default CreateReview;