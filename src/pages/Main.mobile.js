import React from "react";
import cardImage from "../icons/card.mobile.svg";
function Main() {
  return (
    <div className="mobile-wrap">
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
    </div>
  );
}
export default Main;
