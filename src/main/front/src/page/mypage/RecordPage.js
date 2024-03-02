import { useState } from "react";
import "../../styles/mypage/RecordPage.css";

const RecordPage = () => {
  const [data, setData] = useState([["Easy", "100", "24/02/29"], ["Easy", "70", "24/02/22"], ["Hard", "70", "24/03/21"]]);
  const username = "CHANHAN_LEE";

  const handleContent = () => {
    // result 페이지로 이동해야됨
  }

  return(
    
    <div className="recordPage-page-all">
      <div className="recordPage-page-mid">

        
        <div className="recordPage-info">
        {data.length === 0 ? 
        <p>학습 기록이 존재하지 않습니다.</p>
        : 
        <p>{username}님의 기록</p>
        }
        </div>

          {data.map((item, index) => (
            <div className="recordPage-score" key={index} onClick={handleContent}>
              <div className="score-header">
                <div className="level">{item[0]}</div>
                <div style={{fontSize : "13px"}}>⏐</div>
                <div>{username}</div>
              </div>
              <div className="score-content">
                <div className="point">{item[1]}점</div>
                <div className="save-date">{item[2]}</div>
              </div>
              
            </div>
          ))}

      </div>
    </div>
   
  );
}

export default RecordPage;