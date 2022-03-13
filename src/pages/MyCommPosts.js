import React, { useState, useEffect } from 'react';
import {collection,orderBy,query,onSnapshot,where} from 'firebase/firestore';
import {db,auth} from '../firebase-config';

function MyCommPosts(){
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        const postsCollectionRef = collection(db, "community");
        var q = query(postsCollectionRef, orderBy("time",'desc'),where("author.id","==",auth.currentUser.uid));
        onSnapshot(q, (snapshot)=>
            {
                setPosts(snapshot.docs.map((doc)=>({
                    ...doc.data()
                }))); 
            }
        )
    })
    return(
        <div>
            <h1 className='body100'>My Community Posts</h1>
            {posts&&posts.map((post)=>{
                return(
                    <>
                    {/* 필요한 레포가 있다면 언제든지 call */}
                    <div>{post.likeCount}</div>
                    <div>{post.postText}</div>
                    </>
                )
            })}
        </div>
    )
}
export default MyCommPosts;