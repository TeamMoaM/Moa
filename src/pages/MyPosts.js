import { getDoc, getDocs, where } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { auth,db } from '../firebase-config';
import {collection,query,orderBy,onSnapshot} from 'firebase/firestore';
function MyPosts(){
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        const postsCollectionRef = collection(db, "posts");
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
            <h1 className='body100'>MyPosts</h1>
            {posts&&posts.map((post)=>{
                return(
                    <div>{post.title}</div>
                )
            })}
        </div>
    )
}
export default MyPosts;