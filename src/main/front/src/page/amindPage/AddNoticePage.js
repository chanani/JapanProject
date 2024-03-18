import { useState } from "react";
import "../../styles/adminPage/AddNoticePage.css";
import axios from "axios";

const AddNoticePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const token = localStorage.getItem("token");
  const handleTitle = (event) =>{
    let input_value = event.target.value;
    setTitle(input_value);
  }

  const handleContent = (event) =>{
    let input_value = event.target.value;
    setContent(input_value);
  }

  const handleSubmit = () => {
    axios({
      url : "/kafka/send",
      method : "POST",
      data : {
        message : content
      },
      headers : {
        authorization : token
      }
    })
    .then((res) => {
      console.log(res);
    })
  }
  return (
    <div className="notice-box-all">
      <div className="notice-box">
        <div className="noticePage-title-box">
          <p>공지사항 작성</p>
        </div>
        <div className="notice-title-box">
          <label htmlFor="notice-title">제목 :</label>
          <input type="text" 
          id="notice-title"
          value={title}
          onChange={handleTitle}
          />
        </div>
        <div className="notice-content-box">
          <label htmlFor="notice-content">내용 : </label>
          <textarea id="notice-content"
            value={content}
            onChange={handleContent}
          ></textarea>
        </div>
        <div className="notice-btn-box">
          <button onClick={handleSubmit}>전송하기</button>
        </div>
      </div>
    </div>
  );
}

export default AddNoticePage;