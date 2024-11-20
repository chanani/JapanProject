import React, {useState, useEffect, useRef, useContext} from "react";
import "../../styles/chatAiPage/ChatAi.css";
import GptApi from "../../component/GptApi";
import {FaRegPenToSquare} from "react-icons/fa6";
import {MdOutlineSensorDoor} from "react-icons/md";
import {Link, useNavigate} from 'react-router-dom';
import {FaQuestion} from "react-icons/fa";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {toast} from "react-toastify";
import {TbLayoutSidebarRightCollapse} from "react-icons/tb";
import {HiPencilAlt} from "react-icons/hi";

const ChatAi = () => {

    const {userRole} = useContext(tokenInfoContext);
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]); // 질문
    const [answers, setAnswers] = useState([]); // 답변
    const [record, setRecord] = useState([]); // 이전 대화 기록
    const textBoxRef = useRef(null);

    const handleQuestion = (question) => {
        setQuestions([...questions, question]);
    };
    const handleResponse = (answer) => {
        setAnswers([...answers, answer]);
    };
    const handleClear = () => {
        setQuestions([]);
        setAnswers([]);
    };

    // 질문이 추가될 때마다 스크롤을 최하단으로 이동
    useEffect(() => {
        if (userRole === "none") {
            toast.error("로그인 후 이용해주세요.");
            navigate("/login");
        }
    });

    // 스크롤 이동
    useEffect(() => {
        if (textBoxRef.current) textBoxRef.current.scrollTop = textBoxRef.current.scrollHeight;
    }, [questions]);

    return (
        <div className="chat-box-all">

            <div className={"chat-side-bar"}>
                <div className={"chat-side-bar-header-box"}>
                    <TbLayoutSidebarRightCollapse size={27}/>
                    <HiPencilAlt size={25} onClick={handleClear} className="icon-btn"/>
                </div>
                <div className={"chat-side-bar-content-box"}>
                    <div className={"chat-side-bar-content"}>
                        <span>오늘</span>
                        <p>일본어 질문합니다.</p>
                        <p>일본어 잘하는 방법</p>
                        <p>일본 여행 경로</p>
                    </div>
                    <div className={"chat-side-bar-content"}>
                        <span>지난 7일</span>
                        <p>일본어 질문합니다.</p>
                        <p>일본어 잘하는 방법</p>
                        <p>일본 여행 경로</p>
                    </div>
                    <div className={"chat-side-bar-content"}>
                        <span>이 외</span>
                        <p>일본어 질문합니다.</p>
                        <p>일본어 잘하는 방법</p>
                        <p>일본 여행 경로</p>
                    </div>

                </div>
            </div>

            <div className="chat-box">
                <div className="chat-header">
                    <FaRegPenToSquare size={19} onClick={handleClear} className="icon-btn"/>
                    <h4>ChatAi</h4>
                    <Link to={"/"}><MdOutlineSensorDoor size={22} className="icon-btn"/></Link>
                </div>
                <div className={"text-box" + (questions.length === 0 ? " wait" : "")} ref={textBoxRef}>
                    {questions.length === 0 ? (
                        <div className="wait-question">
                            <p><FaQuestion size={30}/></p>
                            <p>How can I help you today?</p>
                        </div>
                    ) : (
                        questions.map((item, index) => (
                            <div className="text-content" key={index}>
                                <h4>You</h4>
                                <p dangerouslySetInnerHTML={{__html: item.replace(/\n/g, '<br />')}}/>
                                <h4>ChatAi</h4>
                                <p dangerouslySetInnerHTML={{__html: answers[index]?.replace(/\n/g, '<br />') || "답변을 입력 중입니다. 잠시만 기다려주세요 :)"}}/>
                            </div>
                        ))
                    )}
                </div>
                <div className="input-box">
                    <GptApi handleQuestion={handleQuestion} handleResponse={handleResponse}/>
                </div>
            </div>
        </div>
    );
};

export default ChatAi;
