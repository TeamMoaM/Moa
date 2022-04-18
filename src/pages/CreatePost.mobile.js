import Button from "../components/Button";
import Editor from "./Editor";
import camera from "../img/post/camera.svg";
import "../style/Editor.css";

export default function CreatePost() {
  return (
    <div className="post-wrap">
      <div className="mobile-item_info-top border-gray-2">
        <img className="mobile-camera-img" src={camera} />
        <h3 className="body-100 text-gray-2">썸네일 등록하기</h3>
      </div>
      <div className="mobile-post-body border-bottom-gray-3">
        <input
          maxlength="30"
          className="mobile-post-title"
          placeholder="제목을 입력하세요."
        />
        <textarea
          maxlength="133"
          className="mobile-post-intro"
          placeholder="서비스에 대한 간략한 설명을 입력하세요."
        />
      </div>
      {/* // TODO: scroll 반응 */}
      <div className="mobile-editor">
        <Editor />
      </div>
      <div className="mobile-post-bottom">
        <Button variant={"primary"} size={"md"} className="w-90">
          서비스 등록하기
        </Button>
      </div>
    </div>
  );
}
