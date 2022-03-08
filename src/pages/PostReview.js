import React, { useEffect ,useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getDoc,doc,query,collection,onSnapshot} from 'firebase/firestore';
import {db} from '../firebase-config';
import UserInfo from '../components/UserInfo';
import TimeCal from '../components/TimeCal';
import ReviewDetail from '../pages/ReviewDetail';

function PostReview(props) {
    const {roomId} = useParams();
    const [review,setReview] = useState([]);
    const [showReviewNumber,setShowReviewNumber] = useState(0);
    const navigate = useNavigate();
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
            {showReviewNumber==0?
                <>{review&&review.map((reviewPost)=>{
                    return(
                        <div onClick={()=>{setShowReviewNumber(reviewPost.id);navigate('');}} className="postReviewWrap">
                            <div className="postReviewBox">
                                <div className="postReviewTitle">
                                    <h1 className="subhead100">{reviewPost.reviewTitle}</h1>
                                </div>
                                {reviewPost&&<UserInfo uid={reviewPost.reviewPeople}/>}
                                <div className="postReviewContent">
                                    <h3 className="body150" dangerouslySetInnerHTML={{__html: reviewPost.reviewContent}}></h3>
                                </div>
                                <div className="postReviewTimeAndLike">
                                    <TimeCal time={reviewPost.time}/>
                                    <h3 className="body100">|</h3>
                                    <h3 id="postReviewLike" className="body100">추천 {"0"}개</h3>
                                </div>
                            </div>
                            <div className="postReviewDetailButton">
                                <h1 className="subhead100">&gt;</h1>
                            </div>
                        </div>
                    )
                })}</>
            :<ReviewDetail id={showReviewNumber} setShowReviewNumber={setShowReviewNumber}/>
            }
        </div>
    );
}

export default PostReview;