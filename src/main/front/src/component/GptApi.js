import axios from "axios";
import {useContext, useState} from "react";
import {FaArrowAltCircleUp} from "react-icons/fa";
import {tokenInfoContext} from "./TokenInfoProvider";
import {axiosInstance} from "../api";
import {toast} from "react-toastify";

const GptApi = ({handleQuestion, handleResponse}) => {
    const [question, setQuestion] = useState('');
    const {userRole, username, accessToken, refreshToken} = useContext(tokenInfoContext);

    // GptApi 호출
    const handleSubmit = async () => {
        let content = '';
        if (question === '') return toast.error('질문을 입력해주세요.');
        handleQuestion(question); // 질문 전달
        setQuestion('');

        await axios({
            url: `${process.env.REACT_APP_URL_JAVA}chat-gpt/send`,
            method: "POST",
            headers: {
                Authorization: accessToken
            },
            data: {
                message: question
            }
        })
            .then((res) => {
                content = res.data.choices[0].message.content;
            })
            .catch((error) => {
                toast.error("오류가 발생하였습니다. 관리자에게 문의해주세요.");
            });
        handleQuestion(question);
        handleResponse(content); // 답변 전달

    }

    const enterHandle = (event) => {
        if (event.key !== 'Enter') return
        // handleSubmit();
    }

    return (
        <div className="gpt-box-all">
            <form className="gpt-form">
        <textarea value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={enterHandle}
                  placeholder="질문을 해주세요 :)"
        />

                <FaArrowAltCircleUp onClick={handleSubmit} size={33} className="send-btn"/>

            </form>
        </div>
    )
}

export default GptApi;