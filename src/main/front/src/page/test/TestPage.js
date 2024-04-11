import { useEffect, useState } from "react";
import "../../styles/test/TestPage.css";
import Test from "../../component/Test";
import { useLocation } from "react-router-dom";

function TestPage() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname.substring(6));
  const [pageOn, setPageOn] = useState(true);
  const [kind, setKind] = useState(true);
  const [level, setLevel] = useState(0);
  const handleToggle = () => {
    setPageOn((pageOn) => !pageOn);
  };
  // console.log(currentPath);
  const handleKind = () => {
    setKind((kind) => !kind);
  }

  useEffect(() => {
    if(currentPath === 'easy') setLevel(1);
    else if (currentPath === 'middle') setLevel(2);
    else if (currentPath === 'hard') setLevel(3);
  
  }, [level, currentPath]);

  return (
    <div className="test-page-all">
      <div className="test-page-mid">
      {pageOn ? 

        <div className="test-off-box">
          <div className="test-off-info">
            <h5>👉🏻 로그인 후 기록을 남길 수 있습니다.</h5>
            <h5>👉🏻 테스트 단어의 수는 10문제 입니다.</h5>
            <h5>👉🏻 단어의 뜻과 단어를 테스트할지 선택해주세요.</h5>
          </div>

          <div className="kind-box">
              <button className={(kind ? "active" : "")} onClick={handleKind}>뜻 풀이</button>
              <button className={(kind ? "" : "active")} onClick={handleKind}>단어 풀이</button>
          </div>

          <div className="test-off-req-box">
            <button onClick={handleToggle}>시작하기</button>
          </div>
          
        </div> 
        
        : <Test level={level} kind={kind} currentPath={currentPath}/>
      }
        </div>
      </div>

  );
}

export default TestPage;
