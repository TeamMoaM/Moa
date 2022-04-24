import React, { useState, useEffect } from "react";
import {
  query,
  getDoc,
  collection,
  deleteDoc,
  doc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import "../style/myPageInfo.css";
import MyPageEdit from "./MyPageEdit";
import MyPageEduEdit from "./myPageEduEdit";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import xIcon from "../img/communityImg/x_icon.svg";
import plusIcon from "../icons/plus.svg";

function MyPageInfo({ setList, user }) {
  const [add, setAdd] = useState(false);
  const [eduAdd, setEduAdd] = useState(false);
  const [users, setUsers] = useState({});
  const [postList, setCareerList] = useState([]);
  const [eduList, setEduList] = useState([]);
  const closeCarModal = () => setAdd(false);
  const closeEduModal = () => setEduAdd(false);

  setList(1);
  onAuthStateChanged(auth, (currentUser) => {
    setUsers(currentUser);
  });

  useEffect(() => {
    if (users.displayName) {
      const postRef = query(
        collection(doc(collection(db, "userInfo"), users.uid), "career")
      );
      onSnapshot(postRef, (snapshot) => {
        setCareerList(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
      const educationRef = query(
        collection(doc(collection(db, "userInfo"), users.uid), "education")
      );
      onSnapshot(educationRef, (snapshot) => {
        setEduList(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    }
  }, [users]);
  return (
    <>
      <div className="infoCard">
        <div className="cardTitle">
          <h3 className="body100">경력</h3>
          <button className="add" onClick={() => setAdd((o) => !o)}>
            <img className="plusIcon" src={plusIcon}></img>
            <h2 className="caption100">추가</h2>
          </button>
          <Popup
            contentStyle={{
              padding: "24px",
              width: "500px",
              boxSizing: "border-box",
              height: "446px",
              borderRadius: "8px",
              boxShadow: "0px 4px 24px rgba(0, 1, 3, 0.1)",
            }}
            open={add}
            closeOnDocumentClick
            onClose={closeCarModal}
          >
            <div className="popupTitle">
              <h4 className="title100">경력추가</h4>
              <img
                className="close"
                onClick={() => {
                  closeCarModal();
                }}
                src={xIcon}
              />
            </div>
            <MyPageEdit />
          </Popup>
          {/* {!add?
                    <button className='add' onClick={()=>{setAdd(1)}}>추가(경력)</button>
                :
                    <><button className='add' onClick={()=>{setAdd(0)}}>취소</button>
                    <MyPageEdit/></>
                } */}
        </div>
        <div className="contentsList">
          {postList.length != 0 ? (
            postList &&
            postList.map((post) => {
              return (
                <>
                  <div className="contentsListItems">
                    <h1 className="subhead100">{post.company.name}</h1>
                    <h2 className="body100">{post.company.role}</h2>
                    <h4 className="body100">
                      {post.company.time.timeStartYear}년 ~{" "}
                      {post.company.time.timeEndYear}년
                    </h4>
                  </div>
                  <div className="divider"></div>
                </>
              );
            })
          ) : (
            <div className="contentNull">
              <h1 className="body100">등록된 정보가 없습니다.</h1>
            </div>
          )}
        </div>
      </div>
      <div className="infoCard">
        <div className="cardTitle">
          <h3 className="body100">학력</h3>
          <button className="add" onClick={() => setEduAdd((o) => !o)}>
            <img className="plusIcon" src={plusIcon}></img>
            <h2 className="caption100">추가</h2>
          </button>
          <Popup
            contentStyle={{
              padding: "24px",
              width: "500px",
              boxSizing: "border-box",
              height: "446px",
              borderRadius: "8px",
              boxShadow: "0px 4px 24px rgba(0, 1, 3, 0.1)",
            }}
            open={eduAdd}
            closeOnDocumentClick
            onClose={closeEduModal}
          >
            <div className="popupTitle">
              <h4 className="title100">학력추가</h4>
              <img
                className="close"
                onClick={() => {
                  closeEduModal();
                }}
                src={xIcon}
              />
            </div>
            <MyPageEduEdit />
          </Popup>
        </div>
        <div className="contentsList">
          {eduList.length != 0 ? (
            eduList &&
            eduList.map((post) => {
              return (
                <>
                  <div className="contentsListItems">
                    <h1 className="subhead100">{post.school.name}</h1>
                    <h2 className="body100">{post.school.major}</h2>
                    <h4 className="body100">
                      {post.school.time.timeStartYear}년 ~{" "}
                      {post.school.time.timeEndYear}년
                    </h4>
                  </div>
                  <div className="divider"></div>
                </>
              );
            })
          ) : (
            <div className="contentNull">
              <h1 className="body100">등록된 정보가 없습니다.</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default MyPageInfo;
