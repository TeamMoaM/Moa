import Button from "../components/Button";
import avatarImage from "../icons/avatar.svg";
import bronzeMedal from "../img/medals/bronzeMedal.svg";

export default function MyPage() {
  return (
    <div className="mobile-mypage-wrap">
      <div className="mobile-mypage-user_card">
        <img
          className="mobile-avatrar-icon mb-16"
          alt="profile"
          src={avatarImage}
        />
        <h4 className="title100 mb-8">USER ID</h4>
        <h2 className="body100 text-gray-1 mb-16">HB Company</h2>
        <Button variant={"tertiary"} size={"sm"}>
          <h3 className="subhead100">정보 수정</h3>
        </Button>
        <div className="border-bottom-gray-3 w-90 my-16" />
        <div>
          <img src={bronzeMedal} className="mobile-medal" />
        </div>
      </div>
    </div>
  );
}
