import { useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import TabList from "../components/mobile/TabList";
import { BetaTestContextStore } from "../stores/betaTestStore";

export default function Post() {
  const { id } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const { initialValue } = useContext(BetaTestContextStore);
  console.log("initialValue", initialValue);
  const tabList = [
    { id: 0, title: "서비스 소개" },
    { id: 1, title: "리뷰" },
  ];
  const tabSelected = (id) => {
    setActiveIndex(id);
  };

  return (
    <div>
      <TabList list={tabList} activeIndex={activeIndex} onClick={tabSelected} />
      <img src={initialValue.imageURL} width={"100%"} height={"225px"} />
      <div className="mobile-item_info">
        <h4 className="title100">{initialValue.title}</h4>
        <div>2</div>
        <h3 className="body150">{initialValue.content}</h3>
      </div>
      <div
        className="mobile-post-main"
        dangerouslySetInnerHTML={{ __html: initialValue.desc }}
      ></div>
    </div>
  );
}
