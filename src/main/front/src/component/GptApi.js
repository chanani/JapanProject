import {useContext, useState} from "react";
import {FaArrowAltCircleUp} from "react-icons/fa";
import {tokenInfoContext} from "./TokenInfoProvider";
import {axiosInstance} from "../api";
import {toast} from "react-toastify";

const GptApi = ({ handleQuestion, handleResponse }) => {
    const [question, setQuestion] = useState('');
    const { userRole, username, accessToken, refreshToken } = useContext(tokenInfoContext);

    const handleSubmit = async () => {
        if (question.trim() === '') return toast.error('질문을 입력해주세요.');
        handleQuestion(question);
        setQuestion('');

        try {
            const res = await axiosInstance.post('chat-gpt/send', { message: question });
            const content = res.data.choices[0].message.content;
            handleResponse(content);
        } catch (error) {
            toast.error("오류가 발생하였습니다. 관리자에게 문의해주세요.");
        }
    };

    const enterHandle = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="gpt-chat-box-all">
            <form className="gpt-form">
                <textarea
                    className="gpt-input"
                    rows="2"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={enterHandle}
                    placeholder="질문을 해주세요 :)"
                />
                <FaArrowAltCircleUp onClick={handleSubmit} size={33} className="send-btn" />
            </form>
        </div>
    );
};


export default GptApi;