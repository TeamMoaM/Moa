import { doc } from 'firebase/firestore';
import React, { useEffect,useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import {db} from '../firebase-config';
import {getDoc} from 'firebase/firestore';
function ServiceIntro() {
    const [post, setPost] = useState([]);
    const {roomId} = useParams();
    
    return (
        // 레퍼런스로 쓰는 법 써놓은거임 참고하셈
        <div>
            PostServiceIntro
            {/* {roomId}
            <br/>
            {post.title}
            <br></br>
            {post.content}
            <br/>
            <img src={post.imageUrl} alt={post.imageUrl}/>
            <br/>
            {post.id} */}

        </div>
    );
}

export default ServiceIntro;