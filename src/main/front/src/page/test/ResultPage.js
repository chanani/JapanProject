import { useLocation } from "react-router-dom";
import "../../styles/test/ResultPage.css";
import Audio from "../../component/Audio";
import { useEffect, useState } from "react";

const ResultPage = () => {
  const location = useLocation();
  const { kind, currentPath, word, answer } = location.state;
  const [point, setPoint] = useState(0);
  console.log("kind", kind);
  console.log("currentPath", currentPath);
  console.log("word", word);
  console.log("answer", answer);
  
  useEffect(() => {
    let newPoint = 0;
    for(let i = 0; i < 10; i++) {
      if (kind) {
        if (word[i][1] === answer[i]) {
          newPoint++;
        }
      } else {
        if (word[i][0] === answer[i]) {
          newPoint++;
        }
      }
    }
    setPoint(newPoint);
  }, [kind, word, answer]);

  return (
    <div className="result-page-all">
      <div className="result-page-mid">
        {point}
        <div className="result-on-box">
          <div className="result-on-header-box">
            <p>오답을 확인하세요.</p>
          </div>
          <div className="result-box">
            {word.map((item, index) => (
              
              <div className={"result-box-content" + ((kind === true && item[1] === answer[index]) || (kind === false && item[0] === answer[index]) ? " clear" : " fail")} key={index}>
                {item[1] === answer[index] ? "1" : "2"}
                <div className="result-header-box">
                    {kind ? <Audio inputData={item[0]}/> : <p></p>}
                    <p>{index + 1} / {word.length}</p>
                </div>
                <div className="result-word-box">
                    {kind? <p>{item[0]}</p> : <p>{item[1]}</p>}
                </div>
                <div className="result-input-box">
                  <input type="text" value={answer[index]} className={index} readOnly/>
                  
                </div>

              </div>
              
            ))}
          </div>
          <div className="submit-box">
              <button >결과 기록하기</button>
          </div>
        </div>

        </div>
      </div>

  );
}

export default ResultPage;