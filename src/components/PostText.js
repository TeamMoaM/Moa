import React ,{useState}from 'react';

function PostText({postId,content}) {
    const [moreButton,setMoreButton] = useState(1);
    return (
        <>
        <div className="postTextContainer" id={"postTextContainer"+postId}> {content} </div>
        {moreButton?<button className="postTextContainerMoreBtn" onClick={()=>{setMoreButton(0);var text = document.getElementById('postTextContainer'+postId); text.style.display="block";}}><h1 className="caption100">더보기 &gt;</h1></button>:<></>}
        </>
    );
}

export default PostText;