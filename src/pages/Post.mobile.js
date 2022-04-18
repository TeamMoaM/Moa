import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TabList from "../components/mobile/TabList";

export default function Post() {
  const { id } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);

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
    </div>
  );
}
