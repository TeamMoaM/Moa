import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect,useState } from 'react';
import defaultprofileImg from '../img/communityImg/defaultprofile.svg';
import { db } from '../firebase-config';
import bronzeMedal from '../img/medals/bronzeMedal.svg';
import silverMedal from '../img/medals/silverMedal.svg';
import goldMedal from '../img/medals/goldMedal.svg';
import '../style/Userinfo.css';
function UserInfo({uid}) {
    const [tier,setTier] = useState("bronze");
    const [name,setName] = useState("");
    useEffect(()=>{
        getDoc(doc(db,'userInfo',uid)).then((docSnap)=>{
            setTier(docSnap.data().tier);
            setName(docSnap.data().name);
        })
    },)
    return (
        <div className="userInformation">
            <img className="userImg"src={defaultprofileImg}/><h4 className='body100'><img src={bronzeMedal}/>{name}</h4><h2 className='caption100'>company name</h2>
        </div>
    );
}

export default UserInfo;