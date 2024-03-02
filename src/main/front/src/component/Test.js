import {useState } from "react";
import "../styles/component/Test.css";
import Audio from "./Audio";
import { useNavigate } from "react-router-dom";

const Test = ({kind, currentPath}) => {
  // kind가 true일 때 뜻 풀이, false일 때 단어 풀이
  let [word, setWord] = useState([['家族', '가족'], ['ちた', '치타'], ['しみ', '시미'], ['たりの', '타리노'], ['家族', '코키'], ['ちた', '치타'], ['しみ', '시미'], ['たりの', '타리노'], ['しみ', '시미'], ['たりの', '타리노']]);
  let [answer, setAnswer] = useState([]);
  const navigate = useNavigate();
  const handleAnswer = (event, index) => {
    const updatedAnswer = [...answer, true]; 
    updatedAnswer[index] = event.target.value; 
    setAnswer(updatedAnswer);
  };
  const handleResult = () => {
    navigate("/result", {state : { kind, currentPath, word, answer } });
    window.scrollTo(0, 0);
  };
  return (
    <div className="test-on-box">
      <div className="test-on-header-box">
        <p>10개의 일본어 단어 문제</p>
      </div>
      <div className="test-box">
        {word.map((item, index) => (
          <div className="test-box-content" key={index}>
            <div className="test-header-box">
                {kind ? <Audio inputData={item[0]}/> : <p></p>}
                <p>{index + 1} / {word.length}</p>
            </div>
            <div className="test-word-box">
                {kind? <p>{item[0]}</p> : <p>{item[1]}</p>}
            </div>
            <div className="test-input-box">
              <input type="text" onChange={(event) => handleAnswer(event, index)} value={answer[index] || ''} className={index}/>
              
            </div>

          </div>
          
        ))}
      </div>
      <div className="submit-box">
          <button onClick={handleResult}>결과 확인하기</button>
      </div>
    </div>
  );
}

export default Test;