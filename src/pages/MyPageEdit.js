import React, { useEffect, useState } from 'react';
import { collection, doc, addDoc,onSnapshot,query} from "firebase/firestore";
import {db,auth} from '../firebase-config';
import {onAuthStateChanged} from 'firebase/auth';
import "../style/myPageEdit.css";
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
    const [inCompany,setInCompany] = useState(false);//재직중 input check버튼으로 바꿔주십쇼
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
                        time:time,
                        inCompany: inCompany
                    }
                })
                console.log("userinfo에 career 정보 올리기 성공!");
                window.location.reload();
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
            <div className='popupInputField'>
                <h3 className='subhead100'>회사명</h3>
                <input className="event" name="companyName" placeholder="예 : HB Company" onChange={updateCompanyData}></input>
            </div>
            <div className='popupInputField'>
                <h3 className='subhead100'>역할</h3>
                <input className="event" name="companyRole" placeholder="예 : 그래픽 디자이너, 프론트엔드 개발자" onChange={updateCompanyData}></input>
            </div>
            <div className='popupInputField'>
                <h3 className='subhead100'>기간</h3>
                <input className='time' name='timeStartYear' placeholder='입사 연도' type='number' min='1900' max='2100' onChange={updateTimeData} ></input>
                <h2 className='body100'>~</h2>
                <input className='time' name='timeEndYear' placeholder='퇴사 연도' type='number' min='1900' max='2100' onChange={updateTimeData} ></input>
            </div>
            <button className='addButton' onClick = {addData} ><h3 className='subhead100'>경력 추가하기</h3></button>
        </>
    )
}
export default MyPageEdit;