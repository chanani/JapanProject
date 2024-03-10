import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { tokenInfoContext } from "../../component/TokenInfoProvider";
import axios from "axios";
import Audio from "../../component/Audio";


const RecordDetails = () => {
  const {userRole, username} = useContext(tokenInfoContext);
  const location = useLocation();
  const { kind, answer, point } = location.state;
  const navigate = useNavigate();

  // 홈으로
  const handleHome = () => {
    navigate("/mypage/record");
  }
  return (
    <div className="result-page-all">
      <div className="result-page-mid">
        
        <div className="result-on-box">
          <div className="result-on-header-box">
            <h3>{point}점 입니다.</h3>
            {point === 10 ? "" : <p>기록을 확인하세요.</p>}
          </div>
          <div className="result-box">
            {answer.map((item, index) => (
              
              <div className={"result-box-content" + (item.rd_check ? " clear" : " fail")} key={index}>

                <div className="result-header-box">
                    {<Audio inputData={item.wordVO.word_content}/>}
                    <p>{index + 1} / {answer.length}</p>
                </div>
                <div className="result-word-box">
                    {kind ? item.wordVO.word_content : item.wordVO.word_meaning}
                </div>
                <div className="result-input-box">
                 <input type="text" value={(answer[index] && item.record_value) || ''} className={index} readOnly/>
                </div>
              </div>
              
            ))}
          </div>
          <div className="submit-box">
              <button onClick={handleHome}>돌아가기</button>
          </div>
        </div>

        </div>
      </div>

  );
}

export default RecordDetails;