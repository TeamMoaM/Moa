import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  query,
  where,
  limit,
  getDoc,
  setDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate, Link } from "react-router-dom";
import {
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import heart from "../img/communityImg/bigheart.svg";
import hearted from "../img/communityImg/bighearted.svg";
import profileDefaultImg from "../img/communityImg/defaultprofile.svg";
import message from "../img/communityImg/comment.svg";
import scrap from "../img/communityImg/bookmark.svg";
import scrapped from "../img/communityImg/bookmarked.svg";
import Popup from "reactjs-popup";
import styled from "styled-components";
import xIcon from "../img/communityImg/x_icon.svg";
import tag from "../img/communityImg/tag.svg";
import Comments from "../components/Comments";
import TimeCal from "../components/TimeCal";
import PostText from "../components/PostText";
import pageUpImg from "../img/communityImg/pageup_btn.svg";
import bronzeMedal from "../img/medals/bronzeMedal.svg";
import silverMedal from "../img/medals/silverMedal.svg";
import goldMedal from "../img/medals/goldMedal.svg";
import "reactjs-popup/dist/index.css";
import "../style/community.css";

function Community({ setCommunityBool, setList, isAuth, setIsAuth }) {
  const [postLists, setPostList] = useState([]);
  const [comment, setComment] = useState([]);
  // const [commentToggle,setCommentToggle] =useState('asd');
  const [user, setCurrentUser] = useState({});
  const [postText, setPostText] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [tagSelect, setTagSelect] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [position, setPosition] = useState(0);
  const [communityTagClicked, setCommunityTagClicked] = useState(0);

  let postsCollectionRef = query(
    collection(db, "community"),
    where("tag", "==", communityTagClicked),
    orderBy("time", "desc")
  );
  const [scrapBool, setScrapBool] = useState([]);
  const communityTagsAndSearch = useRef(null);

  setCommunityBool(true);
  const navigate = useNavigate();
  setList(3);

  setPersistence(auth, browserSessionPersistence).then(() => {});
  onAuthStateChanged(auth, (User) => {
    setCurrentUser(User);
    if (User) {
      setIsAuth(true);
    }
  });

  useEffect(() => {
    //밑에서 return 할때 한번에 map으로 가져오기 위해 useState로 post 내용들 받아오는 코드
    if (communityTagClicked == 0) {
      postsCollectionRef = query(
        collection(db, "community"),
        orderBy("time", "desc")
      );
    }

    onSnapshot(postsCollectionRef, (snapshot) => {
      setPostList(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, [communityTagClicked]);

  useEffect(() => {
    if (isAuth) {
      console.log(isAuth);
      if (user.uid) {
        getDoc(doc(db, "userInfo", user.uid)).then((docsnap) => {
          const scr = docsnap.data().scrapCommunity;
          setScrapBool(scr);
        });
      }
    }
  }, [user]);

  const deletePost = async (id) => {
    //해당 id의 post 삭제하는 함수(currentUser의 게시물인지 확인 필요)
    const postDoc = doc(db, "community", id);
    // await deleteDoc(postDoc);
  };
  const addComment = async (id) => {
    //comment 추가했을때 comment 내용이랑 comment commentPoeple추가하는 함수(post id 필요)
    if (isAuth) {
      //댓글 개수 제한?
      const docSnap = await getDoc(doc(db, "community", id));
      let commentCount = docSnap.data().commentCount;
      commentCount = commentCount + 1;
      console.log("count:" + commentCount);
      commentCount = String(commentCount);
      const docRef = doc(db, "community", id, "comments", commentCount);
      setDoc(docRef, {
        content: comment,
        commentPeople: user.displayName,
        time: new Date(),
        replyComments: [],
        like: [],
        likeCount: 0,
      });
      commentCount = Number(commentCount);
      await updateDoc(doc(db, "community", id), { commentCount: commentCount });
    }
  };

  // const commentToggles = async (id) =>{
  //   setCommentToggle(id);
  // }
  const addLike = async (id) => {
    if (isAuth) {
      const postDoc = doc(db, "community", id);
      const docSnap = await getDoc(postDoc);
      let likeCount = 0;
      likeCount = docSnap.data().likeCount;
      let userLike = 0;
      if (likeCount > 0) {
        docSnap.data().like.forEach((liker) => {
          if (liker === user.displayName) {
            userLike = 1;
          }
        });
      }
      if (userLike) {
        //이 사람이 이미 좋아요를 눌러 놓은 상태에서 다시 누른 경우
        likeCount = likeCount - 1;
        await updateDoc(doc(db, "community", id), {
          likeCount: likeCount,
          like: arrayRemove(auth.currentUser.displayName),
        });
      } else {
        // 이사람이 좋아요 안누를 상태에서 좋아요 누른 경우
        likeCount = likeCount + 1;
        await updateDoc(doc(db, "community", id), {
          likeCount: likeCount,
          like: arrayUnion(auth.currentUser.displayName),
        });
      }
    } else {
      window.location.href = "/login";
    }
  };
  const createPost = async () => {
    console.log("postText");

    await addDoc(collection(db, "community"), {
      postText: postText,
      time: new Date().getTime() / 1000,
      commentCount: 0,
      author: { name: user.displayName, id: user.uid },
      like: [],
      likeCount: 0,
      tag: tagSelect,
    });
    navigate("/Community");
    window.location.reload();
  };
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const inputPress = async (e, id) => {
    if (e.key === "Enter") {
      var input = document.getElementById("commentAddInput" + id);
      input.value = "";
      await addComment(id);
    }
  };
  // const post = useRef(null);
  const commentButtonStyle = {
    postion: "absolute",
    bottom: "0",
    right: "0",
  };
  const communityScrap = (id) => {
    if (isAuth) {
      if (id && user.uid) {
        setDoc(
          doc(db, "userInfo", user.uid),
          { scrapCommunity: arrayUnion(id) },
          { merge: true }
        );
        getDoc(doc(db, "userInfo", user.uid)).then((docsnap) => {
          setScrapBool(docsnap.data().scrapCommunity);
        });
      }
    } else {
      navigate("/login");
    }
  };
  const communityUnscrap = (id) => {
    if (id && user.uid) {
      updateDoc(doc(db, "userInfo", user.uid), {
        scrapCommunity: arrayRemove(id),
      });
      getDoc(doc(db, "userInfo", user.uid)).then((docsnap) => {
        setScrapBool(docsnap.data().scrapCommunity);
      });
    }
  };

  function onScroll() {
    setPosition(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });
  useEffect(() => {
    //scroll up 기능
    if (position >= 104) {
      communityTagsAndSearch.current.style.top = "32px";
    } else {
      communityTagsAndSearch.current.style.top = "104px";
    }
  }, [position]);
  useEffect(() => {
    setTagSelect(communityTagClicked);
  }, [communityTagClicked]);

  const onScrollZero = () =>
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  const getClassById = (id) => {
    return communityTagClicked === id
      ? "communityTagClicked"
      : "communityTagUnClicked";
  };

  const getButtonClassById = (id) => {
    return tagSelect === id ? "modalClickedButton" : "modalUnclickedButton";
  };

  const tagList = [
    {
      id: 0,
      icon: <span>&#128196;</span>,
      title: "모든 태그",
    },
    {
      id: 1,
      icon: <span>&#128188;</span>,
      title: "사업",
    },
    {
      id: 2,
      icon: <span>&#128187;</span>,
      title: "개발",
    },
    {
      id: 3,
      icon: <span>&#128196;</span>,
      title: "기획",
    },
    {
      id: 4,
      icon: <span>&#127912;</span>,
      title: "디자인",
    },
    {
      id: 5,
      icon: <span>&#128241;</span>,
      title: "기술",
    },
  ];

  return (
    <div className="homePage">
      <div ref={communityTagsAndSearch} className="communityTagsAndSearch">
        <div className="communityTagsBox">
          <h1 className="subhead100">태그</h1>
          {/* left bar */}
          <div className="communityTags">
            {tagList.map((value) => {
              return (
                <div
                  onClick={() => {
                    setCommunityTagClicked(value.id);
                    onScrollZero();
                  }}
                  className={`${getClassById(value.id)}`}
                >
                  <h4 className="title100">{value.icon}</h4>
                  <h2 className="subhead100">{value.title}</h2>
                </div>
              );
            })}
          </div>
        </div>
        <div className="communitySearch">
          <input
            className="communitySearchInput"
            placeholder="Community 검색"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          <div onClick={onScrollZero} className="pageUpButton">
            <img className="pageUpButtonImg" src={pageUpImg} />
          </div>
        </div>
      </div>
      <Popup
        contentStyle={{
          padding: "23px",
          width: "500px",
          boxSizing: "border-box",
          height: "443px",
          borderRadius: "8px",
          boxShadow: "0px 4px 24px rgba(0, 1, 3, 0.1)",
        }}
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
      >
        <div className="modal">
          <div className="modalHeader">
            <h4 className="title100">새로운 게시물</h4>
            <img className="close" onClick={closeModal} src={xIcon} />
          </div>
          <div className="modalSecondHeader">
            <img src={tag} />
            {/* tag in popup */}
            {tagList.map((value) => {
              if (value.id === 0) return;
              return (
                <button
                  onClick={() => {
                    setTagSelect(value.id);
                  }}
                  className={getButtonClassById(value.id)}
                >
                  <h3 className="body100">{value.title}</h3>
                </button>
              );
            })}
          </div>
          <textarea
            id="popupTextarea"
            onChange={(event) => {
              console.log(event.target.value);
              setPostText(event.target.value);
            }}
            className="modalContentWriteTextarea"
            placeholder="회원님의 이야기를 공유해주세요."
          ></textarea>
          <div className="divider"></div>
          <button onClick={createPost} className="modalpostButton">
            <h3 className="subhead100">게시물 올리기</h3>
          </button>
        </div>
      </Popup>
      <div className="postWrap">
        <button
          onClick={() => {
            if (isAuth) {
              setOpen((o) => !o);
            } else {
              navigate("/login");
            }
          }}
          className="firstPost"
        >
          <img className="firstPostImage" src={profileDefaultImg} />
          <div className="firstPostButton">
            <h1 className="caption151">회원님의 이야기를 공유해주세요.</h1>
          </div>
        </button>
        {postLists
          .filter((post) => post.postText.includes(searchTerm))
          .map((post) => {
            return (
              <div className="post">
                <div className="firstPostHeader">
                  <div className="postInformation">
                    <img className="pfpimage" src={profileDefaultImg} />
                    <div className="postProfile">
                      <div className="postProfile1">
                        <img src={bronzeMedal} />
                        <h3 id="postAuthorName" className="subhead100">
                          {post.author.name}
                        </h3>
                        <h3 id="postCompanyName" className="body100">
                          {"회사 이름"}
                        </h3>
                      </div>
                      <div className="postProfile1">
                        <TimeCal time={post.time} />
                      </div>
                    </div>
                  </div>
                  {isAuth && user.uid === post.author.id && (
                    <div className="postEdit">
                      <button
                        id="edit"
                        onClick={() => {
                          console.log("edit!");
                        }}
                      >
                        <h2 id="editH" className="caption100">
                          수정하기
                        </h2>
                      </button>
                      <h2 className="caption100" id="editdivider">
                        |
                      </h2>
                      <button
                        id="delete"
                        onClick={() => {
                          console.log("delete!");
                        }}
                      >
                        <h2 id="deleteH" className="caption100">
                          삭제하기
                        </h2>
                      </button>
                    </div>
                  )}
                </div>
                <div className="postTagWrap">
                  {/* tag in post */}
                  {tagList.map((value) => {
                    if (value.id !== post.tag) return;
                    return (
                      <div className="postTag">
                        <div className="modalClickedButton">
                          <h3 className="body100">{value.title}</h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <PostText id={post.id} content={post.postText} />
                <hr className="breakLine" />
                <div className="likeAndComment">
                  <div
                    className="likeButton"
                    id={post.id}
                    onClick={() => addLike(post.id)}
                  >
                    {isAuth && post.like.includes(user.displayName) ? (
                      <img src={hearted} />
                    ) : (
                      <img src={heart} />
                    )}
                    <h1 className="caption100">공감 {post.likeCount}개</h1>
                  </div>
                  <div className="messageBox">
                    <img src={message} />
                    <h1 className="caption100">댓글 {post.commentCount}개</h1>
                  </div>
                  {scrapBool.includes(post.id) ? (
                    <div
                      className="bookMark"
                      onClick={() => communityUnscrap(post.id)}
                    >
                      <img src={scrapped} />
                      <h1 className="caption100">북마크</h1>
                    </div>
                  ) : (
                    <div
                      className="bookMark"
                      onClick={() => communityScrap(post.id)}
                    >
                      <img src={scrap} />
                      <h1 className="caption100">북마크</h1>
                    </div>
                  )}
                </div>
                {/* 댓글 구현  */}
                <Comments id={post.id} user={user} isAuth={isAuth} />

                <div className="inputAndButton">
                  <input
                    onBlur={() => {
                      let button = document.getElementById(post.id + "button");
                      button.style.borderColor = "#E8E8EE";
                      let input = document.getElementById(
                        "commentAddInput" + post.id
                      );
                      input.value = "";
                    }}
                    onFocus={() => {
                      let button = document.getElementById(post.id + "button");
                      button.style.borderColor = "#2727AD";
                      button.style.boxSizing = "border-box";
                      button.style.display = "block";
                      let input = document.getElementById(
                        "commentAddInput" + post.id
                      );
                      input.value = "";
                      input.style.borderRight = "none";
                      input.style.borderTopRightRadius = "0px";
                      input.style.borderBottomRightRadius = "0px";
                    }}
                    onKeyPress={(e) => {
                      inputPress(e, post.id);
                    }}
                    id={"commentAddInput" + post.id}
                    className="postCommentInput"
                    placeholder="회원님의 의견을 공유해주세요."
                    onChange={(event) => {
                      setComment(event.target.value);
                    }}
                  />
                  <button
                    id={post.id + "button"}
                    style={commentButtonStyle}
                    className="commentSendButton"
                    onClick={() => {
                      addComment(post.id);
                    }}
                  >
                    <h3 className="subhead100">등록</h3>
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <div className="communityFooter"></div>
    </div>
  );
}
export default Community;
