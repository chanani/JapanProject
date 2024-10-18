import '../../styles/study/Choice.css'
import Audio from "../../component/Audio";
import {FaRegArrowAltCircleRight, FaRegStar, FaStar} from "react-icons/fa";
import {useEffect, useState} from "react";
import {axiosInstance} from "../../api";
import {ReactComponent as LevelIcon} from "../../svg/level.svg";
import {ReactComponent as NumberIcon} from "../../svg/number.svg";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import ChoiceResult from "./ChoiceResult";

const Choice = () => {

    let navigator = useNavigate();
    const [level, setLevel] = useState(0); // 문제의 레벨
    const [number, setNumber] = useState(0); // 문제의 수
    const [levelNumberChoice, setLevelNumberChoice] = useState(false); // 학습 시작 여부
    const [word, setWord] = useState([]); // 단어 목록
    const [currentWord, setCurrentWord] = useState(0); // 현재 단어 번호
    const [answerOk, setAnswerOk] = useState([]); // 정답 목록
    const [answerFail, setAnswerFail] = useState([]); // 오답 목록
    const [answerCheck, setAnswerCheck] = useState(false); // 정답 눌렀는지 여부
    const [answerResult, setAnswerResult] = useState(0); // 정답 여부 (0은 체크 전, 1정답, 2오답)
    const [showResult, setShowResult] = useState(false); // 결과 화면 상태
    const contentText = [
        <p className="choice-content-info">일치하는 단어 선택</p>,
        <p className="choice-content-info-ok">좋아요! 노력은 좋은 결실을 맺습니다.</p>,
        <p className="choice-content-info-fail">걱정마세요, 아직 배우고 있잖아요!</p>,
    ]; // 단어 미리 설정


    // 난이도 고르기
    const levelChoiceHandle = (index) => {
        setLevel(index);
    }
    // 단어 수 고르기
    const numberChoiceHandle = (index) => {
        setNumber(index);
    }
    // 학습 시작하기
    const choiceHandle = () => {
        if (level === 0) return toast.error("난이도를 골라주세요.");
        if (number === 0) return toast.error("단어의 수를 골라주세요.");
        setLevelNumberChoice(true);
    }
    // 홈으로
    const homeHandle = () => {
        navigator("/");
    }

    // 정답 맞추기 핸들러
    const checkHandle = (index) => {
        let result = word[currentWord].wordContent;
        if (word[currentWord].wordChinese !== "") {
            result += '(' + word[currentWord].wordChinese + ")";
        }
        const correctIndex = word[currentWord].wordContentList.findIndex(item => item === result);

        // 정답 목록 추가
        if (index === 5) {
            setAnswerFail(prevAnswerFail => [...prevAnswerFail, currentWord]);
            document.getElementById(`choice-${correctIndex}`).classList.add('answer-ok-box');
            setAnswerResult(2);
        } else if (correctIndex === index) {
            setAnswerOk(prevAnswerOk => [...prevAnswerOk, currentWord]);
            document.getElementById(`choice-${correctIndex}`).classList.add('answer-ok-box');
            setAnswerResult(1);
        } else {
            setAnswerFail(prevAnswerFail => [...prevAnswerFail, currentWord]);
            document.getElementById(`choice-${correctIndex}`).classList.add('answer-ok-box');
            document.getElementById(`choice-${index}`).classList.add('answer-fail-box');
            setAnswerResult(2);
        }
        setAnswerCheck(true);
    }

    // 다음으로 넘어가기
    const handleNext = () => {
        if(currentWord === number - 1){
            setShowResult(true); // 결과 화면 보여주기
            return;
        }

        setCurrentWord((current) => current + 1);
        setAnswerCheck(false);
        setAnswerResult(0);

        const choiceElements = document.querySelectorAll('.choice-content-choice-example-box');
        choiceElements.forEach((element) => {
            element.classList.remove('answer-ok-box', 'answer-fail-box');
        });
    }

    // 단어 불러오기
    useEffect(() => {
        if (!levelNumberChoice) return;
        axiosInstance.get(`/study/choice`, {
            params: {
                level: level,
                number: number
            }
        })
            .then((res) => {
                console.log(res.data.data)
                setWord(res.data.data);
            })
            .catch(e => toast.error('단어를 불러오는 중 오류가 발생하였습니다.'));

    }, [levelNumberChoice]);

    if (showResult) { // 결과 화면 렌더링
        return (
            <ChoiceResult
                word={word}
                answerOk={answerOk}
                answerFail={answerFail}
            />
        );
    }

    return (
        <div className="choice-container">
            <div className="choice-all">

                <div className="choice-all-box">

                    <div className="choice-header-box">
                        <div className="choice-header-count">
                            {currentWord + 1}
                        </div>
                        <div className="choice-progress-bar">
                            <div
                                className="choice-progress-bar-fill"
                                style={{width: `${(currentWord / (number - 1)) * 100}%`}}
                            >

                            </div>
                        </div>
                        <div className="choice-header-total-count">
                            {number}
                        </div>
                    </div>

                    <div className="choice-content-box">
                        <div className="choice-content-header-box">
                            <div className="choice-content-header-left">
                                <p>뜻</p>
                            </div>

                            <div className="choice-content-header-right">
                                <Audio inputData={word[currentWord]?.wordContent} />
                            </div>
                        </div>

                        <div className="choice-content-content-box">
                            <p className="choice-content-word-content">{word[currentWord]?.wordMeaning}</p>
                            {contentText[answerResult]}
                        </div>

                        <div className="choice-content-choice-box">
                            {word[currentWord]?.wordContentList.map((item, index) => (
                                <div id={`choice-${index}`}
                                     className="choice-content-choice-example-box"
                                     onClick={() => !answerCheck && checkHandle(index)}
                                     key={index}>
                                    <div className="choice-example-index">{index}</div>
                                    <div className="choice-example-word">{item}</div>
                                </div>
                            ))}
                        </div>

                        <div className="choice-content-i-do-not-know-box">
                            <div onClick={() => !answerCheck && checkHandle(5)}>
                                <p>잘 모르시겠어요?</p>
                            </div>
                        </div>

                        {answerCheck &&
                            <div className="choice-content-next-btn-box"
                                 onClick={handleNext}>
                                <FaRegArrowAltCircleRight size={35} color='rgb(66 85 255)'/>
                            </div>
                        }


                    </div>

                </div>

                {!levelNumberChoice ?
                    <div className="choice-level-number-box-all">
                        <div className="choice-level-box-all">

                            <div className="choice-level-box-header">
                                <div>
                                    <p className="choice-level-title">단어 선택 학습</p>
                                    <p className="choice-level-title-content">어떻게 학습하고 싶으신가요?</p>
                                </div>

                                <img src="/svg/choice1.svg" alt="이미지"/>
                            </div>

                            <div className="choice-level-box-level-box">
                                <p>난이도를 선택해주세요.</p>
                                <div className="choice-level-box-level-box-content">

                                    <div className={(level === 1 ? "level-number-on" : "level-number-off")}
                                         onClick={() => levelChoiceHandle(1)}>
                                        <span>쉬움</span>
                                        <span className="choice-level-box-svg-box"><LevelIcon/></span>
                                    </div>

                                    <div className={(level === 2 ? "level-number-on" : "level-number-off")}
                                         onClick={() => levelChoiceHandle(2)}>
                                        <span>보통</span>
                                        <span className="choice-level-box-svg-box"><LevelIcon/></span>
                                    </div>

                                    <div className={(level === 3 ? "level-number-on" : "level-number-off")}
                                         onClick={() => levelChoiceHandle(3)}>
                                        <span>어려움</span>
                                        <span className="choice-level-box-svg-box"><LevelIcon/></span>
                                    </div>
                                </div>
                            </div>

                            <div className="choice-level-box-number-box">
                                <p>단어의 수를 선택해주세요.</p>
                                <div className="choice-level-box-number-box-content">
                                    <div className={(number === 10 ? "level-number-on" : "level-number-off")}
                                         onClick={() => numberChoiceHandle(10)}>
                                        <span>10개</span>
                                        <span className="choice-number-box-svg-box"><NumberIcon/></span>
                                    </div>

                                    <div className={(number === 20 ? "level-number-on" : "level-number-off")}
                                         onClick={() => numberChoiceHandle(20)}>
                                        <span>20개</span>
                                        <span className="choice-number-box-svg-box"><NumberIcon/></span>
                                    </div>

                                    <div className={(number === 30 ? "level-number-on" : "level-number-off")}
                                         onClick={() => numberChoiceHandle(30)}>
                                        <span>30개</span>
                                        <span className="choice-number-box-svg-box"><NumberIcon/></span>
                                    </div>

                                    <div className={(number === 40 ? "level-number-on" : "level-number-off")}
                                         onClick={() => numberChoiceHandle(40)}>
                                        <span>40개</span>
                                        <span className="choice-number-box-svg-box"><NumberIcon/></span>
                                    </div>
                                </div>


                            </div>

                            <div className="choice-level-btn-box">
                                <button className="choice-level-btn-home"
                                        onClick={homeHandle}>홈으로
                                </button>
                                <button className="choice-level-btn-submit"
                                        onClick={choiceHandle}>학습 시작하기
                                </button>
                            </div>

                        </div>
                    </div>
                    :
                    ""
                }


            </div>
        </div>
    );
}

export default Choice;