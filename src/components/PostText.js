import React ,{useState,useEffect}from 'react';

function PostText({id,content}) {
    const [moreButton,setMoreButton] = useState(1);
    function isEllipsisActive(e) {
        return (e.offsetHeight < e.scrollHeight);
   }
    useEffect(()=>{
        const div = document.getElementById('postTextContainer'+id);
        if(div.scrollHeight<=150){
            setMoreButton(0);
        }
        
    })
    return (
        <>
        <div className="postTextContainer" id={"postTextContainer"+id}> {content} </div>
        {moreButton?
            <button className="postTextContainerMoreBtn" onClick={()=>{setMoreButton(0);var text = document.getElementById('postTextContainer'+id); text.style.display="block";}}>
                <h1 className="caption100">더보기 &gt;</h1>
            </button>
        :<></>}
        </>
    );
}

export default PostText;