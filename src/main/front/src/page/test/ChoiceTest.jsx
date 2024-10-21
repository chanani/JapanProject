import "../../styles/test/ChoiceTest.css"
import Audio from "../../component/Audio";
import GrayAndBlue from "../../component/button/GrayAndBlue";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {axiosInstance} from "../../api";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate} from "react-router-dom";

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
        let notChoiceAnswer = choiceList.filter(item => item === 0).length;
        if (notChoiceAnswer > 0) return toast.error("정답을 모두 선택해주세요.");
        setSubmitState(true);
        window.scroll(0, 0);
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

    // 단어 목록 조회 useEffect
    useEffect(() => {
        getWordListAPI();
    }, []);


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
                                <p>테스트 시간 : 1분</p>
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
                                        <span className="choice-result-data-point-count">{answerList.length}</span>
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
                                 onClick={() => handleSetAnswer(index, 5) }>
                                <div className={(answerList[index] === 3 ? "choice-text-check-answer" : "")}>
                                    <p>잘 모르시겠어요?</p>
                                </div>
                            </div>
                        }


                    </div>
                ))}

                <GrayAndBlue
                    width="70%"
                    text1={"홈으로"}
                    text2={submitState ? "제출하기" : "저장하기"}
                    homePath={"/"}
                    movePath={handleSubmit}
                />

            </div>
        </div>
    )
}

export default ChoiceTest;
