// import { } from 'firebase/firestore';
import React from 'react';
import { useEffect } from 'react/cjs/react.development';

function ReplyComment() {
//    console.log(comments);
    return (
      
            <div className="comment">
            <div className="postHeader">
                <div className="postInformation">
                    <img className="pfpimage"/>
                    <div className="postProfile">
                        <div className="postProfile1">
                            <h5 id="postAuthorName"className="point100"></h5><h5 id="postCompanyName"className="point100">{"회사 이름"}</h5>
                        </div>
                        <div className="postProfile1"><h2 className="caption100">{"1시간 전"}</h2></div>
                    </div>
                </div>
                <div className="postEdit">
                    <button onClick={()=>{console.log("edit!")}}><h2 id='edit'className="caption100">수정하기</h2></button>
                    <h2 className="caption100"id='editdivider'>|</h2>
                    <button onClick={()=>{console.log("delete!")}}><h2 id='delete'className="caption100">삭제하기</h2></button>
                </div>
            </div>
            <div className="postTextContainer">  </div>
            </div>
        
    );
}

export default ReplyComment;