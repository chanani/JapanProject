import axios from "axios";
import { useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

const GptApi = ({handleQuestion}) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  // GptApi 호출
  const handleSubmit = async(e) => {
    if(question === '') {
      alert('질문을 입력해주세요.');
      return;
    }
    // axios({
    //   url : "/chat-gpt/send",
    //   method : "POST",
    //   data : {
    //     "message" : question
    //   }
    // })
    // .then((res) => {
    //   let content = res.data.choices[0].message.content;
    //   setAnswer(content);
    // })
    // .catch((error) => {
    //   alert("오류가 발생하였습니다. 관리자에게 문의해주세요.");
    // });
    setAnswer("a");
    handleQuestion(question, answer);
    setQuestion('');
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