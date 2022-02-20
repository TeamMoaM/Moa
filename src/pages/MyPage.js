import React, { useState, useEffect } from 'react';
import { query, getDoc, collection, deleteDoc, doc, addDoc} from "firebase/firestore";
import {db,auth} from '../firebase-config';
import {Link} from 'react-router-dom';
function MyPage({user}){
    const [myPage, setMyPage] = useState([]);
    if(user.displayName){
        const usersInfoCollectionRef = collection(db,'userInfo');
        const userDocRef = doc(usersInfoCollectionRef,user.uid);
        const careerCollectionRef = collection(userDocRef,'career');
    }
    //const q = query(careerCollectionRef, );
    useEffect(() => {
        console.log("hi!!!!");
        // onSnapshot(q, (snapshot)=>
        //   {
        //     setMyPage(snapshot.docs.map((doc)=>({
        //         ...doc.data(), id: doc.id,title: doc.data().title, content: doc.data().content, imageURL:doc.data().imageURL, commentCount: doc.data().commentCount, reviewCount: doc.data().reviewCount
        //     }))); 
        //   }
        // )
        getDoc(doc(db,'userInfo', user.uid, 'career', '6Ji67mrGCxWqNhvMqkri')).then(docSnap => {
            console.log(docSnap.data());
            console.log('hi');
            //setPost({title:docSnap.data().title,content:docSnap.data().content,imageUrl:docSnap.data().imageURL,id:docSnap.data().id, authorName:docSnap.data().author.name,authorId:docSnap.data().author.id});
        })
    },[MyPage]);
    return(
        <div>
            <div><h1>{user.displayName}</h1></div>
            <Link to='/MyPage/edit'>추가</Link>
        </div>
    )
}
export default MyPage;