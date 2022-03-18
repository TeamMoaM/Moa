import MainPageIcon from "../icons/mainPage.mobile.svg";
import BetaTestIcon from "../icons/betaTest.mobile.svg";
import CommunityIcon from "../icons/community.mobile.svg";
import MyPageIcon from "../icons/myPage.mobile.svg";
import MainPageActiveIcon from "../icons/mainPageActive.mobile.svg";
import BetaTestActiveIcon from "../icons/betaTestActive.mobile.svg";
import CommunityActiveIcon from "../icons/communityActive.mobile.svg";
import MyPageActiveIcon from "../icons/myPageActive.mobile.svg";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
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
  return (
    <div className="mobile-footer shadow-gnb">
      <div className="mobile-gnb">
        {tabList.map((value, index) => {
          const active = value.url === location.pathname;
          return (
            <Link to={value.url} key={index}>
              <div className="mobile-gnb-tab">
                <img src={active ? value.activeIcon : value.icon} />
                <h2
                  className={`caption100 mobile-gnb-tab-title text-${
                    active ? "primary" : "gray"
                  }-1`}
                >
                  {value.title}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
