import { useEffect, useState } from "react";
import avatarIcon from "../icons/avatar.svg";
import bronzeMedal from "../img/medals/bronzeMedal.svg";
import dotsIcon from "../icons/dots.svg";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";
import TimeCal from "../components/TimeCal";
import heart from "../img/communityImg/bigheart.svg";
import hearted from "../img/communityImg/bighearted.svg";
import profileDefaultImg from "../img/communityImg/defaultprofile.svg";
import message from "../img/communityImg/comment.svg";
import scrap from "../img/communityImg/bookmark.svg";
import scrapped from "../img/communityImg/bookmarked.svg";
import Comments from "../components/Comments";
import TabList from "../components/mobile/TabList";
import IconButton from "../components/IconButton";
import { useNavigate } from "react-router-dom";

function Community() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [communityPosts, setCommunityPosts] = useState([]);

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

  useEffect(() => {
    //밑에서 return 할때 한번에 map으로 가져오기 위해 useState로 post 내용들 받아오는 코드
    var postsCollectionRef = query(
      collection(db, "community"),
      where("tag", "==", activeIndex),
      orderBy("time", "desc")
    );
    if (activeIndex == 0) {
      postsCollectionRef = query(
        collection(db, "community"),
        orderBy("time", "desc")
      );
    }
    onSnapshot(postsCollectionRef, (snapshot) => {
      setCommunityPosts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);

  const [filterCommunity, setFilterCommunity] = useState([]);
  useEffect(() => {
    let filterList = [...communityPosts];
    if (communityPosts.length > 0 && activeIndex !== 0) {
      filterList = filterList.filter((value) => value.tag === activeIndex);
    }
    setFilterCommunity(filterList);
  }, [activeIndex, communityPosts]);

  return (
    <div className="mobile-community">
      <TabList list={tabList} activeIndex={activeIndex} onClick={tabSelected} />
      <div className="py-20">
        <button className="mobile-community-new_writing d-flex align-items-center w-100 my-16 border-radius-sm border-gray-3">
          <img src={avatarIcon} className="mobile-avatar-sm mr-8" />
          <h2 className="paragraph200 text-gray-2">
            회원님의 이야기를 공유해주세요.
          </h2>
        </button>
        {filterCommunity.map((value, index) => {
          const tag = tabList.filter((val) => val.id === value.tag);
          return (
            <div className="mobile-community-writing_card" key={index}>
              <div className="mobile-user_info">
                <div className="d-flex align-items-center">
                  <img src={avatarIcon} className="mobile-avatar-md mr-8" />
                  <div className="user-box">
                    <div className="user-title">
                      <img
                        src={bronzeMedal}
                        className="mobile-community-medal"
                      />
                      <h3 className="subhead100 mr-8">{value.author.name}</h3>
                      <h3 className="body100 text-gray-1">회사이름</h3>
                    </div>
                    <div className="text-gray-1 mt-3">
                      <TimeCal time={value.time} />
                    </div>
                  </div>
                </div>
                <div>
                  <img src={dotsIcon} className="mobile-dot-md" />
                </div>
              </div>
              <div className="tag_select">
                <div className="chip">
                  <h2 className="caption100 text-white">{tag[0].title}</h2>
                </div>
              </div>
              <div className="mt-16">
                <h2 className="paragraph200 mobile-community-post-text">
                  {value.postText}
                </h2>
              </div>
              <div className="text-right mt-16">
                <h1 className="caption100">더보기 &gt;</h1>
              </div>
              <div className="mobile-foot d-flex justify-content-around">
                <div>
                  <h1 className="caption100 d-flex align-items-center">
                    <img src={heart} className="items-icon" />
                    공감
                    {value.likeCount}개
                  </h1>
                </div>
                <div>
                  <h1 className="caption100 d-flex align-items-center">
                    <img src={message} className="items-icon" />
                    댓글 {value.commentCount}개
                  </h1>
                </div>
                <div>
                  <h1 className="caption100 d-flex align-items-center">
                    <img src={scrap} className="items-icon" />
                    북마크
                  </h1>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="action-button">
        <IconButton
          size="lg"
          variant="primary"
          icon="plus"
          onClick={() => navigate("/app/beta-test/create")}
        />
      </div>
    </div>
  );
}

export default Community;
