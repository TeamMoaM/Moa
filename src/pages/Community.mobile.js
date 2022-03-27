import avatarIcon from "../icons/avatar.svg";
function Community() {
  return (
    <div className="mobile-community">
      <button className="mobile-community-new_writing">
        <img src={avatarIcon} className="mobile-avatar" />
        <h2 className="paragraph200 text-gray-2">
          회원님의 이야기를 공유해주세요.
        </h2>
      </button>
    </div>
  );
}

export default Community;
