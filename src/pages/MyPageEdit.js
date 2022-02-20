import React, { useEffect, useState } from 'react';
import { collection, doc, addDoc,onSnapshot,setDoc,query} from "firebase/firestore";
import {db,auth} from '../firebase-config';
import {onAuthStateChanged} from 'firebase/auth';
function MyPageEdit({user}){
    const [company,setCompany] = useState("");
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
                const carrerCollectionRef = collection(userDocRef,'career');
                await addDoc(carrerCollectionRef,{
                    company:{
                        name:company,
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
    useEffect(()=>{
        console.log("useEffect started");
        if(users.displayName){
            console.log("if inside");
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
    console.log(careerList);
    return(
        <>
            {user&&<div><h1>{user.displayName}</h1></div>}
            <input className="event" placeholder="회사 이름을 입력하세요" onChange={(event)=>{setCompany(event.target.value)}}></input>
            <input className='timeStartYear' name='timeStartYear' placeholder='시작한 연도' type='number' min='1900' max='2100' onChange={updateTimeData} ></input>
            <input className='timeStartMonth' name='timeStartMonth' placeholder='시작한 달' type='number' min='1' max='12' onChange={updateTimeData} ></input>
            <input className='timeEndYear' name='timeEndYear' placeholder='끝난 연도' type='number' min='1900' max='2100' onChange={updateTimeData} ></input>
            <input className='timeEndMonth' name='timeEndMonth' placeholder='끝난 달' type='number' min='1' max='12' onChange={updateTimeData} ></input>
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