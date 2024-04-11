import { useEffect, useState } from "react";
import "../../styles/study/StudyPage.css";
import Quiz from "../../component/Quiz";
import { useLocation } from "react-router-dom";

function Easy() {
  const location = useLocation();
  const [pageOn, setPageOn] = useState(true);
  const [num, setNum] = useState(1);
  const [word, setWord] = useState([]);
  const path = useLocation().pathname.substring(7);
  const [level, setLevel] = useState(0);
  
  const handleToggle = () => {
    if(num > 0){
      if(num <= 30){
        setPageOn((pageOn) => !pageOn);
      } else {
        alert("30이하로 입력해주세요.");
      }
    } else {
      alert("1이상 입력해주세요.");
    }

    
  };

  const handleChangeNum = (event) => {
      let num = event.target.value;
      setNum(num);
  }


  useEffect(() => {
    if(path === 'easy') setLevel(1);
    else if (path === 'middle') setLevel(2);
    else if (path === 'hard') setLevel(3);
    // console.log(level);
  }, [level, path]);

  useEffect(() => {
    const arr = location.state ? location.state.arr : [];
    if(arr && arr.length !== 0){
      setWord(arr);
      setNum(arr.length);
      setPageOn(false);
    }
  }, [location.state]);

  

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
        
        : <Quiz level={level} num={num} arr={word} />
      }
        </div>
      </div>

  );
}

export default Easy;
