import axios from "axios";
import { useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

const GptApi = ({handleQuestion, handleResponse}) => {
  const [question, setQuestion] = useState('');
  // GptApi 호출
  const handleSubmit = async(e) => {
    let content = '';
    if(question === '') {
      alert('질문을 입력해주세요.');
      return;
    }
    handleQuestion(question); // 질문 전달
    setQuestion('');
    await axios({
      url : "/chat-gpt/send",
      method : "POST",
      data : {
        "message" : question
      }
    })
    .then((res) => {
      content = res.data.choices[0].message.content;
      console.log(content);
    })
    .catch((error) => {
      alert("오류가 발생하였습니다. 관리자에게 문의해주세요.");
    });
    handleQuestion(question);
    handleResponse(content); // 답변 전달
    
  }

  return (
    <div className="gpt-box-all">
      <form className="gpt-form">
        <textarea type="text" 
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="질문을 해주세요 :)"
        />

        <FaArrowAltCircleUp onClick={handleSubmit} size={33} className="send-btn"/>

      </form>
    </div>
  )
}

export default GptApi;