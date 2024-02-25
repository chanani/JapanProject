import { useState } from "react";
import "../../styles/study/Easy.css";
import Quiz from "../../component/Quiz";

function Easy() {
  const [pageOn, setPageOn] = useState(true);
  const handleToggle = () => {
    setPageOn((pageOn) => !pageOn);
  };

  return (
    <div className="study-page-all">
      {pageOn ? 

        <div className="study-off-box">
          <div className="study-off-info">
            <h5>1. 로그인을 하여 기록할 수 있습니다.</h5>
            <h5>2. 카드를 클릭하여 뒤집어 뜻을 확인할 수 있습니다.</h5>
          </div>

          <div className="study-off-req-box">
              <div className="off-input-box">
                <input type="number" />
              </div>
              <div className="off-btn-box">
                <button onClick={handleToggle}>시작하기</button>
              </div>
          </div>
          
        </div> 
        
        : <Quiz />
      }
      
      <button onClick={handleToggle}>시작하기</button>
      </div>

  );
}

export default Easy;
