import React, { useState, useEffect, useRef, useContext } from "react";
import "../../styles/chatAiPage/ChatAi.css";
import GptApi from "../../component/GptApi";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdOutlineSensorDoor } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { FaQuestion } from "react-icons/fa";
import { tokenInfoContext } from "../../component/TokenInfoProvider";
import {toast} from "react-toastify";
const ChatAi = () => {

  const {userRole} = useContext(tokenInfoContext);
  const navigate = useNavigate();

  useEffect(() =>{
    if(userRole === "none"){
      toast.error("로그인 후 이용해주세요.");
      navigate("/login");
    }
  });

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const textBoxRef = useRef(null);

  // 질문이 추가될 때마다 스크롤을 최하단으로 이동
  useEffect(() => {
    if (textBoxRef.current) {
      textBoxRef.current.scrollTop = textBoxRef.current.scrollHeight;
    }
  }, [questions]); 

  // 질문 받는 핸들러
  const handleQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  // 응답 받는 핸들러
  const handleResponse = (answer) => {
    setAnswers([...answers, answer]);
  };

  // 새로운 대화 시작 핸들러
  const handleClear = () => {
    setQuestions([]);
    setAnswers([]);
  };

  return (
    <div className="chat-box-all">
      <div className="chat-box">
        <div className="chat-header" >
           <FaRegPenToSquare size={19} onClick={handleClear}/>
          <h4>ChatAi</h4>
          <Link to={"/"}><MdOutlineSensorDoor size={22}/></Link>
        </div>
        <div className={"text-box" + (questions.length === 0 ? " wait" : "")} ref={textBoxRef}>
        
            {questions.length === 0 ? 
              <div className="wait-question">
                <p><FaQuestion size={30}/></p>
                <p>How can I help you today?</p>
              </div>
              :
              questions.map((item, index) => (
                <div className="text-content" key={index}>
                  <h4>You</h4>
                  <p>{item}</p>
                  <h4>ChatAi</h4>
                  <p>{answers[index] === undefined ? 
                  "답변을 입력 중입니다. 잠시만 기다려주세요 :)"
                  :
                  answers[index]
                }</p>
                </div>
              ))
          }
        
        </div>

        <div className="input-box">
          <GptApi 
          handleQuestion={handleQuestion}
          handleResponse={handleResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatAi;
