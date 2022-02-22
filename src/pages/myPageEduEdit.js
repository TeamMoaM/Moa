import React, { useEffect, useState } from 'react';
import { collection, doc, addDoc,onSnapshot,setDoc,query} from "firebase/firestore";
import {db,auth} from '../firebase-config';
import {onAuthStateChanged} from 'firebase/auth';
function MyPageEduEdit({user}){
    const [school,setSchool] = useState("");
    const [major,setMajor] = useState("");
    const [time,setTime] = useState({
        timeStartYear:0,
        timeStartMonth:0,
        timeEndYear:0,
        timeEndMonth:0
    });
    const [users,setUsers] = useState({});
    const [eduList,setEduList]= useState([]);
    onAuthStateChanged(auth,(currentUser)=>{
        setUsers(currentUser);
    })
    const addData = async () => {
        try {
            if(users.displayName){
                const usersInfoCollectionRef = collection(db,'userInfo');
                const userDocRef = doc(usersInfoCollectionRef,users.uid);
                const eduCollectionRef = collection(userDocRef,'education');
                await addDoc(eduCollectionRef,{
                    school:{
                        name:school,
                        major:major,
                        time:time
                    }
                })
                console.log("userinfo에 education 정보 올리기 성공!");
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
        if(users.displayName){
            const educationRef = query(collection(doc(collection(db,'userInfo'),users.uid),'education'));
            onSnapshot(educationRef,(snapshot)=>{
                setEduList(snapshot.docs.map((doc)=>({
                    ...doc.data(),id:doc.id
                })));
            })

        }
    },[users])
    return(
        <>
            {user&&<div><h1>{user.displayName}</h1></div>}
            <input className="event" placeholder="학교 이름" onChange={(event)=>{setSchool(event.target.value)}}></input>
            <input className='major' name='major' placeholder='전공' onChange={(e)=>setMajor(e.target.value)} ></input>
            <input className='timeStartYear' name='timeStartYear' placeholder='시작한 연도' type='number' min='1900' max='2100' onChange={updateTimeData} ></input>
            <input className='timeStartMonth' name='timeStartMonth' placeholder='시작한 달' type='number' min='1' max='12' onChange={updateTimeData} ></input>
            <input className='timeEndYear' name='timeEndYear' placeholder='끝난 연도' type='number' min='1900' max='2100' onChange={updateTimeData} ></input>
            <input className='timeEndMonth' name='timeEndMonth' placeholder='끝난 달' type='number' min='1' max='12' onChange={updateTimeData} ></input>
            <button onClick = {addData} >Button Post</button>
            {eduList && eduList.map((post)=>{
                return(
                <div>
                    {post.school.name}
                    {post.school.major}
                    {post.school.time.timeEndYear}
                </div>)
            })}

        </>
    )
}
export default MyPageEduEdit;