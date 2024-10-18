import "../../styles/test/ChoiceTest.css"
import Audio from "../../component/Audio";
import GrayAndBlue from "../../component/button/GrayAndBlue";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

const ChoiceTest = () => {

    // 최종 제출 여부
    const [submitState, setSubmitState] = useState(false);
    // 1 = 정답, 2 = 오답, 3 = 모르겠음
    const [answerList, setAnswerList] = useState(new Array(10).fill(0)); // 정답 체크 목록 (기본값 0)
    // 인덱스가 아닌 입려한 정답의 번호가 들어감
    const [choiceList, setChoiceList] = useState(new Array(10).fill(0)); // 입력한 답 목록 (기본값 0)



    // 답 클릭 핸들러(모르겠음은 5로 데이터 전달)
    const handleSetAnswer = (index, answerIndex) => {
        let answer = word[index].wordContent;
        let choice = word[index].wordContentList[answerIndex];
        let updatedAnswers = [...answerList];
        let updatedChoice = [...choiceList];
        if(answerIndex === 5){
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

        if(notChoiceAnswer > 0) return toast.error("정답을 모두 선택해주세요.");
        console.log("return")
        setSubmitState(true);
    }


    useEffect(() => {
        console.log(answerList)
        console.log(choiceList)
    }, [answerList]);

    const word = [{
        wordContent: "asd",
        wordMeaning: "뜻ㅎㅎㅎ",
        wordChinese: "ㅎㅎ",
        wordContentList: ["asd", 'ㅁㄴㅇ', 'ㅁㄴㅇ', 'ㅁㄴㅇㅊ']
    }, {
        wordContent: "asd",
        wordMeaning: "뜻ㅎㅎㅎ",
        wordChinese: "ㅎㅎ",
        wordContentList: ["ㅁㄴㅇ", 'ㅁㄴㅇ', 'ㅁㄴㅇ', 'ㅁㄴㅇㅊ']

    }, {
        wordContent: "asd",
        wordMeaning: "뜻ㅎㅎㅎ",
        wordChinese: "ㅎㅎ",
        wordContentList: ["ㅁㄴㅇ", 'ㅁㄴㅇ', 'ㅁㄴㅇ', 'ㅁㄴㅇㅊ']

    }, {
        wordContent: "asd",
        wordMeaning: "뜻ㅎㅎㅎ",
        wordChinese: "ㅎㅎ",
        wordContentList: ["ㅁㄴㅇ", 'ㅁㄴㅇ', 'ㅁㄴㅇ', 'ㅁㄴㅇㅊ']

    }, {
        wordContent: "asd",
        wordMeaning: "뜻ㅎㅎㅎ",
        wordChinese: "ㅎㅎ",
        wordContentList: ["ㅁㄴㅇ", 'ㅁㄴㅇ', 'ㅁㄴㅇ', 'ㅁㄴㅇㅊ']
    },]

    return (
        <div className="choice-test-container">
            <div className="choice-test-all">

                <div className="choice-test-header">
                    <div className="choice-test-progress-bar">
                        <div
                            className="choice-test-progress-bar-fill"
                            style={{width: `${(choiceList.filter(value =>  value > 0).length / (word.length)) * 100}%`}}
                        >

                        </div>
                    </div>
                    {/*<p>{choiceList.filter(value =>  value > 0).length} / {word.length}</p>*/}
                </div>

                <div className="choice-test-title-box">
                    <p>단어 선택 테스트</p>
                </div>

                {word.map((item, index) => (
                    <div className="choice-test-content-box" key={index}>
                        <div className="choice-test-content-header-box">
                            <div className="choice-test-content-header-left">
                                <p>뜻</p>
                                <Audio inputData={word[index]?.wordContent}/>
                            </div>

                            <div className="choice-test-content-header-right">
                                <p>{index + 1} / {word.length}</p>
                            </div>
                        </div>

                        <div className="choice-test-content-content-box">
                            <p className="choice-test-content-word-content">{word[0]?.wordMeaning}</p>
                            {/*
                        {contentText[answerResult]}
*/}
                        </div>

                        <div className="choice-test-content-choice-box">
                            {word[index]?.wordContentList.map((item, answerIndex) => (
                                <div id={`choice-${answerIndex}`}
                                     className={"choice-test-content-choice-example-box "
                                         + (choiceList[index] === answerIndex + 1 ? "choice-text-check-answer" : "")}
                                     onClick={() => handleSetAnswer(index, answerIndex)}
                                     key={answerIndex}>
                                    <div className="choice-example-index">{answerIndex + 1}</div>
                                    <div className="choice-example-word">{item}</div>
                                </div>
                            ))}
                        </div>

                        <div className="choice-test-content-i-do-not-know-box"
                        onClick={() => handleSetAnswer(index, 5)}>
                            <div className={(answerList[index] ===  3 ? "choice-text-check-answer" : "")}>
                                <p>잘 모르시겠어요?</p>
                            </div>
                        </div>


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