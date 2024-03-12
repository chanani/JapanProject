import axios from "axios";
import { useState } from "react";
import "../../styles/chatAiPage/ChatAi.css";
import GptApi from "../../component/GptApi";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdOutlineSensorDoor } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaQuestion } from "react-icons/fa";

const ChatAi = () => {
  
  const[questions, setQuestions] = useState([]);
  const[answers, setAnswers] = useState([]);

  const handleQuestion = (question, answer) => {
    setQuestions([...questions, question]);
    setAnswers([...answers, answer]);
  }

  const handleClear = () => {
    console.log(questions)
    console.log(answers);
    setQuestions([]);
    setAnswers([]);
  }
  return (
    <div className="chat-box-all">
      <div className="chat-box">
        <div className="chat-header" >
           <FaRegPenToSquare size={19} onClick={handleClear}/>
          <h4>ChatAi</h4>
          <Link to={"/"}><MdOutlineSensorDoor size={22}/></Link>
        </div>
        <div className={"text-box" + (questions.length === 0 ? " wait" : "")}>
        
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
                  <p>{answers}</p>
                </div>
              ))
          }
          
          
        </div>

        <div className="input-box">
          <GptApi handleQuestion={handleQuestion}/>
        </div>
      </div>
    </div>
  );

}

export default ChatAi;
