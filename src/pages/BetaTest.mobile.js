import "../style/BetaTest.css";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import IconButton from "../components/IconButton";
import { BetaTestContextStore } from "../stores/betaTestStore";

function BetaTest() {
  const { setInitialValue } = useContext(BetaTestContextStore);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const postsCollectionRef = collection(db, "posts");
    var q = query(postsCollectionRef, orderBy("time", "desc"));
    onSnapshot(q, (snapshot) => {
      setData(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    });
  }, []);

  const goView = (value) => {
    navigate(`/app/beta-test/${value.id}`);
    setInitialValue(value);
  };

  return (
    <div className="betaTest-wrap">
      <h3 className="title100 text-primary-1">β-test</h3>
      <h3 className="body150 text-black BetaTest-body-text">
        회원님들의 서비스를 테스트할 수 있는 곳입니다.{data.imageURL}
      </h3>
      <div className="betaTest-content">
        {data.map((value, index) => {
          return (
            <div
              key={index}
              className="betaTest-item"
              onClick={() => goView(value)}
            >
              <img src={value.imageURL} className="item-img" />
              <h2 className="subhead100 item-title">{value.title}</h2>
              <h4 className="body150 item-content">{value.content}</h4>
              <h1 className="caption100 item-content text-gray-1">
                댓글 {value.commentCount}개 | 리뷰 {value.reviewCount}개
              </h1>
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

export default BetaTest;
