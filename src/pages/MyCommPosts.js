import React, { useState, useEffect } from "react";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db, auth } from "../firebase-config";
import xIcon from "../img/communityImg/x_icon.svg";
import tag from "../img/communityImg/tag.svg";
import Comments from "../components/Comments";
import TimeCal from "../components/TimeCal";
import PostText from "../components/PostText";
import pageUpImg from "../img/communityImg/pageup_btn.svg";
import bronzeMedal from "../img/medals/bronzeMedal.svg";
import heart from "../img/communityImg/bigheart.svg";
import hearted from "../img/communityImg/bighearted.svg";
import profileDefaultImg from "../img/communityImg/defaultprofile.svg";
import message from "../img/communityImg/comment.svg";
import scrap from "../img/communityImg/bookmark.svg";
import scrapped from "../img/communityImg/bookmarked.svg";
import Popup from "reactjs-popup";

function MyCommPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const postsCollectionRef = collection(db, "community");
    var q = query(
      postsCollectionRef,
      orderBy("time", "desc"),
      where("author.id", "==", auth.currentUser.uid)
    );
    onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    });
  });
  return (
    <div>
      <h1 className="body100">My Community Posts</h1>
      {posts &&
        posts.map((post) => {
          return (
            <>
              {/* 필요한 레포가 있다면 언제든지 call */}
              <div>{post.likeCount}</div>
              <div>{post.postText}</div>
            </>
          );
        })}
    </div>
  );
}
export default MyCommPosts;
