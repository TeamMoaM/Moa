import { getDoc, getDocs, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase-config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../style/myPosts.css";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const postsCollectionRef = collection(db, "posts");
    var q = query(
      postsCollectionRef,
      orderBy("time", "desc"),
      where("author.id", "==", auth.currentUser.uid)
    );
    onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  });
  const postClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="myPosts">
      <div className="BetaTestPosts">
        {posts &&
          posts.map((post) => {
            return (
              <>
                <div
                  onClick={() => {
                    postClick(post.id);
                  }}
                  className="postBox"
                >
                  <img
                    id="myimg"
                    className="border8px"
                    src={post.imageURL}
                  ></img>
                  <div className="post_title">
                    <h2 className="subhead100">{post.title}</h2>
                  </div>
                  <div className="post_content">
                    <h3 className="body150">{post.content}</h3>
                  </div>
                  <div className="post_commentAndreview">
                    <h3 className="body100">
                      댓글 {post.commentCount ? post.commentCount : 0}개 | 리뷰{" "}
                      {post.reviewCount ? post.reviewCount : 0}개
                    </h3>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}
export default MyPosts;
