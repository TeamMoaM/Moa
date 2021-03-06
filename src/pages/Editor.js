import React, { Component, useRef } from "react";
import ReactQuill from "react-quill";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase-config";
import "react-quill/dist/quill.bubble.css";
import ClipLoader from "react-spinners/ClipLoader";
class EditorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  quillRef = React.createRef();
  quillImageCallBack = async () => {
    this.setState({ loading: true });
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".png,.jpg,.jpeg,.svg");
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      if (!file) {
        alert("썸네일을 등록해주세요.");
        return false;
      }
      const storageRef = ref(storage, `/editor/${file.name}`);
      await uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });
      let urlResponse = await getDownloadURL(storageRef);
      console.log("url:" + urlResponse);
      let quill = this.quillRef.current.getEditor();
      const range = quill.getSelection(true);
      quill.insertEmbed(range.index, "image", urlResponse);
    };
    this.setState({ loading: false });
  };

  modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link"],
        ["image"],
        [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
        ["clean"],
      ],
      handlers: {
        image: () => this.quillImageCallBack(),
      },
    },
  };
  formats = [
    //'font',
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  render() {
    const { value, onChange } = this.props;
    return (
      <ReactQuill
        ref={this.quillRef}
        theme="bubble"
        modules={this.modules}
        formats={this.formats}
        placeholder="이곳에 글을 작성하세요.
                    글자를 작성하고 드래그하면 양식을 편집하고 사진을 넣을 수 있습니다."
        onChange={(content, delta, source, editor) =>
          onChange(editor.getHTML())
        }
      />
    );
  }
}
export default EditorComponent;
