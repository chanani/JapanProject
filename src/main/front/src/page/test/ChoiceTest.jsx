import "../../styles/test/ChoiceTest.css"
import Audio from "../../component/Audio";
import {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {axiosInstance} from "../../api";
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useLocation, useNavigate} from "react-router-dom";
import {IoClose,} from "react-icons/io5";
import {CgMenuRound} from "react-icons/cg";
import {FaCheck} from "react-icons/fa";
import {tokenInfoContext} from "../../component/TokenInfoProvider";

// 단어 선택 테스트
const ChoiceTest = () => {

    const navigator = useNavigate();
    // 최종 제출 여부
    const [submitState, setSubmitState] = useState(false);
    // 1 = 정답, 2 = 오답, 3 = 모르겠음
    const [answerList, setAnswerList] = useState(new Array(10).fill(0)); // 정답 체크 목록 (기본값 0)
    // 인덱스가 아닌 입려한 정답의 번호가 들어감
    const [choiceList, setChoiceList] = useState(new Array(10).fill(0)); // 입력한 답 목록 (기본값 0)
    const [word, setWord] = useState([]); // 조회한 단어 목록
    const contentText = ["너무 잘하셨어요! 학습한 보람이 있네요!", "걱정하지 마세요, 아직 배우고 있잖아요!"];
    const [sideBar, setSideBar] = useState(true); // 사이드 바 여부
    const [studyTime, setStudyTime] = useState(0); // 테스트 시간
    const {username, userRole} = useContext(tokenInfoContext);

    // 마이페이지에서 전달된 시험 내용 데이터
    const location = useLocation();
    const { ctr, answer } = location.state || {};

    // 답 클릭 핸들러(모르겠음은 5로 데이터 전달)
    const handleSetAnswer = (index, answerIndex) => {
        let answer = word[index].wordContent + (word[index].wordChinese && "(" + word[index].wordChinese + ")");
        let choice = word[index].wordContentList[answerIndex];
        let updatedAnswers = [...answerList];
        let updatedChoice = [...choiceList];
        if (answerIndex === 5) {
            updatedAnswers[index] = 3;
        } else {
            updatedAnswers[index] = answer === choice ? 1 : 2; // 정답: 1, 오답: 2
        }
        updatedChoice[index] = answerIndex + 1;
        setChoiceList(updatedChoice);
        setAnswerList(updatedAnswers);
    }


    // 최종 제출 핸들러
    const handleSubmit = () => {
        console.log("submitState", submitState);
        if (!submitState) {
            let notChoiceAnswer = choiceList.filter(item => item === 0).length;
            if (notChoiceAnswer > 0) return toast.error("정답을 모두 선택해주세요.");
            setSubmitState(true);
            window.scroll(0, 0);
        } else {
            if (userRole === 'none') return toast.error('로그인 후 이용해주세요.');
            choiceTestSaveAPI();
        }
    }

    // 테스트 내용 저장 API
    const choiceTestSaveAPI = () => {
        let answerCount = answerList.filter(item => item === 1).length;
        let inAnswerCount = answerList.filter(item => item !== 1).length;
        let ctrdContent = new Array(10).fill(0);
        for (let i = 0; i < ctrdContent.length; i++) {
            let wordInfo = word[i];
            // 정답 내용
            let answerKeyword = wordInfo.wordContent + (wordInfo.wordChinese && "(" + wordInfo.wordChinese + ")");
            // 정답 번호
            let answerNumber = wordInfo.wordContentList.findIndex(item => item === answerKeyword);
            ctrdContent[i] = {
                wordNum: wordInfo.wordNum,
                ctrdAnswerContent: wordInfo.wordContent,
                ctrdAnswerMeaning: wordInfo.wordMeaning,
                ctrdAnswerChinese: wordInfo.wordChinese,
                ctrdQuestionOne: wordInfo.wordContentList[0],
                ctrdQuestionTwo: wordInfo.wordContentList[1],
                ctrdQuestionThree: wordInfo.wordContentList[2],
                ctrdQuestionFour: wordInfo.wordContentList[3],
                ctrdQuestionAnswer: answerNumber + 1,
                ctrdChoiceNum: choiceList[i],
                ctrdResult: answerList[i] === 1 ? 'Y' : 'N'
            }
        }

        axiosInstance.post('/test/choice-test-register', {
            username: username,
            ctrTotalCount: word.length,
            ctrAnswerCount: answerCount,
            ctrInAnswerCount: inAnswerCount,
            ctrdContent: ctrdContent,
            ctrTime: studyTime
        })
            .then((res) => {
                toast.success('정상적으로 저장되었습니다.');
                navigator("/mypage/record");
            })
            .catch((e) => toast.error('테스트 저장 중 오류가 발생하였습니다.'))
    }

    // 단어 목록 조회 API
    const getWordListAPI = () => {
        axiosInstance.get('study/choice', {
            params: {
                level: 1,
                number: 10
            }
        })
            .then((res) => {
                setWord(res.data.data);
            })
    }

    // 추천 목록으로 이동 핸들러
    const handleMovePage = (path) => {
        navigator(path);
    }

    // 사이드바 토글 핸들러
    const handleSideBarToggle = () => {
        setSideBar((current) => !current);
    }

    // studyTime을 시, 분, 초 형식으로 변환하는 핸들러
    const formatStudyTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        if (hours > 0) {
            return `${hours}시간 ${minutes}분 ${seconds}초`;
        } else if (minutes > 0) {
            return `${minutes}분 ${seconds}초`;
        } else {
            return `${seconds}초`;
        }
    };

    // 홈으로 이동 핸들러
    const handleHome = () => {
        navigator("/");
    }

    // 마이페이지에서 넘어왔을 떄
    const toMyPage = () => {
        setSubmitState(true); // 시험 완료 상태로 변경
        // data와 같은 데이터로 초기화
        let newWord = answer.map((item, i) => {
            let wordContentList = [item.ctrdQuestionOne, item.ctrdQuestionTwo, item.ctrdQuestionThree, item.ctrdQuestionFour];
            let newWord = {
                wordChinese : item.ctrdAnswerChinese,
                wordContent : item.ctrdAnswerContent,
                wordMeaning : item.ctrdAnswerMeaning,
                wordNum : item.wordNum,
                wordContentList : wordContentList,
            }

            setChoiceList((prevChoiceList) => {
                const updatedChoiceList = [...prevChoiceList];
                updatedChoiceList[i] = item.ctrdChoiceNum; // index에 값 추가 또는 업데이트
                return updatedChoiceList;
            });

            setAnswerList((prevAnswerList) => {
                const updatedAnswerList = [...prevAnswerList];
                updatedAnswerList[i] = item.ctrdChoiceNum === item.ctrdQuestionAnswer ? 1 : 2; // index에 값 추가 또는 업데이트
                return updatedAnswerList;
            });

            return newWord;
        });
        setWord(newWord);
        setStudyTime(ctr.ctrTime)


    }

    // 단어 목록 조회 useEffect
    useEffect(() => {
        if (ctr == null || answer == null) {
            return getWordListAPI();
        } else {
            console.log(answer)
            toMyPage();
        }
    }, []);

    // 테스트 시간 계산
    useEffect(() => {
        const timer = setInterval(() => {
            if (!submitState) { // 제출 전까지 시간을 증가시킴
                setStudyTime((prevTime) => prevTime + 1);
            }
        }, 1000); // 1초마다 증가

        // 컴포넌트 언마운트 또는 제출 시 타이머 정리
        return () => clearInterval(timer);
    }, [submitState]);

    return (
        <div className="choice-test-container">
            <div className={"choice-test-all " + (!submitState ? "choice-test-all-margin-top" : "")}>
                {!submitState ?
                    <div className="choice-test-header">
                        <div className="choice-test-progress-bar">
                            <div
                                className="choice-test-progress-bar-fill"
                                style={{width: `${(choiceList.filter(value => value > 0).length / (word.length)) * 100}%`}}
                            >

                            </div>
                        </div>

                    </div>
                    :
                    <div className="choice-test-answer-title">
                        <div className="choice-test-answer-title-point">
                            <p>{answerList.filter(item => item === 1).length} / {word.length}</p>
                        </div>
                        <div className="choice-test-answer-title-content">
                            {answerList.filter(item => item === 1).length > 7 ?
                                <p>너무 잘하셨어요! 지금처럼 꾸준하게 공부해 보세요.</p>
                                :
                                <p>포기하지 마세요! 앞으로 더 좋은 결과가 기다리고 있어요.</p>
                            }
                        </div>
                    </div>
                }


                {!submitState ?
                    <div className="choice-test-title-box">
                        <p>단어 선택 테스트</p>
                    </div>
                    :
                    <div className="choice-test-result-data-box">
                        <div className="choice-result-data-graph-box">
                            <div className="choice-result-data-graph-title">
                                <p>테스트 시간 : {formatStudyTime(studyTime)}</p>
                            </div>
                            <div className="choice-result-data-graph-content">
                                <div className="choice-result-data-graph">
                                    <div className="choice-result-data-graph-svg">
                                        <CircularProgressbar
                                            value={answerList.filter(item => item === 1).length * 10}
                                            text={`${answerList.filter(item => item === 1).length * 10}%`}
                                            size={"15px"}
                                            styles={buildStyles({
                                                textSize: '20px',
                                                // How long animation takes to go from one percentage to another, in seconds
                                                pathTransitionDuration: 0.3,
                                                pathColor: `#4cbc5c`,
                                                textColor: 'rgb(108 123 255)',
                                                trailColor: 'rgb(255 159 89)',
                                                backgroundColor: '#3e98c7',
                                            })}
                                        />
                                    </div>

                                </div>
                                <div className="choice-result-data-point">
                                    <div className="choice-result-data-point-ok-box">
                                        <span className="choice-result-data-point-title">정답</span>
                                        <span
                                            className="choice-result-data-point-count"> {answerList.filter(item => item === 1).length}</span>
                                    </div>
                                    <div className="choice-result-data-point-fail-box">
                                        <span className="choice-result-data-point-title">오답</span>
                                        <span
                                            className="choice-result-data-point-count">{answerList.filter(item => item !== 1).length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="choice-result-recommend-box">
                            <div className="choice-result-recommend-title">
                                <p>추천 목록</p>
                            </div>

                            <div className="choice-result-recommend-link-box"
                                 onClick={() => handleMovePage("/study")}>
                                <div className="choice-result-recommend-link-image">
                                    <img src="/svg/choice1.svg" alt="이미지"/>
                                </div>
                                <div>
                                    <p className="choice-result-recommend-link-title">단어 학습하기</p>
                                    <p className="choice-result-recommend-link-content">테스트를 보기 전 단어 학습을 해보세요!</p>
                                </div>
                            </div>

                            <div className="choice-result-recommend-link-box"
                                 onClick={() => handleMovePage("/test/easy")}>
                                <div>
                                    <img src="/svg/test1.svg" alt="이미지"/>
                                </div>
                                <div>
                                    <p className="choice-result-recommend-link-title">단답형 테스트하기</p>
                                    <p className="choice-result-recommend-link-content">단답형 테스트에 도전해보세요!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }


                {word.map((item, index) => (
                    <div className="choice-test-content-box" key={index}>
                        <div className="choice-test-content-header-box">
                            <div className="choice-test-content-header-left">
                                <p>뜻</p>
                                <Audio inputData={item[index]?.wordContent}/>
                            </div>

                            <div className="choice-test-content-header-right">
                                <p>{index + 1} / {word.length}</p>
                            </div>
                        </div>

                        <div className="choice-test-content-content-box">
                            <p className="choice-test-content-word-content">{item?.wordMeaning}</p>


                            {submitState &&
                                <div
                                    className={answerList[index] === 1 ? "choice-result-content-ok-box" : "choice-result-content-fail-box"}>
                                    <p>{answerList[index] === 1 ? contentText[0] : contentText[1]}</p>
                                </div>
                            }

                        </div>

                        <div className="choice-test-content-choice-box">
                            {word[index]?.wordContentList.map((item, answerIndex) => (
                                <div id={`choice-${answerIndex}`}
                                     className={"choice-test-content-choice-example-box "
                                         + (!submitState ?
                                                 choiceList[index] === answerIndex + 1 ? "choice-text-check-answer " : ""
                                                 :
                                                 (answerList[index] === 1 && choiceList[index] - 1 === answerIndex) ? "test-answer-ok-box "
                                                     :
                                                     (answerList[index] !== 1 && choiceList[index] - 1 === answerIndex) ? "test-answer-fail-box "
                                                         : (word[index].wordContentList[answerIndex] === word[index].wordContent + (word[index].wordChinese && "(" + word[index].wordChinese + ")")) ? "test-answer-ok-box " : ""
                                         )}
                                     onClick={submitState ? undefined : () => handleSetAnswer(index, answerIndex)}
                                     key={answerIndex}>
                                    <div className="choice-example-index">{answerIndex + 1}</div>
                                    <div className="choice-example-word">{item}</div>
                                </div>
                            ))}
                        </div>

                        {!submitState &&
                            <div className="choice-test-content-i-do-not-know-box"
                                 onClick={() => handleSetAnswer(index, 5)}>
                                <div className={(answerList[index] === 3 ? "choice-text-check-answer" : "")}>
                                    <p>잘 모르시겠어요?</p>
                                </div>
                            </div>
                        }


                    </div>
                ))}


                <div className="choice-test-btn-box">
                    <button className="choice-test-btn-home"
                            onClick={handleHome}>
                        홈으로
                    </button>
                    <button className="choice-test-btn-submit"
                            onClick={handleSubmit}>
                        {!submitState ? "제출하기" : "저장하기"}
                    </button>
                </div>


                <div className={`choice-test-side-box ${sideBar ? 'side-box-visible' : 'side-box-hidden'}`}>
                    <div className="choice-test-side-toggle-box" onClick={handleSideBarToggle}>
                        <IoClose/>
                    </div>
                    <div className="choice-test-side-title-box">
                        <p>문제 목록</p>
                    </div>
                    <div className="choice-test-side-content-box">
                        {choiceList.map((item, index) => (
                            <div className="choice-test-side-content-choice-box" key={index}>
                                <div className="choice-test-side-content-test-number">
                                    {!submitState ? index + 1 :
                                        answerList[index] === 1 ? <FaCheck color={"#4cbc5c"}/> :
                                            <IoClose color={"#ff0000bf"}/>}
                                </div>
                                <div className="choice-test-side-content-test-choice">
                                    {item !== 0 ? item : ""}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {!sideBar &&
                    <div className="choice-test-side-on-btn"
                         onClick={handleSideBarToggle}>
                        <CgMenuRound size={35} color="#717082"/>
                    </div>
                }


            </div>
        </div>
    )
}

export default ChoiceTest;
