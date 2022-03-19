import "../style/BetaTest.css";
import TestImg from "../img/post/camera.svg";
function BetaTest() {
  const data = [
    {
      src: TestImg,
      title: "서비스 명1",
      content: "간략한 설명이 들어가요. 최대로 두 줄까지 쓰인답니다.",
      commentCount: 11,
      reviewCount: 22,
    },
    {
      src: TestImg,
      title: "서비스 명2",
      content: "간략한 설명이 들어가요. 최대로 두 줄까지 쓰인답니다.",
      commentCount: 11,
      reviewCount: 22,
    },
    {
      src: TestImg,
      title: "서비스 명3",
      content: "간략한 설명이 들어가요. 최대로 두 줄까지 쓰인답니다.",
      commentCount: 11,
      reviewCount: 22,
    },
    {
      src: TestImg,
      title: "서비스 명4",
      content: "간략한 설명이 들어가요. 최대로 두 줄까지 쓰인답니다.",
      commentCount: 11,
      reviewCount: 22,
    },
    {
      src: TestImg,
      title: "서비스 명5",
      content: "간략한 설명이 들어가요. 최대로 두 줄까지 쓰인답니다.",
      commentCount: 11,
      reviewCount: 22,
    },
    {
      src: TestImg,
      title: "서비스 명6",
      content: "간략한 설명이 들어가요. 최대로 두 줄까지 쓰인답니다.",
      commentCount: 11,
      reviewCount: 22,
    },
    {
      src: TestImg,
      title: "서비스 명7",
      content: "간략한 설명이 들어가요. 최대로 두 줄까지 쓰인답니다.",
      commentCount: 11,
      reviewCount: 22,
    },
    {
      src: TestImg,
      title: "서비스 명8",
      content: "간략한 설명이 들어가요. 최대로 두 줄까지 쓰인답니다.",
      commentCount: 11,
      reviewCount: 22,
    },
  ];
  return (
    <div className="betaTest-wrap">
      <h3 className="title100 text-primary-1">β-test</h3>
      <h3 className="body150 text-black BetaTest-body-text">
        회원님들의 서비스를 테스트할 수 있는 곳입니다.
      </h3>
      <div className="betaTest-content">
        {data.map((value, index) => {
          return (
            <div key={index} className="betaTest-item">
              <img src={value.src} className="item-img" />
              <h2 className="subhead100 item-title">{value.title}</h2>
              <h4 className="body150 item-content">{value.content}</h4>
              <h1 className="caption100 item-content text-gray-1">
                댓글 {value.commentCount}개 | 리뷰 {value.reviewCount}개
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BetaTest;
