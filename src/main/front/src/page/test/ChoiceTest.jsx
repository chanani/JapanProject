import "../../styles/test/ChoiceTest.css"
import Audio from "../../component/Audio";
import GrayAndBlue from "../../component/button/GrayAndBlue";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {axiosInstance} from "../../api";
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ChoiceTest = () => {

    // 최종 제출 여부
    const [submitState, setSubmitState] = useState(false);
    // 1 = 정답, 2 = 오답, 3 = 모르겠음
    const [answerList, setAnswerList] = useState(new Array(10).fill(0)); // 정답 체크 목록 (기본값 0)
    // 인덱스가 아닌 입려한 정답의 번호가 들어감
    const [choiceList, setChoiceList] = useState(new Array(10).fill(0)); // 입력한 답 목록 (기본값 0)
    const [word, setWord] = useState([]); // 조회한 단어 목록
    const contentText = ["너무 잘하셨어요! 학습한 보람이 있네요!", "걱정하지 마세요, 아직 배우고 있잖아요!"]
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
        console.log("check", notChoiceAnswer)

        if (notChoiceAnswer > 0) return toast.error("정답을 모두 선택해주세요.");
        console.log("return")
        setSubmitState(true);
        window.scroll(0, 0);
    }

    useEffect(() => {
        console.log(answerList)
        console.log(choiceList)
    }, [answerList]);

    // 단어 목록 조회 API
    const getWordListAPI = () => {
        axiosInstance.get('study/choice', {
            params: {
                level: 1,
                number: 10
            }
        })
            .then((res) => {
                console.log("res", res.data.data)
                setWord(res.data.data);
            })
    }

    // 단어 목록 조회 useEffect
    useEffect(() => {
        getWordListAPI();
    }, []);


    return (
        <div className="choice-test-container">
            <div className="choice-test-all">
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
                                    <CircularProgressbar
                                        value={answerList.filter(item => item === 1).length * 10}
                                        text={`${answerList.filter(item => item === 1).length * 10}%`}
                                        size={"15px"}
                                    />

                                </div>
                                <div className="choice-result-data-point">
                                    <div>
                                        <span>정답</span>
                                        <span>3</span>
                                    </div>
                                    <div>
                                        <span>오답</span>
                                        <span>7</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="choice-result-recommend-box">
                            <div className="choice-result-recommend-title">
                                <p>추천 목록</p>
                            </div>
                            <div></div>
                            <div></div>
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


                            {submitState && contentText[answerList[index] - 1]}

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
                                     onClick={() => handleSetAnswer(index, answerIndex)}
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

                <GrayAndBlue
                    width="70%"
                    text1={"홈으로"}
                    text2={"제출하기"}
                    homePath={handleSubmit}
                    movePath={"/"}
                />

            </div>
        </div>
    )
}

export default ChoiceTest;
