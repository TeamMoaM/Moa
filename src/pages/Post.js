import { doc } from 'firebase/firestore';
import React, { useEffect,useState } from 'react';
import {useParams} from 'react-router-dom';
import {db} from '../firebase-config';
import {getDoc} from 'firebase/firestore';
function Post() {
    const [post, setPost] = useState([]);
    const {roomId} = useParams();
    useEffect(()=>{
        getDoc(doc(db, "posts", roomId)).then(docSnap => {
            console.log(docSnap.data());
            console.log(docSnap.data().timestamp);
            setPost({title:docSnap.data().title,content:docSnap.data().content,imageUrl:docSnap.data().imageURL,id:docSnap.data().id})
        })
    },false);
   

    return (
        // 레퍼런스로 쓰는 법 써놓은거임 참고하셈
        <div>
            {roomId}
            <br/>
            {post.title}
            <br></br>
            {post.content}
            <br/>
            <img src={post.imageUrl} alt={post.imageUrl}/>
            <br/>
            {post.id}

        </div>
    );
}

export default Post;