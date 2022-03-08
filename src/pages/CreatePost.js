import { collection, addDoc, doc,getDoc, setDoc} from "firebase/firestore";
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import {db,storage} from '../firebase-config';
import React,{useState,useRef} from 'react';
import 'react-quill/dist/quill.snow.css';
import Editor from './Editor'
import '../style/post.css';
import ClipLoader from "react-spinners/ClipLoader";
const CreatePost = ({user}) => {
    const [title,setTitle] = useState("");
    const [loading,setLoading] = useState(false);
    const [content,setContent] = useState("");
    const postsCollectionRef = collection(db,"posts");
    const [desc, setDesc] = useState('');
    const [thumbnailImg,setThumbnailImg] = useState('');
    const thumbnailInput = useRef(null);

    const formHandeler = (e) => {
        setLoading(true);
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file);
    };

    const uploadFiles = async(file) => {
        if(!file){
            alert("썸네일 입력해 시키야");
        }
        const storageRef = ref(storage, `/files/${file.name}`);
        await uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file createpost!');
        });
        let data = await getDoc(doc(db, "docCount","docCount"));
        let docCount = await data.data().docCount;
        docCount = docCount+1;
        let urlResponse = await getDownloadURL(storageRef);
        await addDoc(postsCollectionRef, {title:title,content:content,author:{id:user.uid,name:user.displayName},desc:desc,imageURL:urlResponse,time:new Date().getTime/1000,commentCount:0,reviewCount:0,id:docCount});
        await setDoc(doc(db, 'docCount','docCount'),{docCount:docCount});
        setLoading(false);
        window.location.href='Betatest/recentOrder';
    };
    function thumbnailInputOnchange(e){
        // event.preventDefault();
        // const file = thumbnailInput.current.files[0];
        const file = thumbnailInput.current.files[0];
        const url = URL.createObjectURL(file);  
        setThumbnailImg(url);
        // console.log("file:"+file);
    }
    function onEditorChange(value) {
        setDesc(value);
    }
    return (
        <div className="createPostWrap">
        <div className="createPost">
            <div className="serviceInfo">
                {thumbnailImg? <div className="postImgWrap"><img id="postImgWrap"src={thumbnailImg}alt="사진을 추가해주세요!"/></div>:<div className="postImgWrap"></div>}
                <div className="postCon">
                    <input maxlength="30" className="postTitle" placeholder="제목을 입력하세요" onChange={(event)=>{setTitle(event.target.value)}}></input>
                    <div className='userInfo'>
                        <div className='userImg'></div><h4 className='body100'>{user.displayName}</h4><h2 className='caption100'>Company name</h2>
                    </div>
                    <textarea maxlength="133" className="postIntro" placeholder="서비스 개요를 입력하세요" onChange={(event)=>setContent(event.target.value)}></textarea>
                </div>
            </div>
            <div className="divider"></div>
            {/* <ClipLoader color={'red'} loading={loading} size={150} /> */}
            <form onSubmit={formHandeler}>
                <input ref={thumbnailInput} id="input-file"onChange={thumbnailInputOnchange}className="fileButton" type="file"/>
                <label className="input-file-button" for="input-file"><h3 className="subhead100">썸네일 올리기</h3></label>
                <button className="submitButton" onClick={()=>{setLoading(true)}}type="submit"><h3 className="subhead100">글 등록하기</h3></button>
            </form>
        </div>
        <div className="editorBox">
            <Editor value={desc} onChange={onEditorChange}></Editor>
        </div>
       
        </div>
    );
};

export default CreatePost;