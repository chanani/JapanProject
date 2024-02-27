import { useState } from "react";
import "../../styles/study/StudyPage.css";
import Quiz from "../../component/Quiz";

function Easy() {
  const currentPath = useState(window.location.pathname.substring(7));
  const [pageOn, setPageOn] = useState(true);
  const [num, setNum] = useState(1);
  const handleToggle = () => {
    if(num > 0){
      setPageOn((pageOn) => !pageOn);
    } else {
      alert("1이상 입력해주세요.");
    }
  };

  const handleChangeNum = (event) => {
      let num = event.target.value;
      setNum(num);
  }

  return (
    <div className="study-page-all">
      <div className="study-page-mid">
      {pageOn ? 

        <div className="study-off-box">
          <div className="study-off-info">
            <h5>👉🏻 로그인 후 즐겨찾기를 이용할 수 있습니다.</h5>
            <h5>👉🏻 카드를 클릭하여 뒤집어 뜻을 확인할 수 있습니다.</h5>
            <h5>👉🏻 학습할 단어의 수를 설정해주세요.</h5>
            <h5>👉🏻 플레이버튼을 누르면 자동으로 다음 단어로 넘어갑니다.</h5>
          </div>

          <div className="study-off-req-box">
            <input type="number" id="num" placeholder="단어 수" onChange={handleChangeNum} value={num}/>
            <button onClick={handleToggle}>시작하기</button>
          </div>
          
        </div> 
        
        : <Quiz currentPath={currentPath} num={num}/>
      }
        </div>
      </div>

  );
}

export default Easy;
