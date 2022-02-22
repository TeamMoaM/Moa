import React,{useState} from 'react';
import {addDoc,collection} from 'firebase/firestore';
import {db} from '../firebase-config';
function CreateCommunity({user}) {
    const [title,setTitle] = useState("");
    const [postText,setPostText] = useState("");
    const createPost = async () => {
        await addDoc(collection(db,'community'), {title:title,postText:postText,comment:[],commentCount:0,commentPeople:[],author:{name:user.displayName,id:user.uid},likeCount:0,like:[]});
    }
    return (
        <div>
            <input onChange={(event)=>{setTitle(event.target.value);}} placeholder="제목을 입력해주세요"></input>
            <input onChange={(event)=>{setPostText(event.target.value);}} placeholder="내용을 입력해주세요"></input>
            <button onClick={()=>{createPost()}}className="createPostButton"><h2 className="subhead100">등록하기</h2></button>
        </div>
    );
}

export default CreateCommunity;