import Logo from "../icons/MOA.mobile.svg";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const headerList = [
    {
      active: location.pathname === "/app",
      isImg: true,
      src: Logo,
      title: null,
    },
    {
      active: location.pathname === "/app/beta-test",
      isImg: false,
      src: null,
      title: "β-test",
    },
    {
      active: location.pathname === "/app/community",
      isImg: false,
      src: null,
      title: "커뮤니티",
    },
    {
      active: location.pathname === "/app/my-page",
      isImg: false,
      src: null,
      title: "마이페이지",
    },
  ];
  return (
    <>
      <div className="mobile-header">
        <div className="mobile-header-title">
          {headerList.map((value, index) => {
            if (!value.active) return;
            if (value.isImg) {
              return <img src={value.src} alt="MOA 로고" key={index} />;
            } else {
              return (
                <h1 className="subhead100 text-primary-1" key={index}>
                  {value.title}
                </h1>
              );
            }
          })}
        </div>
      </div>
      {location.pathname === "/app/community" && (
        <div className="mobile-tab_list">
          <button>
            <h3 className="body100">전체</h3>
          </button>
          <button>
            <h3 className="body100">사업</h3>
          </button>
          <button>
            <h3 className="body100">개발</h3>
          </button>
          <button>
            <h3 className="body100">기획</h3>
          </button>
          <button>
            <h3 className="body100">디자인</h3>
          </button>
          <button>
            <h3 className="body100">기술</h3>
          </button>
        </div>
      )}
    </>
  );
}
