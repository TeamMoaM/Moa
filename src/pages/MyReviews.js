import { collection, doc, getDocs, onSnapshot,query, where } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { auth ,db} from '../firebase-config';
import UserInfo from '../components/UserInfo';
import TimeCal from '../components/TimeCal';
import ReviewDetail from '../pages/ReviewDetail';
import {useNavigate} from 'react-router-dom';

function MyReviews(){
    const [showReviewNumber,setShowReviewNumber] = useState(0);
    const navigate = useNavigate();
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
                    <div>
                        <div onClick={()=>{setShowReviewNumber(review.id);navigate('');}} className="postReviewWrap">
                            <div className="postReviewBox">
                                <div className="postReviewTitle">
                                    <h1 className="subhead100">{review.reviewTitle}</h1>
                                </div>
                                {reviews&&<UserInfo uid={review.reviewPeople}/>}
                                <div className="postReviewContent">
                                    <h3 className="body150" dangerouslySetInnerHTML={{__html: review.reviewContent}}></h3>
                                </div>
                                <div className="postReviewTimeAndLike">
                                    <TimeCal time={review.time}/>
                                    <h3 className="body100">|</h3>
                                    <h3 id="postReviewLike" className="body100">추천 {"0"}개</h3>
                                </div>
                            </div>
                            <div className="postReviewDetailButton">
                                <h1 className="subhead100">&gt;</h1>
                            </div>
                        </div>
                    </div>
                    // 자세한 레포는 reviews collection 참조 부탁드립니다.
                )
            })}
        </div>
    )
}
export default MyReviews;