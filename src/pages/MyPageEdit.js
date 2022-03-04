import React, { useEffect, useState } from 'react';
import { collection, doc, addDoc,onSnapshot,query} from "firebase/firestore";
import {db,auth} from '../firebase-config';
import {onAuthStateChanged} from 'firebase/auth';
function MyPageEdit({user}){
    const [company,setCompany] = useState({companyName:"",companyRole:""});
    const [time,setTime] = useState({
        timeStartYear:0,
        timeStartMonth:0,
        timeEndYear:0,
        timeEndMonth:0
    });
    const [users,setUsers] = useState({});
    const [careerList,setCareerList]= useState([]);
    onAuthStateChanged(auth,(currentUser)=>{
        setUsers(currentUser);
    })
    const addData = async () => {
        try {
            if(users.displayName){
                const usersInfoCollectionRef = collection(db,'userInfo');
                const userDocRef = doc(usersInfoCollectionRef,users.uid);
                const careerCollectionRef = collection(userDocRef,'career');
                await addDoc(careerCollectionRef,{
                    company:{
                        name: company.companyName,
                        role: company.companyRole,
                        time:time
                    }
                })
                console.log("userinfo에 career 정보 올리기 성공!");
            }
        } catch (e) {
            console.log(e);
        }
    };
    const updateTimeData = e => {
        setTime({
            ...time,
            [e.target.name]: +e.target.value
        })
        console.log(time);
    }
    const updateCompanyData = e => {
        setCompany({
            ...company,
            [e.target.name]: e.target.value
        })
        console.log(company);
    }
    useEffect(()=>{
        if(users.displayName){
            const careerRef = query(collection(doc(collection(db,'userInfo'),users.uid),'career'));
            onSnapshot(careerRef,(snapshot)=>{
                setCareerList(snapshot.docs.map((doc)=>({
                    ...doc.data(),id:doc.id
                })));
            })

        }
    },[users])
    // const createPost = async () => {
    //     await addDoc(postsCollectionRef, {title,postText,author:{name:auth.currentUser.displayName,id:auth.currentUser.uid}});
    //     navigate("/");
    // }
    //console.log(careerList);
    return(
        <>
            {user&&<div><h1>{user.displayName}</h1></div>}
            <input className="event" name="companyName" placeholder="예 : HB Company" onChange={updateCompanyData}></input>
            <input className="event" name="companyRole" placeholder="예 : 그래픽 디자이너, 프론트엔드 개발자" onChange={updateCompanyData}></input>
            <input className='timeStartYear' name='timeStartYear' placeholder='입사 연도' type='number' min='1900' max='2100' onChange={updateTimeData} ></input>
            <input className='timeEndYear' name='timeEndYear' placeholder='퇴사 연도' type='number' min='1900' max='2100' onChange={updateTimeData} ></input>
            <button onClick = {addData} >Button Post</button>
            {careerList && careerList.map((post)=>{
                return(
                <div>
                    {post.company.name}
                    {post.company.time.timeEndYear}
                </div>)
            })}

        </>
    )
}
export default MyPageEdit;