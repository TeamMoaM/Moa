import React ,{useState}from 'react';

function PostText({id,content}) {
    const [moreButton,setMoreButton] = useState(1);
    return (
        <>
        <div className="postTextContainer" id={"postTextContainer"+id}> {content} </div>
        {moreButton?<button className="postTextContainerMoreBtn" onClick={()=>{setMoreButton(0);var text = document.getElementById('postTextContainer'+id); text.style.display="block";}}><h1 className="caption100">더보기 &gt;</h1></button>:<></>}
        </>
    );
}

export default PostText;