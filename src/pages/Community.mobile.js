import { useEffect, useState } from "react";
import avatarIcon from "../icons/avatar.svg";
import bronzeMedal from "../img/medals/bronzeMedal.svg";
import dotsIcon from "../icons/dots.svg";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
function Community() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [communityPosts,setCommunityPosts] = useState([]);
  const tabList = [
    { id: 0, title: "전체" },
    { id: 1, title: "사업" },
    { id: 2, title: "개발" },
    { id: 3, title: "기획" },
    { id: 4, title: "디자인" },
    { id: 5, title: "기술" },
  ];
  const tabSelected = (id) => {
    setActiveIndex(id);
  };
  useEffect(()=>{//밑에서 return 할때 한번에 map으로 가져오기 위해 useState로 post 내용들 받아오는 코드
    var postsCollectionRef = query(collection(db, 'community'),where("tag","==",activeIndex),orderBy("time",'desc'));
    if(activeIndex==0){
      postsCollectionRef=query(collection(db,"community"),orderBy("time","desc"));
    }
    onSnapshot(postsCollectionRef, (snapshot)=>{
      setCommunityPosts(snapshot.docs.map((doc)=>({
        ...doc.data(),id:doc.id 
      })))
    })
  },[])

  return (
    <div className="mobile-community">
      <div className="mobile-tab_list">
        <div className="mobile-tab_list-items">
          {tabList.map((value, index) => {
            const active = activeIndex === value.id;
            return (
              <div
                key={index}
                className={`mobile-tab_list-item ${active && "active"}`}
                onClick={() => tabSelected(value.id)}
              >
                <h3
                  className={`${
                    active ? "subhead100 text-primary-1" : "body100"
                  }`}
                >
                  {value.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mobile-community-body">
        <button className="mobile-community-new_writing">
          <img src={avatarIcon} className="mobile-avatar-sm mr-8" />
          <h2 className="paragraph200 text-gray-2">
            회원님의 이야기를 공유해주세요.
          </h2>
        </button>
        <div className="mobile-community-writing_card">
          <div className="mobile-user_info">
            <div className="d-flex align-items-center">
              <img src={avatarIcon} className="mobile-avatar-md mr-8" />
              <div className="user-box">
                <div className="user-title">
                  <img src={bronzeMedal} className="mobile-medal" />
                  <h3 className="subhead100 mr-8">유저아이디</h3>
                  <h3 className="body100 text-gray-1">회사이름</h3>
                </div>
                <h2 className="caption100 text-gray-1 mt-3">1시간 전</h2>
              </div>
            </div>
            <div>
              <img src={dotsIcon} className="mobile-dot-md" />
            </div>
          </div>
          <div className="tag_select">
            <div className="chip">
              <h2 className="caption100 text-white">디자인</h2>
            </div>
          </div>
          <div className="mt-16">
            <h2 className="paragraph200">
              인간이 어디 소금이라 청춘 이는 부패뿐이다. 석가는 인도하겠다는
              스며들어 과실이 있는 무엇을 사막이다. 열락의 같은 뛰노는 그들의
              커다란 속잎나고, 것이다.
            </h2>
          </div>
          <div className="btn_more mt-16">
            <h1 className="caption100">더보기 &gt;</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
