import React ,{useEffect,useState} from 'react';
import UserInfo from '../components/UserInfo';
import {query,doc,collection, getDoc} from 'firebase/firestore';
import {useNavigate, useParams} from 'react-router-dom';
import {db} from '../firebase-config';
import '../style/reviewdetail.css';
function ReviewDetail({id,setShowReviewNumber}) {
    const {roomId} = useParams();
    const [title,setTitle] = useState("");
    const [author,setAuthor] = useState("");
    const [desc,setDesc] = useState("");
    // navigate = useNavigate();
    useEffect(()=>{

        getDoc(doc(collection(doc(collection(db,'posts'),roomId),'review'),id)).then(docSnap=>{
            setTitle(docSnap.data().reviewTitle);
            setAuthor(docSnap.data().reviewPeople);
            setDesc(docSnap.data().reviewContent);
        });
        
    },)
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
                    {title}
                </h3>
                <div className="info">
                    {author.length&&<UserInfo uid={author}/>}
                </div>
            </div>
            <div className="reviewDetailDesc" dangerouslySetInnerHTML={{__html: desc}}>

            </div>
        </div>
    );
}

export default ReviewDetail;