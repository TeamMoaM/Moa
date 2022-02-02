import { collection, addDoc, doc,getDoc, setDoc} from "firebase/firestore";
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import {db,storage} from '../firebase-config';
import React,{useState} from 'react';
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
            <input placeholder="title" onChange={(event)=>{setTitle(event.target.value)}}></input>
            <input placeholder="content" onChange={(event)=>{setContent(event.target.value)}}></input>
            <form onSubmit={formHandeler}>
                <input type="file"/>
                <button type="submit">Upload</button>
            </form>
            {/* <h1>Uploaded {progress}%</h1> */}
            {/* <button onClick= {createPostButton}>Submit</button> */}
        </div>
    );
};

export default CreatePost;