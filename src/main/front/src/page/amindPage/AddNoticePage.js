import { useState } from "react";
import "../../styles/adminPage/AddNoticePage.css";
import axios from "axios";

const AddNoticePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const token = localStorage.getItem("token");
  
  // 제목 수정 핸들러
  const handleTitle = (event) =>{
    let input_value = event.target.value;
    setTitle(input_value);
  }
  // 내용 수정 핸들러
  const handleContent = (event) =>{
    let input_value = event.target.value;
    setContent(input_value);
  }

  // 공지사항 등록 핸들러
  const handleSubmit = () => {
    //　공지사항 등록
    try{
      axios({
        url : "/admin/addNotice",
        method : "POST",
        headers : {
          authorization : token
        },
        data : {
          title : title,
          content : content
        }
      })
      
      // 카프카 Topic 등록
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
      alert("정상적으로 등록되었습니다 !");
      window.location = "/";
    } catch {
      alert("등록에 실패하였습니다. 관리자에게 문의해주세요.");
    }
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