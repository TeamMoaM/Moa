import React, { useEffect ,useState} from 'react';
import {useParams} from 'react-router-dom';
import {getDoc,doc,query,collection,onSnapshot} from 'firebase/firestore';
import {db} from '../firebase-config';


function PostReview(props) {
    const {roomId} = useParams();
    const [review,setReview] = useState([]);
    useEffect(()=>{
        const get = async () => {
            const docSnap = query(collection(doc(collection(db,'posts'),roomId),'review'));
            onSnapshot(docSnap,(snapshot)=>{
                setReview(snapshot.docs.map((doc)=>({
                    ...doc.data(),id:doc.id
                }))); 
            })
        }
        get();
    },[])
    return (
        <div className="postServiceIntro">
            {review&&review.map((reviewPost)=>{
                return(
                    <>
                    <div className="test">{reviewPost.reviewContent}</div>
                    <div className="test1">{reviewPost.reviewPeople}</div>
                    </>
                )
            })}
        </div>
    );
}

export default PostReview;