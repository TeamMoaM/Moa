import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import UserInfo from '../components/UserInfo';

function MypageReviewDetail({id,setShowReviewNumber}) {
    const [reviewTitle,setReviewTitle] = useState('');
    const [reviewPeople,setReviewPeople] = useState('');
    const [reviewContent,setReviewContent] = useState('');

    useEffect(()=>{
        getDoc(doc(db,'reviews',id)).then((docsnap)=>{
            setReviewTitle(docsnap.data().reviewTitle);
            setReviewPeople(docsnap.data().reviewPeople);
            setReviewContent(docsnap.data().reviewContent);
        })
    })
    useEffect(() => {
        const preventGoBack = () => {
          // change start
          window.history.pushState(null, '', window.location.href);
          // change end
          setShowReviewNumber(0);
        };
        
        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', preventGoBack);
        
        return () => window.removeEventListener('popstate', preventGoBack);
      }, []); 
    return (
        <div className="reviewDetail">
            <div className="reviewDetailTitleAndInfo">
                <h3 className="title150">
                    {reviewTitle&&reviewTitle}
                </h3>
                <div className="info">
                    {reviewPeople&&<UserInfo uid={reviewPeople}/>}
                </div>
            </div>
            <div className="reviewDetailDesc" dangerouslySetInnerHTML={{__html: reviewContent}}>

            </div>
        </div>
    );
}

export default MypageReviewDetail;