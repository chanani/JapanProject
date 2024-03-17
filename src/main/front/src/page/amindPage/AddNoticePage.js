import "../../styles/adminPage/AddNoticePage.css";

const AddNoticePage = () => {
  return (
    <div className="notice-box-all">
      <div className="notice-box">
        <div className="noticePage-title-box">
          <p>공지사항 작성</p>
        </div>
        <div className="notice-title-box">
          <label htmlFor="notice-title">제목 :</label>
          <input type="text" id="notice-title" placeholder=""/>
        </div>
        <div className="notice-content-box">
          <label htmlFor="notice-content">내용 : </label>
          <textarea id="notice-content" ></textarea>
        </div>
        <div className="notice-btn-box">
          <button>전송하기</button>
        </div>
      </div>
    </div>
  );
}

export default AddNoticePage;