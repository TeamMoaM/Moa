// import { } from 'firebase/firestore';
import React,{useEffect,useState} from 'react';
import {query,collection,doc,onSnapshot,arrayRemove, updateDoc,arrayUnion,getDoc,setDoc} from 'firebase/firestore';
import {db} from '../firebase-config';
import profileDefaultImg from '../img/communityImg/defaultprofile.svg';
import ReplyArrow from '../img/communityImg/_relply.svg';
import smallComment from '../img/communityImg/smallComment.svg';
import smallHeart from '../img/communityImg/smallHeart.svg';
import smallHearted from '../img/communityImg/smallHearted.svg';
import TimeCal from './TimeCal';
import bronzeMedal from '../img/medals/bronzeMedal.svg';
import silverMedal from '../img/medals/silverMedal.svg';
import goldMedal from '../img/medals/goldMedal.svg';
import PostTextComment from './PostTextComment';

function Comments({id,user,isAuth}) {
    const [commentList,setCommentList] = useState([]);
    const [comment, setComment] = useState([]);
    const [commentInputToggleList,setCommentInputToggleList] = useState([]);
    const [commentInputToggleBool,setCommentInputToggleBool] = useState(1);
    useEffect(()=>{
        const get = async () => {
            const docSnap = query(collection(doc(collection(db,'community'),id),'comments'));
            onSnapshot(docSnap,(snapshot)=>{
                setCommentList(snapshot.docs.map((doc)=>({
                    ...doc.data(),id:doc.id
                }))); 
            })
        }
        get();
    },[])
    const addReplyComment = async (index) =>{
          console.log(index);
          index = String(index);
          const docRef = doc(db,"community",id,"comments",index);
          await updateDoc(docRef,{
            replyComments:arrayUnion({
              content:comment,
              time:new Date(),
              commentPeople:user.displayName,
              like:[],
              likeCount:0
            })
          });
        
    }
    const addCommentLike = async (commentId) =>{
        if(isAuth){
          const postDoc = doc(db, 'community', id,'comments',commentId);
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
            await updateDoc(doc(db,"community",id,"comments",commentId),{likeCount:likeCount,like:arrayRemove(user.displayName)});
          }
          else{// 이사람이 좋아요 안누를 상태에서 좋아요 누른 경우
            likeCount = likeCount+1;
            await updateDoc(doc(db,'community',id,"comments",commentId),{likeCount:likeCount,like:arrayUnion(user.displayName)});
          }
        }
        else{
          window.location.href='/login';
        }
      }
    const inputPress = async (e,index) => {
        if(e.key=='Enter'){
            var input = document.getElementById("commentAddInput"+index);input.value='';
            await addReplyComment(index);
        }
    }
    const commentButtonStyle={
        postion:"absolute",
        bottom:"0",
        right:"0"
    }

    return (
        <div className="commentBox">
        {commentList.map((comment)=>{
            return(
            <div className="comment">
                <div className="postHeader">
                    <div className="postInformation">
                        <img className="pfpimage" src={profileDefaultImg}/>
                        <div className="postProfile">
                            <div className="postProfile1">
                                <img className="postProfile1Img" src={bronzeMedal}/><h4 id="postAuthorName"className="subhead100">{comment.commentPeople}</h4><h4 id="postCompanyName"className="body100">{"회사 이름"}</h4>
                            </div>
                            <div className="postProfile1"><TimeCal time={comment.time.seconds}/></div>
                        </div>
                    </div>
                    {/* <div className="postEdit">
                        <button id="edit"onClick={()=>{console.log("edit!")}}><h2 id="editH"className="caption100">수정하기</h2></button>
                        <h2 className="caption100"id='editdivider'>|</h2>
                        <button id="delete"onClick={()=>{console.log("delete!")}}><h2 id="deleteH"className="caption100">삭제하기</h2></button>
                    </div> */}
                </div>
                <PostTextComment id={comment.time.seconds} content={comment.content}/>
                <div className="commentLikeAndReplyCommentBox">
                    <div className="commentLikeAndReplyComment">
                        <div onClick={()=>{addCommentLike(comment.id)}}className="commentLikeButton">{isAuth&&(!comment.like.includes(user.displayName)?<img src={smallHeart}/>:<img src={smallHearted}/>)}<h2 className="caption100">공감 {comment.likeCount}개</h2></div>
                        {isAuth&&<div className="replyCommentToggleButton" onClick={()=>{if(commentInputToggleBool){setCommentInputToggleList(comment.id);setCommentInputToggleBool(0);}else{setCommentInputToggleBool(1);}}}><img src={smallComment}/><h2 className="caption100">답글 달기</h2></div>}
                    </div>
                </div>
                
                {comment.replyComments.map((com)=>{return(
                   <div className="replyComment">
                    <div className="replyPostHeader">
                        <div className="postInformation">
                            <div className="replyArrowBox">
                                <img className="replyArrowImg" src={ReplyArrow}/>
                            </div>
                            <img className="pfpimage" src={profileDefaultImg}/>
                            <div className="postProfile">
                                <div className="postProfile1">
                                    <img className="postProfile1Img" src={bronzeMedal}/><h4 id="postAuthorName"className="subhead100">{comment.commentPeople}</h4><h4 id="postCompanyName"className="body100">{"회사 이름"}</h4>
                                </div>
                                <div className="postProfile1"><TimeCal time={com.time.seconds}/></div>
                            </div>
                        </div>
                        {/* <div className="postEdit">
                            <button id="edit"onClick={()=>{alert("열심히 준비중이니 조금만 기다려주세요!")}}><h2 id="editH"className="caption100">수정하기</h2></button>
                            <h2 className="caption100"id='editdivider'>|</h2>
                            <button id="delete"onClick={()=>{console.log("delete!")}}><h2 id="deleteH"className="caption100">삭제하기</h2></button>
                        </div> */}
                    </div>
                    <PostTextComment id={com.time.seconds} content={com.content}/>
                   </div>

                )})}
                
                {commentInputToggleList.includes(comment.id)?
                    <div id={"commentInputAndButton"+comment.id}className="commentInputAndButton">
                        <input  onBlur={(e)=>{var input3 = document.getElementById(comment.id+'button');input3.style.borderColor="#E8E8EE";var input1 = document.getElementById('commentAddInput'+comment.id);input1.value='';}} onFocus={(e)=>{var input = document.getElementById(comment.id+'button');input.style.borderColor="#2727AD";input.style.boxSizing="border-box";input.style.display="block";var input1 = document.getElementById('commentAddInput'+comment.id);input1.value='';input1.style.borderRight="none";input1.style.borderTopRightRadius= "0px";input1.style.borderBottomRightRadius="0px";}} id={"commentAddInput"+comment.id}onKeyPress={(e)=>{inputPress(e,comment.id)}} className="postCommentInput" placeholder="회원님의 의견을 공유해주세요." onChange={(event)=>{setComment(event.target.value);}}/>
                        <button id={comment.id+'button'} style={commentButtonStyle} className="commentSendButton" onClick={()=>{addReplyComment(comment.id)}}><h3 className="subhead100">등록</h3></button> 
                    </div>
                    :
                    <></>
                }
                
            </div>
            )
        })}
        </div>
            
        
    );
}

export default Comments;