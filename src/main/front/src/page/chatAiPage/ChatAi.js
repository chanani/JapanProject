import React, {useState, useEffect, useRef, useContext} from "react";
import "../../styles/chatAiPage/ChatAi.css";
import GptApi from "../../component/GptApi";
import {FaRegPenToSquare} from "react-icons/fa6";
import {useNavigate} from 'react-router-dom';
import {FaQuestion, FaRegTrashAlt} from "react-icons/fa";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {toast} from "react-toastify";
import {TbLayoutSidebarRightCollapse} from "react-icons/tb";
import {HiPencilAlt} from "react-icons/hi";
import {axiosInstance} from "../../api";

const ChatAi = () => {

    const {userRole, username} = useContext(tokenInfoContext);
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]); // 질문
    const [answers, setAnswers] = useState([]); // 답변
    const [record, setRecord] = useState([]); // 이전 대화 기록
    const textBoxRef = useRef(null); // 질문 박스
    const [sideBar, setSideBar] = useState(true); // 사이드 바 활성화 여부
    const [currentRecord, setCurrentRecord] = useState(0); // 현재 질문 목록 번호

    // 질문 저장 핸들러
    const handleQuestion = (question) => {
        setQuestions([...questions, question]);
    };

    // 답변 저장 핸들러
    const handleResponse = (answer) => {
        setAnswers([...answers, answer]);
    };

    // 새로운 페이지 생성 핸들러
    const handleClear = () => {
        setQuestions([]);
        setAnswers([]);
        setCurrentRecord(0);
    };

    // 사이드바 on, off 핸들러
    const sideBarToggle = () => {
        setSideBar((perv) => !perv);
    };

    // 현재 진행 중인 질문 목록 번호 핸들러
    const aiCurrentHandle = (aiRecordNum) => {
        setCurrentRecord(aiRecordNum);
        setQuestions([]);
        setAnswers([]);
        recordDetailAPI(aiRecordNum);
    }

    // 기록 삭제 핸들러 & API
    const removeRecordHandle = (aiRecordNum) => {
        axiosInstance.post('chat-gpt/remove-record', {
            username: username,
            aiRecordNum: aiRecordNum
        })
            .then((res) => {
                toast.success('정상적으로 삭제 되었습니다.');
                recordAPI();
            })
            .catch((err) => toast.error('기록 삭제 중 오류가 발생하였습니다.'));
    }


    // 이전 대화 목록 조회 API
    const recordAPI = () => {
        axiosInstance.get('chat-gpt/record', {
            params: {
                username: username
            }
        })
            .then((res) => {
                setRecord(res.data.data);
            })
            .catch((e) => toast.error('이전 기록 조회 중 오류가 발생하였습니다.'));
    };

    // 이전 대화 목록 상세 조회 API
    const recordDetailAPI = (aiRecordNum) => {
        axiosInstance.get('chat-gpt/record-detail', {
            params: {
                username: username,
                aiRecordNum: aiRecordNum,
            }
        })
            .then((res) => {
                const data = res.data.data; // 조회된 데이터 배열
                const newQuestions = data.map(item => item.aiRecordSendData); // 질문 데이터 추출
                const newAnswers = data.map(item => item.aiRecordAnswerData); // 답변 데이터 추출

                setQuestions(newQuestions);
                setAnswers(newAnswers);
            })
            .catch((e) => toast.error('이전 기록 조회 중 오류가 발생하였습니다.'));
    };

    // 권한 확인
    useEffect(() => {
        if (userRole === "none") {
            toast.error("로그인 후 이용해주세요.");
            return navigate("/login");
        }
        recordAPI();
    }, [userRole, currentRecord]);


    // 질문이 추가될 때마다 스크롤을 최하단으로 이동
    useEffect(() => {
        if (textBoxRef.current) textBoxRef.current.scrollTop = textBoxRef.current.scrollHeight;
    }, [questions]);

    return (
        <div className="chat-box-all">

            <div className={"chat-side-bar " + (sideBar ? "side-bar-active" : "")}>
                <div className="chat-side-bar-header-box">
                    <TbLayoutSidebarRightCollapse size={27} onClick={sideBarToggle}/>
                    <HiPencilAlt size={25} onClick={handleClear} className="icon-btn"/>
                </div>
                <div
                    className={"chat-side-bar-content-box " + (sideBar ? "side-bar-content-not-active" : "side-bar-content-active")}>
                    {record?.some(item => item.createdAt === "오늘") && (
                        <div className="chat-side-bar-content">
                            <span>오늘</span>
                            {record?.filter(item => item.createdAt === "오늘")
                                .map((item, index) => (
                                    <div className={(currentRecord === item.aiRecordNum ? 'chat-current-record' : '')}
                                         onClick={(e) => aiCurrentHandle(item.aiRecordNum)}
                                         key={index}>
                                        <p>{item.aiRecordTitle}</p>
                                    </div>
                                ))}
                        </div>
                    )}

                    {record?.some(item => item.createdAt === "지난 7일") && (
                        <div className="chat-side-bar-content">
                            <span>지난 7일</span>
                            {record?.filter(item => item.createdAt === "지난 7일")
                                .map((item, index) => (
                                    <div className={(currentRecord === item.aiRecordNum ? 'chat-current-record' : '')}
                                         onClick={(e) => aiCurrentHandle(item.aiRecordNum)}
                                         key={index}>
                                        <p>{item.aiRecordTitle}</p>
                                        <FaRegTrashAlt size={14}
                                                       onClick={(e) => {
                                                           e.stopPropagation();
                                                           removeRecordHandle(item.aiRecordNum);
                                                       }}/>

                                    </div>
                                ))}
                        </div>
                    )}

                    {record?.some(item => item.createdAt === "이 외") && (
                        <div className="chat-side-bar-content">
                            <span>이 외</span>
                            {record?.filter(item => item.createdAt === "이 외")
                                .map((item, index) => (
                                    <div className={(currentRecord === item.aiRecordNum ? 'chat-current-record' : '')}
                                         onClick={(e) => aiCurrentHandle(item.aiRecordNum)}
                                         key={index}>
                                        <p>{item.aiRecordTitle}</p>
                                    </div>
                                ))}
                        </div>
                    )}
                    {record.length === 0 &&
                        <div className={"chat-side-bar-not-content"}>
                            <p>이전 데이터가 없습니다.</p>
                        </div>
                    }
                </div>
            </div>


            <div className="chat-box">
                <div className="chat-header">
                    {sideBar ?
                        <div></div>
                        :
                        <TbLayoutSidebarRightCollapse size={24}
                                                      className="icon-btn"
                                                      onClick={sideBarToggle}/>
                    }
                    <h4>ChatAi</h4>
                    {sideBar ?
                        <div></div>
                        :
                        <FaRegPenToSquare size={19} onClick={handleClear} className="icon-btn"/>
                    }
                </div>
                <div className={"text-box" + (questions.length === 0 ? " wait" : "")} ref={textBoxRef}>
                    {questions.length === 0 ? (
                        <div className="wait-question">
                            <p><FaQuestion size={30}/></p>
                            <p>무엇을 도와드릴까요?</p>
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
                    <GptApi handleQuestion={handleQuestion}
                            handleResponse={handleResponse}
                            currentRecord={currentRecord}
                            setCurrentRecord={setCurrentRecord}/>
                </div>
            </div>
        </div>
    );
};

export default ChatAi;
