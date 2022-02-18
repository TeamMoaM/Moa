import React, { useState } from 'react';
import { getDocs, collection, deleteDoc, doc, addDoc} from "firebase/firestore";
import {db,auth} from '../firebase-config';
import {Link} from 'react-router-dom';
function MyPage({user}){
    // const createPost = async () => {
    //     await addDoc(postsCollectionRef, {title,postText,author:{name:auth.currentUser.displayName,id:auth.currentUser.uid}});
    //     navigate("/");
    // }
    return(
        <>
            <div><h1>{user.displayName}</h1></div>
            <Link to='/MyPage/edit'>추가</Link>
        </>
    )
}
export default MyPage;