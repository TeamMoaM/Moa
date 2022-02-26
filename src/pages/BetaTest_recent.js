import React,{useState,useEffect} from 'react';
import {db} from '../firebase-config';
import {Link} from 'react-router-dom';
import {orderBy,collection,onSnapshot,query, startAt, limit,doc, getDoc} from "firebase/firestore";
import {useNavigate} from 'react-router-dom';
import Post from './Post';
import '../style/BetaTest.css';
import ReactPaginate from 'react-paginate';
function BetaTest_recent({setList}){
    const postsCollectionRef = collection(db, "posts");
    const [posts,setPosts] = useState([]);
    const navigate = useNavigate();
    const [totalPage, setTotalPage] = useState(0);
    const [pageNumber,setPageNumber] = useState(0);
    const onepageNumber = 16;
    setList(2);
    const q = query(postsCollectionRef, orderBy("id"),startAt((pageNumber)*onepageNumber+1),limit(onepageNumber));
    console.log(pageNumber);
    useEffect(()=>{
        onSnapshot(q, (snapshot)=>
          {
            setPosts(snapshot.docs.map((doc)=>({
                ...doc.data(), id: doc.id,title: doc.data().title, content: doc.data().content, imageURL:doc.data().imageURL, commentCount: doc.data().commentCount, reviewCount: doc.data().reviewCount
            }))); 
          }
        )
        getDoc(doc(db,'docCount','docCount')).then((docSnap)=>{
            if(docSnap.exists()){
                setTotalPage(Math.ceil(docSnap.data().docCount/onepageNumber));
            }
        })
    },[pageNumber])
    const postClick = (id) => {
        navigate(`/post/${id}`);
    }
    const changePage = ({selected}) => {
        setPageNumber(selected);
    }
    

    return(
        <div className="BetaTest">
            <div className="functions">
                <div className="BetaTestOrder">
                    <Link className="linkRecentOrderRecent"to='/BetaTest/recentOrder'><h3 className="subhead3">최신순</h3></Link>
                    <div className="BetaTestOrderBlockLine">|</div>
                    <Link className="linkLateOrderRecent"to='/BetaTest/lateOrder'><h3 className="subhead3">오래된순</h3></Link>
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
                <ReactPaginate 
                    previousLabel={"<"}
                    nextLabel={">"}
                    pageCount={totalPage}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledLinkClassName={"paginationDisabled"}
                    activeLinkClassName={"paginationActive"}
                />
            </div>
            <div className="footer"></div>
            
        </div>
    )
}
export default BetaTest_recent;