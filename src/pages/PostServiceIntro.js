import { doc } from 'firebase/firestore';
import React, { useEffect,useRef,useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import {db} from '../firebase-config';
import {getDoc} from 'firebase/firestore';
import '../style/post.css';
function ServiceIntro() {
    const [post, setPost] = useState([]);
    const [desc,setDesc] = useState();
    const {roomId} = useParams();
    // const inputRef = useRef(null);
    useEffect(()=>{
        getDoc(doc(db,'posts',roomId)).then(docSnap=>{
            setDesc(docSnap.data().desc);
            
        })
    },false)
   

    return (
        <div className="postServiceIntro" dangerouslySetInnerHTML={{__html: desc}}>

        </div>
    );
}

export default ServiceIntro;