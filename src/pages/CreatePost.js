import { collection, addDoc, doc,getDoc, setDoc} from "firebase/firestore";
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import {db,storage} from '../firebase-config';
import React,{useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import Editor from './Editor'
const CreatePost = () => {
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const postsCollectionRef = collection(db,"posts");
    
    const formHandeler = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file);
    };

    const uploadFiles = async(file) => {
        if(!file){
            return
        }
        const storageRef = ref(storage, `/files/${file.name}`);
        await uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
        let data = await getDoc(doc(db, "docCount","docCount"));
        let docCount = await data.data().docCount;
        docCount = docCount+1;
        let urlResponse = await getDownloadURL(storageRef);
        await addDoc(postsCollectionRef, {title:title,content:content,imageURL:urlResponse,time:new Date(),commentCount:0,reviewCount:0,id:docCount});
        await setDoc(doc(db, 'docCount','docCount'),{docCount:docCount});
    };

    return (
        <div className="createPost">
            <div className="serviceInfo">
                <input className="postTitle" placeholder="제목을 입력하세요" onChange={(event)=>{setTitle(event.target.value)}}></input>
                <input className="postIntro" placeholder="서비스 개요를 입력하세요" onChange={(event)=>{setContent(event.target.value)}}></input>
            </div>
            <div className="divider"></div>
            <Editor></Editor>
            <form onSubmit={formHandeler}>
                <input className="fileButton" type="file"/>
                <button className="submitButton" type="submit"><h3 className="subhead100">글 등록하기</h3></button>
            </form>
            {/* <h1>Uploaded {progress}%</h1> */}
            {/* <button onClick= {createPostButton}>Submit</button> */}
        </div>
    );
};

export default CreatePost;