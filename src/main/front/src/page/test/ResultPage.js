import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/test/ResultPage.css";
import Audio from "../../component/Audio";
import { useContext, useEffect, useState } from "react";
import { tokenInfoContext } from "../../component/TokenInfoProvider";
import axios from "axios";

const ResultPage = () => {
  const location = useLocation();
  const { kind, level, word, answer } = location.state;
  const [point, setPoint] = useState(0);
  const navigate = useNavigate();
  const {userRole, username} = useContext(tokenInfoContext);
  const[newAnswer, setNewAnswer] = useState(answer);
  const [check, setCheck] = useState([false, false, false, false, false, false, false, false, false, false]);

  // 정답 확인 핸들러
  const handleCheck = (index) => {
    let newCheck = [...check];
    newCheck[index] = !newCheck[index];
    setCheck(newCheck);
    setTimeout(() => {
      const box = document.querySelector('.index' + index);
      box.classList.toggle('fade-out');
    }, 100);
  }

  // 정답확인 hook
  useEffect(() => {
    let newPoint = 0;  
    let newAnswerArray = [...answer]; // 새로운 답변 배열 생성
  
    for(let i = 0; i < 10; i++) {
      if (Array.isArray(answer[i]) && answer[i].length > 0 && kind && word[i]) { // answer[i]가 배열이고, 길이가 0보다 크고, kind와 word[i]가 존재하는지 확인
        if (word[i].word_meaning === answer[i][0]) {
          newAnswerArray[i] = answer[i].concat(true); // 정답인 경우 기존 데이터에 true 추가
          newPoint++;
        } else {
          newAnswerArray[i] = answer[i].concat(false); // 오답인 경우 기존 데이터에 false 추가
        }
      } else if (Array.isArray(answer[i]) && answer[i].length > 0 && !kind && word[i]) { // answer[i]가 배열이고, 길이가 0보다 크고, word[i]가 존재하는지 확인
        if (word[i].word_content === answer[i][0]) {
          newAnswerArray[i] = answer[i].concat(true);
          newPoint++;
        } else {
          newAnswerArray[i] = answer[i].concat(false); // undefined인 경우 기존 데이터에 false 추가
        }
      } else {
        newAnswerArray[i] = [" ", word[i].word_num, false]; // answer[i]가 undefined인 경우 기본값으로 false를 추가
      }
    }
  
    setNewAnswer(newAnswerArray); // 새로운 답변 배열로 상태 업데이트
    setPoint(newPoint); // 포인트 업데이트
  }, [kind, word, answer]);
  
  // 점수 기록 핸들러
  const handleRecord = () => {
    if(userRole !== "none"){
      axios({
        url : "/test/record",
        method : "POST",
        data : {
          username : username,
          level : level,
          point : point * 10,
          answer : newAnswer,
          kind : kind
        }
      })
      .then((res) => {
        console.log(res.data);
        navigate("/mypage/record");
      })
      .catch((error) => {
        console.error("Error recording result:", error);
      });
    } else {
      alert("로그인 후 이용해주세요.");
    }
  }
  // 홈으로
  const handleHome = () => {
    navigate("/");
  }
  return (
    <div className="result-page-all">
      <div className="result-page-mid">
        
        <div className="result-on-box">
          <div className="result-on-header-box">
            <h3>{point * 10}점 입니다.</h3>
            {point === 10 ? "" : <p>오답을 확인하세요.</p>}
          </div>
          <div className="result-box">
            {word.map((item, index) => (
              
              <div className={"result-box-content index" + (index) + ((kind === true && answer[index] && item.word_meaning === answer[index][0]) || (kind === false && answer[index] && item.word_content === answer[index][0]) ? " clear" : " fail")} key={index}>
                <div className="result-header-box">
                    <Audio inputData={item.word_content}/>
                    <p>{index + 1} / {word.length}</p>
                </div>
                <div className="result-word-box" onClick={(event) => handleCheck(index)}>
                    {kind ? 
                    check[index] ? <p>{item.word_meaning}</p> : <p>{item.word_content}</p> 
                    : 
                    check[index] ? <p>{item.word_content}</p> : <p>{item.word_meaning}</p> 
                    }
                </div>
                <div className="result-input-box">
                 <input type="text" value={(answer[index] && answer[index][0]) || ''} className={index} readOnly/>
                </div>
              </div>
              
            ))}
          </div>
          <div className="submit-box">
              <button onClick={handleHome}>돌아가기</button>
              <button onClick={handleRecord}>결과 기록하기</button>
          </div>
        </div>

        </div>
      </div>

  );
}

export default ResultPage;