import { collection, doc, getDocs, onSnapshot,query, where } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { auth ,db} from '../firebase-config';
function MyReviews(){
    const [reviews,setReviews] = useState([]);
    useEffect(()=>{
        var q = query(collection(db,'reviews'),where("reviewPeople","==",auth.currentUser.uid));
        onSnapshot(q, (snapshot)=>
        {
            setReviews(snapshot.docs.map((doc)=>({
                ...doc.data()
            }))); 
        }
    )
    })
    return(
        <div>
            <h1 className='body100'>MyReviews</h1>
            {reviews&&reviews.map((review)=>{
                return(
                    <div>{review.reviewTitle}</div>
                    // 자세한 레포는 reviews collection 참조 부탁드립니다.
                )
            })}
        </div>
    )
}
export default MyReviews;