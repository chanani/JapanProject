import {useEffect, useState} from "react";
import "../styles/component/Test.css";
import Audio from "./Audio";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {axiosInstance} from "../api";

const Test = ({level, kind, currentPath}) => {
    // kind가 true일 때 뜻 풀이, false일 때 단어 풀이
    let [word, setWord] = useState([]);
    // 정답 저장 state
    let [answer, setAnswer] = useState([]);
    const navigate = useNavigate();

    // 정답 입력 핸들러
    const handleAnswer = (event, index) => {
        // word_num, answer값
        const updatedAnswer = [...answer];
        updatedAnswer[index] = [event.target.value, word[index].word_num];
        setAnswer(updatedAnswer);
    };
    // 결과 확인 핸들러
    const handleResult = () => {
        navigate("/result", {state: {kind, level, word, answer}});
        window.scrollTo(0, 0);
    };

    // 데이터 불러오는 핸들러
    useEffect(() => {
        axiosInstance.get(`/test/word/${level}`)
            .then((res) => {
                console.log("data = ", res.data);
                setWord(res.data)
            })
    }, [level]);

    return (
        <div className="test-on-box">
            <div className="test-on-header-box">
                <p>10개의 일본어 단어 문제</p>
            </div>
            <div className="test-box">
                {word.map((item, index) => (
                    <div className="test-box-content" key={index}>
                        <div className="test-header-box">
                            {kind ? <Audio inputData={item.word_content}/> : <p></p>}
                            <p>{index + 1} / {word.length}</p>
                        </div>
                        <div className="test-word-box">
                            {kind ?
                                <div className="test-word-content-box">
                                    <p className="test-word-content-chinese">{item.word_chinese}</p>
                                    <p className="test-word-content-content">{item.word_content}</p>
                                </div>
                                :
                                <p>{item.word_meaning}</p>}
                        </div>
                        <div className="test-input-box">
                            <input type="text" onChange={(event) => handleAnswer(event, index)}
                                   value={(answer[index] && answer[index][0]) || ''} className={index}/>

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