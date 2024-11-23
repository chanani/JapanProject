import {useContext, useState} from "react";
import {FaArrowAltCircleUp} from "react-icons/fa";
import {tokenInfoContext} from "./TokenInfoProvider";
import {axiosInstance} from "../api";
import {toast} from "react-toastify";

const GptApi = ({handleQuestion, handleResponse, currentRecord, setCurrentRecord}) => {
    const [question, setQuestion] = useState('');
    const [isComposing, setIsComposing] = useState(false); // IME 상태 관리
    const {username} = useContext(tokenInfoContext);

    const handleSubmit = async () => {
        if (question.trim() === '') return toast.error('질문을 입력해주세요.');
        handleQuestion(question);
        setQuestion('');

        // 처음으로 질문을 할경우 질문 그룹 생성
        if(currentRecord === 0) {
            await axiosInstance.post('chat-gpt/register-record', {
                username : username,
                message : question
            })
                .then((res) => {
                    // 생성된 그룹 번호로 등록
                    setCurrentRecord(res.data.data);
                })
                .catch((e) => toast.error('오류가 발생하였습니다. 관리자에게 문의해주세요.'));
        }

        try {
            const res = await axiosInstance.post('chat-gpt/send', {
                username: username,
                message: question,
                aiRecordNum: currentRecord
            });
            const content = res.data.choices[0].message.content;
            handleResponse(content);
        } catch (error) {
            toast.error("오류가 발생하였습니다. 관리자에게 문의해주세요.");
        }
    };

    const enterHandle = (event) => {
        if (event.key === 'Enter' && !event.shiftKey && !isComposing) {
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
                    onCompositionStart={() => setIsComposing(true)} // IME 시작
                    onCompositionEnd={() => setIsComposing(false)}   // IME 종료
                    placeholder="질문을 해주세요."
                />
                <FaArrowAltCircleUp onClick={handleSubmit} size={33} className="send-btn"/>
            </form>
        </div>
    );
};

export default GptApi;
