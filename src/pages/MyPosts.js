import { getDoc, getDocs, where } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { auth,db } from '../firebase-config';
import {collection,query,orderBy,onSnapshot} from 'firebase/firestore';
import {useNavigate} from 'react-router-dom';
function MyPosts(){
    const [posts,setPosts] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const postsCollectionRef = collection(db, "posts");
        var q = query(postsCollectionRef, orderBy("time",'desc'),where("author.id","==",auth.currentUser.uid));
        onSnapshot(q, (snapshot)=>
            {
                setPosts(snapshot.docs.map((doc)=>({
                    ...doc.data(),id:doc.id
                }))); 
            }
        )
    })
    const postClick = (id) => {
        navigate(`/post/${id}`);
    }
    
    return(
        <div>
            <h1 className='body100'>MyPosts</h1>
            {posts&&posts.map((post)=>{
                return(
                <> 
                    <div onClick={()=>{postClick(post.id)}} className="post">
                        <img id="myimg" src={post.imageURL}></img>
                        <div className="post_title">{post.title}</div>
                        <div className="post_content">{post.content}</div>
                        <div className="post_commentAndreview">
                            댓글 {post.commentCount? post.commentCount: 0}개 | 리뷰 {post.reviewCount? post.reviewCount: 0}개
                        </div>
                    </div>
                </>   
                )
            })}
        </div>
    )
}
export default MyPosts;