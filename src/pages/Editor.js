import React, { Component, useRef } from 'react';
import ReactQuill from 'react-quill';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import {storage} from '../firebase-config';
import 'react-quill/dist/quill.snow.css';
import ClipLoader from "react-spinners/ClipLoader";
class EditorComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
          loading:false
        };
    }
    quillRef = React.createRef();
    quillImageCallBack = async () => {
      this.setState({loading:true});
      const input = document.createElement('input');
      input.setAttribute('type','file');
      input.setAttribute('accept','.png,.jpg,.jpeg,.svg');
      input.click();

      input.onchange = async () =>{
        const file = input.files[0];
        if(!file){
          alert("썸네일 입력해 시키야");
        } 
        const storageRef = ref(storage, `/editor/${file.name}`);
        await uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
        let urlResponse = await getDownloadURL(storageRef);
        console.log('url:'+urlResponse);
        let quill = this.quillRef.current.getEditor();
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'image', urlResponse);
      }
      this.setState({loading:false});
    }

    modules = {
        toolbar: {
          container:[
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link'],
          ['image'],
          [{ 'align': [] }, { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          ['clean']
          ],
          handlers:{
            'image':()=>this.quillImageCallBack()
          }
        }
    }
    formats = [
      //'font',
      'header',
      'bold', 'italic', 'underline', 'strike',
      'list', 'bullet', 'indent',
      'link', 'image',
      'align', 'color', 'background',        
    ]

    render(){
      const { value, onChange } = this.props;
        return(
            <div className='editor'>
              <ClipLoader color={'red'} loading={this.state.loading} size={150} />
                <ReactQuill
                    ref={this.quillRef}
                    theme="snow" 
                    modules={this.modules} 
                    formats={this.formats}  
                    onChange={(content, delta, source, editor) => onChange(editor.getHTML())} />
            </div>
        )
    }
}
export default EditorComponent