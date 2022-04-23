import { useState } from "react";
import XIcon from "../img/communityImg/x_icon.svg";

export default function CreateCommunity(props) {
  const { hideForm } = props;

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
  const [tagSelect, setTagSelect] = useState(1);
  const getButtonClassById = (id) => {
    return tagSelect === id ? "modalClickedButton" : "modalUnclickedButton";
  };
  return (
    <>
      <div className="dimmed"></div>
      <div className="form-wrap">
        <div className="d-flex justify-content-between mb-16">
          <h4 className="title100">새로운 게시물</h4>
          <img src={XIcon} width={24} height={24} onClick={hideForm} />
        </div>
        <div className="d-flex align-items-center">
          {tagList.map((value) => {
            if (value.id === 0) return;
            return (
              <button
                onClick={() => {
                  setTagSelect(value.id);
                }}
                className={getButtonClassById(value.id)}
              >
                <h4 className="body100">{value.title}</h4>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
