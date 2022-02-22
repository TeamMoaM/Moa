import React,{useState,useEffect} from 'react';
import {collection,onSnapshot,doc,deleteDoc,getDoc,setDoc,updateDoc,arrayRemove,arrayUnion} from 'firebase/firestore';
import {db,auth} from '../firebase-config';
import {useNavigate,Link} from 'react-router-dom';
import {onAuthStateChanged} from 'firebase/auth';
import heart from '../img/communityImg/Group 6.svg';
import hearted from '../img/communityImg/hearted.svg';
import profileDefaultImg from '../img/communityImg/defaultprofile.svg';
import tagImg from '../img/communityImg/tag.svg';
import message from '../img/communityImg/comment.svg';
import share from '../img/communityImg/share.svg';
import scrap from '../img/communityImg/scrap.svg';
import '../style/community.css';
function Community({isAuth}){
  const [postLists, setPostList] = useState([]);
  const [comment, setComment] = useState([]);
  const [commentToggle,setCommentToggle] =useState('asd');
  const [user,setCurrentUser] = useState({});
  const postsCollectionRef = collection(db, 'community');
  var navigate = useNavigate();
  if(isAuth==false){
    navigate("/login");
  }
  onAuthStateChanged(auth,(User)=>{
    setCurrentUser(User);
  })
  useEffect(()=>{//밑에서 return 할때 한번에 map으로 가져오기 위해 useState로 post 내용들 받아오는 코드
    onSnapshot(postsCollectionRef, (snapshot)=>
      setPostList(snapshot.docs.map((doc)=>({
        ...doc.data(),id:doc.id
      })))
    );
  },false)
  const deletePost = async (id) => {//해당 id의 post 삭제하는 함수(currentUser의 게시물인지 확인 필요)
    const postDoc = doc(db, 'community', id);
    await deleteDoc(postDoc);
  };
  const addComment = async (id) =>{//comment 추가했을때 comment 내용이랑 comment commentPoeple추가하는 함수(post id 필요)
     if(isAuth){
        const postDoc = doc(db, 'community', id);
        const docSnap = await getDoc(postDoc);
        let commentCount = docSnap.data().commentCount;
        if(commentCount>=16){//댓글이 무한정 많아지는 거 방지하는 용
            alert("한 게시물에 댓글은 15개까지만 다실 수 있습니다.");
            return 0;
        }
        commentCount =  commentCount +1;
        var comments = docSnap.data().comment;
        comments.push(comment);
        var commentPeoples = docSnap.data().commentPeople;
        commentPeoples.push(user.displayName);
        await setDoc(doc(db,'community',id),{...docSnap.data(),comment:comments,commentPeople:commentPeoples,commentCount:commentCount});
     }
  };
  const commentToggles = async (id) =>{
    setCommentToggle(id);
  }
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
  const inputPress = async(e,id) => {
    if(e.key=='Enter'){
      var input = document.getElementById("commentAddInput"+id);input.value='';
      await addComment(id);
    }
  }
  const commentButtonStyle={
    postion:"absolute",
    bottom:"0",
    right:"0"
  }
  return (
    <div className="homePage">
      <div className="firstPost">
        <img className="firstPostImage" src={profileDefaultImg}/>
        <Link to='/CreateCommunity' className="firstPostButton"><h1 className="caption151">회원님의 이야기를 공유해주세요.</h1></Link>
        <img className="firstPostImage2" src={tagImg}/>
      </div>
      {postLists.map((post) => {
        return (
          <div className="post">
            <div className="postHeader">
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
                    <button onClick={()=>{console.log("edit!")}}><h2 id='edit'className="caption100">수정하기</h2></button>
                    <h2 className="caption100"id='editdivider'>|</h2>
                    <button onClick={()=>{console.log("delete!")}}><h2 id='delete'className="caption100">삭제하기</h2></button>
                </div>
            </div>
            
            <div className="postTextContainer"> {post.postText} </div>
            <hr className="breakLine"/>
            <div className="likeAndComment">
              <button className="likeButton" id={post.id} onClick={()=>{if(post.author.id===auth.currentUser.uid){alert("본인 게사물에는 좋아요를 누를 수 없습니다")} else{addLike(post.id);}  }}>{!post.like.includes(user.displayName)?<img className="heart"src={heart}/>:<img src={hearted}/>}<h1 className="caption100">공감 {post.likeCount}개</h1></button>
              <div className="shareButtons">
                  <img src={message}/>
                  <img src={share}/>
                  <img src={scrap}/>
              </div>
            </div>
            
            {/* {(post.commentCount<=1)?
              (post.commentCount==0?(<></>):
               (<>
                <div className="commentAndPeople">
                  <h1 className="caption150">{post.commentPeople?post.commentPeople[0]:""}</h1> <p className="postMainComment">{post.comment?post.comment[0]:""}</p>
                </div>
               </>))
              :commentToggle!=post.id?(
              <div id="commentShow">
                <hr className="breakLine"/>
                <div className="commentAndPeople">
                  <p className="caption150">{post.commentPeople?post.commentPeople[0]:""}</p> <p className="postMainComment">{post.comment?post.comment[0]:""}</p>
                </div>
                <button onClick={()=>{commentToggles(post.id)}} className="commentMoreButton" id="commentMoreTxt"><h3 className="subhead100">댓글더보기 &gt;</h3></button>
              </div>)
              :
              (<div className="commentShowBox"><hr className="breakLine"/>{post.comment.map((com,index)=>{return <div id="commentShow">
                <div className="commentAndPeople">
                  <p className="caption150">{post.commentPeople[index]}</p> <div className="postMainComment">{com}</div>
                </div>
            </div>})}</div>)
            } */}
            {/* 댓글 구현  */}

            {post.comment.map((com,index)=>{
                return(
                <div className="comment">
                    <div className="postHeader">
                        <div className="postInformation">
                            <img className="pfpimage" src={profileDefaultImg}/>
                            <div className="postProfile">
                                <div className="postProfile1">
                                    <h5 id="postAuthorName"className="point100">{post.commentPeople[index]}</h5><h5 id="postCompanyName"className="point100">{"회사 이름"}</h5>
                                </div>
                                <div className="postProfile1"><h2 className="caption100">{"1시간 전"}</h2></div>
                            </div>
                        </div>
                        <div className="postEdit">
                            <button onClick={()=>{console.log("edit!")}}><h2 id='edit'className="caption100">수정하기</h2></button>
                            <h2 className="caption100"id='editdivider'>|</h2>
                            <button onClick={()=>{console.log("delete!")}}><h2 id='delete'className="caption100">삭제하기</h2></button>
                        </div>
                    </div>
                    <div className="postTextContainer"> {com} </div>
                </div>
                )
            })}
            

            <div className="inputAndButton">
            {/* var input = document.getElementById(post.id+'button');input.style.display="none"; */}
              <input  onBlur={(e)=>{var input1 = document.getElementById('commentAddInput'+post.id);input1.value='';}} onFocus={(e)=>{var input = document.getElementById(post.id+'button');input.style.display="block";var input1 = document.getElementById('commentAddInput'+post.id);input1.value='';input1.style.borderTopRightRadius= "0px";input1.style.borderBottomRightRadius="0px";}} id={"commentAddInput"+post.id}onKeyPress={(e)=>{inputPress(e,post.id)}} className="postCommentInput" placeholder="회원님의 생각을 전달해주세요." onChange={(event)=>{setComment(event.target.value);}}/>
              <button id={post.id+'button'} style={commentButtonStyle} className="commentSendButton" onClick={()=>{addComment(post.id)}}><h3 className="subhead100">등록</h3></button> 
            </div>
          </div>
          
        );
      })}
    </div>
  );
    
}
export default Community;