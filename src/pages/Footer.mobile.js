import MainPageIcon from "../icons/mainPage.mobile.svg";
import BetaTestIcon from "../icons/betaTest.mobile.svg";
import CommunityIcon from "../icons/community.mobile.svg";
import MyPageIcon from "../icons/myPage.mobile.svg";
import MainPageActiveIcon from "../icons/mainPageActive.mobile.svg";
import BetaTestActiveIcon from "../icons/betaTestActive.mobile.svg";
import CommunityActiveIcon from "../icons/communityActive.mobile.svg";
import MyPageActiveIcon from "../icons/myPageActive.mobile.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IconButton from "../components/IconButton";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location", location.pathname);
  const tabList = [
    {
      icon: MainPageIcon,
      activeIcon: MainPageActiveIcon,
      title: "메인페이지",
      url: "/app",
    },
    {
      icon: BetaTestIcon,
      activeIcon: BetaTestActiveIcon,
      title: "β-test",
      url: "/app/beta-test",
    },
    {
      icon: CommunityIcon,
      activeIcon: CommunityActiveIcon,
      title: "커뮤니티",
      url: "/app/community",
    },
    {
      icon: MyPageIcon,
      activeIcon: MyPageActiveIcon,
      title: "마이페이지",
      url: "/app/my-page",
    },
  ];

  const getIsActive = (value) => {
    if (location.pathname === value.url) {
      return { icon: value.activeIcon, color: "primary" };
    } else {
      return { icon: value.icon, color: "gray" };
    }
  };

  return (
    <>
      {(location.pathname === "/app/beta-test" ||
        location.pathname === "/app/community") && (
        <div className="action-button">
          <IconButton
            size="lg"
            variant="primary"
            icon="plus"
            onClick={() => navigate("/app/beta-test/create")}
          />
        </div>
      )}
      <div className="mobile-footer shadow-gnb">
        <div className="mobile-gnb">
          {tabList.map((value, index) => {
            const active = getIsActive(value);
            return (
              <Link to={value.url} key={index}>
                <div className="mobile-gnb-tab">
                  <img src={active.icon} />
                  <h2
                    className={`caption100 mobile-gnb-tab-title text-${active.color}-1`}
                  >
                    {value.title}
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
