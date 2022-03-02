// import { } from 'firebase/firestore';
import React,{useEffect,useState} from 'react';
import {query,collection,doc,onSnapshot, updateDoc,arrayUnion,getDoc,setDoc} from 'firebase/firestore';
import {db} from '../firebase-config';
import profileDefaultImg from '../img/communityImg/defaultprofile.svg';
import PostText from './PostText';



function Comments({id,user}) {
//    console.log(comments);
    const [commentList,setCommentList] = useState([]);
    const [comment, setComment] = useState([]);
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
          //댓글 개수 제한?
          console.log(index);
          index = String(index);
          const docRef = doc(db,"community",id,"comments",index);
          await updateDoc(docRef,{
            replyComments:arrayUnion({
              content:comment,
              commentPeople:user.displayName
            })
          });
        
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
                                <h5 id="postAuthorName"className="point100">{comment.commentPeople}</h5><h5 id="postCompanyName"className="point100">{"회사 이름"}</h5>
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
                <PostText id={comment.id} content={comment.content}/>
                {comment.replyComments.map((com)=>{return(
                   <div className="replyComment">
                    <div className="replyPostHeader">
                        <div className="postInformation">
                            <img className="pfpimage" src={profileDefaultImg}/>
                            <div className="postProfile">
                                <div className="postProfile1">
                                    <h5 id="postAuthorName"className="point100">{com.commentPeople}</h5><h5 id="postCompanyName"className="point100">{"회사 이름"}</h5>
                                </div>
                                <div className="postProfile1"><h2 className="caption100">{"1시간 전"}</h2></div>
                            </div>
                        </div>
                        <div className="postEdit">
                            <button id="edit"onClick={()=>{alert("열심히 준비중이니 조금만 기다려주세요!")}}><h2 id="editH"className="caption100">수정하기</h2></button>
                            <h2 className="caption100"id='editdivider'>|</h2>
                            <button id="delete"onClick={()=>{console.log("delete!")}}><h2 id="deleteH"className="caption100">삭제하기</h2></button>
                        </div>
                    </div>
                    <div className="replyCommentPostTextContainer"> {com.content} </div>
                   </div>

                )})}
                
                
                <div className="commentInputAndButton">
                  <input  onBlur={(e)=>{var input1 = document.getElementById('commentAddInput'+comment.id);input1.value='';}} onFocus={(e)=>{var input = document.getElementById(comment.id+'button');input.style.display="block";var input1 = document.getElementById('commentAddInput'+comment.id);input1.value='';input1.style.borderTopRightRadius= "0px";input1.style.borderBottomRightRadius="0px";}} id={"commentAddInput"+comment.id}onKeyPress={(e)=>{inputPress(e,comment.id)}} className="replyPostCommentInput" placeholder="회원님의 의견을 공유해주세요." onChange={(event)=>{setComment(event.target.value);}}/>
                  <button id={comment.id+'button'} style={commentButtonStyle} className="commentSendButton" onClick={()=>{addReplyComment(comment.id)}}><h3 className="subhead100">등록</h3></button> 
                </div>
            </div>
            )
        })}
        </div>
            
        
    );
}

export default Comments;