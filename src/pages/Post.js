import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect,useState ,useRef} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {setPersistence,browserSessionPersistence,onAuthStateChanged} from 'firebase/auth';
import {db,auth} from '../firebase-config';
import {getDoc,updateDoc,arrayUnion,arrayRemove} from 'firebase/firestore';
import Bookmark from '../icons/bookmark.svg';
import BookmarkClicked from '../icons/bookmarkClicked.svg';
import "../style/post.css";
import PostServiceIntro from './PostServiceIntro';
import PostReview from './PostReview';
import Popup from 'reactjs-popup';
import UserInfo from '../components/UserInfo';
import defaultprofileImg from '../img/communityImg/defaultprofile.svg';
import 'reactjs-popup/dist/index.css';
function Post({isAuth,user,setList}) {
    const [post, setPost] = useState([]);
    const {roomId} = useParams();
    const [position,setPosition] = useState(0);
    const popHeader = useRef(null);
    const [scrapBool,setScrapBool] = useState(0);
    var navigate = useNavigate();
    setList(2);
    setPersistence(auth, browserSessionPersistence).then(()=>{console.log("browser session success")});
    onAuthStateChanged(auth,(currentUser)=>{

    })
    useEffect(()=>{
        getDoc(doc(db, "posts", roomId)).then(docSnap => {
            setPost({...docSnap.data(),id:docSnap.id});
        })
    },false);
    function onScroll(){
        setPosition(window.scrollY);
    }
    useEffect(()=>{
        window.addEventListener("scroll",onScroll);
        return () => {
            window.removeEventListener("scroll",onScroll);
        }
    })
    useEffect(()=>{
        if(position>=214){
            popHeader.current.style.top="0px";
        }
        else{
            popHeader.current.style.top="-248px";
        }
    },[position])
    // if(!isAuth){
    //     window.location.href='/login';
    // }
    
    const link = '/post/createreview/'+roomId;
    const [tabList,setTabList] = useState(1);
    useEffect(()=>{
        if(user.uid&&post.id){
            getDoc(doc(db,'userInfo',user.uid)).then(docSnap => {
                if(docSnap.exists()){
                    const scrap = docSnap.data().scrapPost;
                    console.log("success:",scrap);
                    if(scrap.includes(post.id)){
                        console.log("include true!");
                        setScrapBool(true);
                    }
                }
            })
        }
        
    },[scrapBool,post])
    const scrap = () =>{
        if(isAuth){
            if(post.id&&user.uid){
                setScrapBool(true);
                setDoc(doc(db,'userInfo',user.uid),{scrap:arrayUnion(post.id)},{merge:true});
            }
        }    
        else{
            navigate('/login');
        }
        
    }
    const unscrap = () =>{    
        if(post.id&&user.uid){
            setScrapBool(false);
            updateDoc(doc(db,'userInfo',user.uid),{scrap:arrayRemove(post.id)});
        }
    }

    return (
        <div className="wrap">
        <div ref={popHeader}className="popHeader">
            <div className='postWrap2'>
                <div className='scrapReview2'>
                    {scrapBool?<button style={{backgroundColor:"#E4E4FF"}}onClick={()=>unscrap()}className='scrap2'><div className="scrapFrame"><img className='bookmarkImage' src={BookmarkClicked}/><h3 className='subhead100'>스크랩 완료</h3></div></button>:<button onClick={()=>scrap()}className='scrap2'><div className='scrapFrame'><img className='bookmarkImage' src={Bookmark}/><h3 className='subhead100'>스크랩 하기</h3></div></button>}   
                    <Link to={link} className='reviewButton2'><h3 className='subhead100'>리뷰 작성하기</h3></Link>
                </div>
                <div className="postWrapBox">
                    <div className='serviceInfo2'>
                        <img className='serviceImgWrap2' src={post&&post.imageURL}></img>
                        <div className='serviceCon'>
                            <h4 className='title100'>{post&&post.title}</h4>
                        </div>
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
                <div className="divider"></div>
            </div>
        </div>
        <div className='postWrap'>
          <div className='scrapReview'>
            {scrapBool?<button style={{backgroundColor:"#E4E4FF"}}onClick={()=>unscrap()}className='scrap'><div className="scrapFrame"><img className='bookmarkImage' src={BookmarkClicked}/><h3 className='subhead100'>스크랩 완료</h3></div></button>:<button onClick={()=>scrap()}className='scrap'><div className='scrapFrame'><img className='bookmarkImage' src={Bookmark}/><h3 className='subhead100'>스크랩 하기</h3></div></button>}
            <Link to={link} className='reviewButton'><h3 className='subhead100'>리뷰 작성하기</h3></Link>
          </div>
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
        <div className="postWrap3">{tabList?<PostServiceIntro/>:<PostReview/>}</div>
        </div>
    )
        
}

export default Post;