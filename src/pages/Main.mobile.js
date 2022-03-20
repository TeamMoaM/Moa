import React, { useEffect, useState } from "react";
import cardImage from "../icons/card.mobile.svg";
import "../style/BetaTest.css";
import TestImg from "../img/post/camera.svg";
import { Link } from "react-router-dom";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase-config";

function Main() {
  const [data,setData] = useState([])
  useEffect(()=>{
    const postsCollectionRef = collection(db, "posts");
    var q = query(postsCollectionRef, orderBy("time",'desc'),limit(4));
    onSnapshot(q, (snapshot)=>
      {
        setData(snapshot.docs.map((doc)=>({
            ...doc.data()
        }))); 
      }
    )
  })
  // const data = [
  //   {
  //     src: TestImg,
  //     title: "서비스 명1",
  //     content: "간략한 설명이 들어가요. 최대로 두 줄까지 쓰인답니다.",
  //     commentCount: 11,
  //     reviewCount: 22,
  //   },
  //   {
  //     src: TestImg,
  //     title: "서비스 명2",
  //     content: "간략한 설명이 들어가요. 최대로 두 줄까지 쓰인답니다.",
  //     commentCount: 11,
  //     reviewCount: 22,
  //   },
  //   {
  //     src: TestImg,
  //     title: "서비스 명3",
  //     content: "간략한 설명이 들어가요. 최대로 두 줄까지 쓰인답니다.",
  //     commentCount: 11,
  //     reviewCount: 22,
  //   },
  //   {
  //     src: TestImg,
  //     title: "서비스 명4",
  //     content: "간략한 설명이 들어가요. 최대로 두 줄까지 쓰인답니다.",
  //     commentCount: 11,
  //     reviewCount: 22,
  //   },
  // ];
  return (
    <div>
      <div className="mobile-main-title">
        <h4 className="title150">
          내 서비스를 공유하고
          <br />
          손쉽게 테스트 해보세요.
        </h4>
      </div>
      <div className="mobile-main-subtitle">
        <h2 className="body150">
          MOA에서는 회원님의 서비스를 테스트하고
          <br />
          다른 사업자분들의 서비스도
          <br />
          체험해보실 수 있습니다.
        </h2>
      </div>
      <div className="mobile-card">
        <img className="mobile-card-img" src={cardImage} />
      </div>
      <div className="mobile-main-content">
        <h1 className="subhead100 mobile-main-content-title">
          베타테스트 서비스 구경하기
        </h1>
        {data&&data.map((value, index) => {
          return (
            <div key={index} className="betaTest-item">
              <img src={value.imageURL} className="item-img" />
              <h2 className="subhead100 item-title">{value.title}</h2>
              <h4 className="body150 item-content">{value.content}</h4>
              <h1 className="caption100 item-content text-gray-1">
                댓글 {value.commentCount}개 | 리뷰 {value.reviewCount}개
              </h1>
            </div>
          );
        })}
        <div className="mobile-main-content-footer">
          <Link to="/app/beta-test">
            <h3 className="subhead100 text-primary-1">서비스 더보기 &gt;</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Main;
