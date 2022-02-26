import React,{useState,useEffect,useRef} from 'react';
import {collection,onSnapshot,addDoc,doc,deleteDoc,getDoc,setDoc,updateDoc,arrayRemove,arrayUnion} from 'firebase/firestore';
import {db,auth} from '../firebase-config';
import {useNavigate,Link} from 'react-router-dom';
import {onAuthStateChanged,setPersistence,browserSessionPersistence} from 'firebase/auth';
import heart from '../img/communityImg/heart.svg';
import hearted from '../img/communityImg/hearted.svg';
import profileDefaultImg from '../img/communityImg/defaultprofile.svg';
import message from '../img/communityImg/comment.svg';
import share from '../img/communityImg/share.svg';
import scrap from '../img/communityImg/scrap.svg';
import Popup from 'reactjs-popup';
import styled from "styled-components";
import xIcon from '../img/communityImg/x_icon.svg';
import tag from '../img/communityImg/tag.svg';
import Comments from '../components/Comments';
import 'reactjs-popup/dist/index.css';
import '../style/community.css';
// styled(Popup)`
//   border:1px solid red;
//   color:red;
//   width:100px;
// `;


function Community({setList,isAuth}){
  const [postLists, setPostList] = useState([]);
  const [comment, setComment] = useState([]);
  const [commentToggle,setCommentToggle] =useState('asd');
  const [user,setCurrentUser] = useState({});
  const [postText,setPostText] = useState("");
  const [commentList,setCommentList] = useState([]);
  const [tagSelect,setTagSelect] = useState(1);
  const postsCollectionRef = collection(db, 'community');
  var navigate = useNavigate();
  setList(3);
  
  setPersistence(auth, browserSessionPersistence).then(()=>{console.log("browser session success")});
  onAuthStateChanged(auth,(User)=>{
    setCurrentUser(User);
  })
  useEffect(()=>{//밑에서 return 할때 한번에 map으로 가져오기 위해 useState로 post 내용들 받아오는 코드
    onSnapshot(postsCollectionRef, (snapshot)=>{
      setPostList(snapshot.docs.map((doc)=>({
        ...doc.data(),id:doc.id
      })))
    })
  },false)
  
  const deletePost = async (id) => {//해당 id의 post 삭제하는 함수(currentUser의 게시물인지 확인 필요)
    const postDoc = doc(db, 'community', id);
    // await deleteDoc(postDoc);
  };
  const addComment = async (id) =>{//comment 추가했을때 comment 내용이랑 comment commentPoeple추가하는 함수(post id 필요)
     if(isAuth){
        //댓글 개수 제한?
        const docSnap = await getDoc(doc(db,'community',id));
        var commentCount = docSnap.data().commentCount;
        commentCount = commentCount + 1;
        console.log("count:"+commentCount);
        commentCount = String(commentCount);
        const docRef = doc(db,"community",id,"comments",commentCount);
        setDoc(docRef,{
          content:comment,
          commentPeople:user.displayName,
          replyComments:[]
        })
        commentCount = Number(commentCount);
        await updateDoc(doc(db,"community",id),{commentCount:commentCount});
      }
  };

  // const commentToggles = async (id) =>{
  //   setCommentToggle(id);
  // }
  const addLike = async (id) =>{
    if(isAuth){
      const postDoc = doc(db, 'community', id);
      const docSnap = await getDoc(postDoc);
      let likeCount = 0;
      likeCount = docSnap.data().likeCount;
      var userLike = 0;
      if(likeCount>0){
        docSnap.data().like.forEach(liker=>
          {
            if(liker===user.displayName){
              userLike = 1;
            };
          }
        )
      }
      if(userLike){//이 사람이 이미 좋아요를 눌러 놓은 상태에서 다시 누른 경우
        likeCount = likeCount - 1;
        await updateDoc(doc(db,'community',id),{likeCount:likeCount,like:arrayRemove(auth.currentUser.displayName)});
      }
      else{// 이사람이 좋아요 안누를 상태에서 좋아요 누른 경우
        likeCount = likeCount+1;
        await updateDoc(doc(db,'community',id),{likeCount:likeCount,like:arrayUnion(auth.currentUser.displayName)});
      }
    }
    else{
      window.location.href='/login';
    }
  }
  const createPost = async () => {
    await addDoc(collection(db,'community'),{postText:postText,commentCount:0,author:{name:user.displayName,id:user.uid},like:[],likeCount:0,tag:tagSelect});
  }
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const inputPress = async(e,id) => {
    if(e.key=='Enter'){
      var input = document.getElementById("commentAddInput"+id);input.value='';
      await addComment(id);
    }
  }
  // const post = useRef(null);
  const commentButtonStyle={
    postion:"absolute",
    bottom:"0",
    right:"0"
  }
  
  return (
    <div className="homePage">
      <button onClick={() => setOpen(o => !o)} className="firstPost">
        <img className="firstPostImage" src={profileDefaultImg}/>
        <div className="firstPostButton"><h1 className="caption151">회원님의 이야기를 공유해주세요.</h1></div>
      </button>
      <Popup contentStyle={{padding:"24px",width: "500px", height:"438px", borderRadius:"8px",boxShadow:"0px 4px 24px rgba(0, 1, 3, 0.1)"}}open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <div className="modalHeader">
            <h4 className="title100">새로운 게시물</h4>
            <img className="close" onClick={()=>{closeModal();}}src={xIcon}/>
          </div>
          <div className="modalSecondHeader">
            <img src={tag}/>
            {tagSelect==1?<button onClick={()=>{setTagSelect(1);}} className="modalClickedButton"><h2 className="caption100">디자인</h2></button>:<button onClick={()=>{setTagSelect(1);}} className="modalUnclickedButton"><h2 className="caption100">디자인</h2></button>}
            {tagSelect==2?<button onClick={()=>{setTagSelect(2);}} className="modalClickedButton"><h2 className="caption100">개발</h2></button>:<button onClick={()=>{setTagSelect(2);}} className="modalUnclickedButton"><h2 className="caption100">개발</h2></button>}
            {tagSelect==3?<button onClick={()=>{setTagSelect(3);}} className="modalClickedButton"><h2 className="caption100">기획</h2></button>:<button onClick={()=>{setTagSelect(3);}} className="modalUnclickedButton"><h2 className="caption100">기획</h2></button>}
            {tagSelect==4?<button onClick={()=>{setTagSelect(4);}} className="modalClickedButton"><h2 className="caption100">사업</h2></button>:<button onClick={()=>{setTagSelect(4);}} className="modalUnclickedButton"><h2 className="caption100">사업</h2></button>}
            {tagSelect==5?<button onClick={()=>{setTagSelect(5);}} className="modalClickedButton"><h2 className="caption100">기술</h2></button>:<button onClick={()=>{setTagSelect(5);}} className="modalUnclickedButton"><h2 className="caption100">기술</h2></button>}
          </div>
          <div className="modalWriteBox">
            <div className="modalContentWrite">
              <textarea onChange={(event)=>{setPostText(event.target.value);}}className="modalContentWriteTextarea" placeholder="회원님의 이야기를 공유해주세요."></textarea>
            </div>
            <button onClick={()=>{createPost();}}className="modalpostButton"><h3 className="subhead100">게시물 올리기</h3></button>
          </div>
        </div>
      </Popup>
      {postLists.map((post) => {
        return (
          <div className="post">
            <div className="firstPostHeader">
                <div className="postInformation">
                    <img className="pfpimage" src={profileDefaultImg}/>
                    <div className="postProfile">
                        <div className="postProfile1">
                            <h5 id="postAuthorName"className="point100">{post.author.name}</h5><h5 id="postCompanyName"className="point100">{"회사 이름"}</h5>
                        </div>
                        <div className="postProfile1"><h2 className="caption100">{"1시간 전"}</h2></div>
                    </div>
                </div>
                <div className="postEdit">
                    <button id="edit"onClick={()=>{console.log("edit!")}}><h2 id="editH"className="caption100">수정하기</h2></button>
                      <h2 className="caption100"id='editdivider'>|</h2>
                    <button id="delete"onClick={()=>{console.log("delete!")}}><h2 id="deleteH"className="caption100">삭제하기</h2></button>
                </div>
            </div>
            <div className="postTagWrap">
            {post.tag==1?<div className="postTag"><div className="modalClickedButton"><h2 className="caption100">디자인</h2></div></div>:<></>}
            {post.tag==2?<div className="postTag"><div className="modalClickedButton"><h2 className="caption100">개발</h2></div></div>:<></>}
            {post.tag==3?<div className="postTag"><div className="modalClickedButton"><h2 className="caption100">기획</h2></div></div>:<></>}
            {post.tag==4?<div className="postTag"><div className="modalClickedButton"><h2 className="caption100">사업</h2></div></div>:<></>}
            {post.tag==5?<div className="postTag"><div className="modalClickedButton"><h2 className="caption100">기술</h2></div></div>:<></>}
            </div>
            
            <div className="postTextContainer"> {post.postText} </div>
            <hr className="breakLine"/>
            <div className="likeAndComment">
              <button className="likeButton" id={post.id} onClick={()=>{addLike(post.id);}}>{!post.like.includes(user.displayName)?<img className="heart"src={heart}/>:<img src={hearted}/>}<h1 className="caption100">공감 {post.likeCount}개</h1></button>
              <div className="shareButtons">
                  <img src={message}/>
                  <img src={share}/>
                  <img src={scrap}/>
              </div>
            </div>
            


            {/* 댓글 구현  */}
            <Comments id={post.id} user={user}/>
      
            <div className="inputAndButton">
              <input  onBlur={(e)=>{var input1 = document.getElementById('commentAddInput'+post.id);input1.value='';}} onFocus={(e)=>{var input = document.getElementById(post.id+'button');input.style.display="block";var input1 = document.getElementById('commentAddInput'+post.id);input1.value='';input1.style.borderTopRightRadius= "0px";input1.style.borderBottomRightRadius="0px";}} id={"commentAddInput"+post.id}onKeyPress={(e)=>{inputPress(e,post.id)}} className="postCommentInput" placeholder="회원님의 의견을 공유해주세요." onChange={(event)=>{setComment(event.target.value);}}/>
              <button id={post.id+'button'} style={commentButtonStyle} className="commentSendButton" onClick={()=>{addComment(post.id)}}><h3 className="subhead100">등록</h3></button> 
            </div>
          </div>
          
        );
      })}
    </div>
  );

  
    
}
export default Community;