import { getDoc, getDocs, where } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase-config';
function MyPosts(){
    useEffect(()=>{
        const postsCollectionRef = collection(db, "posts");
        var q = query(postsCollectionRef, orderBy("time",'desc'),where("author.id","==",auth.currentUser.uid))
    })
    return(
        <div>
            <h1 className='body100'>MyPosts</h1>
        </div>
    )
}
export default MyPosts;