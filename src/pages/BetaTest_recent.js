import React,{useState,useEffect} from 'react';
import {db} from '../firebase-config';
import {Link} from 'react-router-dom';
import {orderBy,collection,onSnapshot,query, startAt, limit} from "firebase/firestore";
import {useNavigate} from 'react-router-dom';
import Post from './Post';
function BetaTest_recent({currentPage}){
    const postsCollectionRef = collection(db, "posts");
    const [posts,setPosts] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [currentPageList, setCurrentPageList] = useState([1,2,3,4,5]);
    const q = query(postsCollectionRef, orderBy("id"),startAt((currentPage-1)*16+1),limit(16));
    const navigate = useNavigate();
   
    useEffect(()=>{
        onSnapshot(q, (snapshot)=>
          {
            setPosts(snapshot.docs.map((doc)=>({
                ...doc.data(), id: doc.id,title: doc.data().title, content: doc.data().content, imageURL:doc.data().imageURL, commentCount: doc.data().commentCount, reviewCount: doc.data().reviewCount
            }))); 
          }
        )
    },false)
    const postClick = (id) => {
        navigate(`/post/${id}`);
    }
    //6 7 8 9 10
    
    // useEffect(()=>{
    //     console.log(currentPage);
    // },[currentPage]);

    // function PageOnClick(clickedPage){
    //     console.log("clickedpage:"+clickedPage);
    //     let share = parseInt(currentPage/5);
    //     setCurrentPage(share*5+clickedPage);
    //     console.log("realcurrentPage:"+Number(share*5+clickedPage));

    // }
    return(
        <div className="BetaTest">
            <div className="functions">
                <div className="BetaTestOrder">
                    <Link className="linkRecentOrder"to='/BetaTest/recentOrder'><h3 className="subhead3">최신순</h3></Link>
                    <div className="BetaTestOrderBlockLine">|</div>
                    <Link className="linkLateOrder"to='/BetaTest/lateOrder'><h3 className="subhead3">오래된순</h3></Link>
                </div>
                <button className="functionsCreatePostButton"><Link className="functionsCreatePostLink" to='/createPost'>새 글 등록</Link></button>
            </div>
            <div className="BetaTestPosts">
                {
                    posts&&posts.map((post)=>{
                        return(
                            <div onClick={()=>{postClick(post.id)}} className="post">
                                <img id="myimg" src={post.imageURL}></img>
                                <div className="post_title">{post.title}</div>
                                <div className="post_content">{post.content}</div>
                                <div className="post_commentAndreview">
                                    댓글 {post.commentCount? post.commentCount: 0}개 | 리뷰 {post.reviewCount? post.reviewCount: 0}개
                                </div>
                            </div>
                        )
                        
                    })
                }
            </div>
            {/* pagination */}
            <div className="pagination">
                <button className="previous_page">&lt;</button>
                <Link to='/BetaTest/recentOrder/1' onClick={()=>{window.loacation.reload()}} className="first_page">{1}</Link>
                <Link to='/BetaTest/recentOrder/2' onClick={()=>{window.loacation.reload()}} className="second_page">{2}</Link>
                <Link to='/BetaTest/recentOrder/3' onClick={()=>{window.loacation.reload()}} className="third_page">{3}</Link>
                <Link to='/BetaTest/recentOrder/4' onClick={()=>{window.loacation.reload()}} className="fourth_page">{4}</Link>
                <Link to='/BetaTest/recentOrder/5' onClick={()=>{window.loacation.reload()}} className="fifth_page">{5}</Link>
                <button className="next_page" >&gt;</button>

            </div>
            
        </div>
    )
}
export default BetaTest_recent;