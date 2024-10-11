import "../../styles/study/ChoiceResult.css"
import {FaRegStar, FaStar} from "react-icons/fa";
import Audio from "../../component/Audio";
import React from "react";

const ChoiceResult = ({word, answerOk, answerFail}) => {
    const contentText = [<p className="">너무 잘하셨어요!</p>, <p className="">다음번에는 더 잘할 수 있습니다!</p>]; // 단어 미리 설정


    // 맞은 문제 필터링
    const answerOkWords = answerOk.map(index => word[index]);
    const answerFailWords = answerFail.map(index => word[index]);


    return (
        <div className="choice-result-container">
            <div className="choice-result-all">

                <div className="choice-result-header">
                    <div className="choice-result-title">
                        {(answerOk.length / word.length) * 100 >= 80 ? contentText[0] : contentText[1]}
                    </div>

                    <div className="choice-result-var">

                        <div className="choice-result-progress-bar">
                            <div
                                className="choice-result-progress-bar-fill"
                                style={{width: `${(answerOk.length / (word.length)) * 100}%`}}
                            >

                            </div>
                        </div>

                        <div className="choice-result-header-count-box">
                            <div className="choice-result-header-count">
                                <span>{answerOk.length}</span>
                                <p>정답</p>
                            </div>
                            <div className="choice-result-header-total-count">
                                <span>{word.length}</span>
                                <p>총 문제</p>
                            </div>
                        </div>

                    </div>

                    <div className="choice-result-ok-box">

                        <div className="choice-result-ok-title-box">
                            <p>이번 학습에서 맞춘 단어</p>
                        </div>

                        <div className="choice-result-ok-content-box">
                            {answerOk.length < 1 ?
                                <div className="choice-result-not-data">
                                    <p>조금 더 열심히 해보세요!</p>
                                </div> :
                                <div className="choice-result-ok-content">
                                    {answerOkWords?.map((item, index) => (
                                        <div className="choice-result-ok-map-content-box" key={index}>
                                            <div className="choice_result-ok-map-meaning">{item.wordMeaning}</div>
                                            <div className="choice-change-position-var" style={{padding: "0"}}></div>

                                            <div
                                                className="choice_result-ok-map-content">{item.wordContent}{item.wordChinese && '(' + item.wordChinese + ')'}</div>

                                            {/*<div className="choice-change-position-var" style={{padding: "0"}}></div>*/}

                                            <div className="choice_result-ok-map-icon">
                                                {1 == 1 ?
                                                    <FaRegStar size={21}/>
                                                    :
                                                    <FaStar size={21}/>
                                                }
                                                <Audio inputData={item?.wordContent}/>
                                            </div>
                                        </div>
                                    ))}
                                </div>}
                        </div>

                    </div>


                    <div className="choice-result-fail-box">

                        <div className="choice-result-fail-title-box">
                            <p>이번 학습에서 틀린 단어</p>
                        </div>

                        <div className="choice-result-fail-content-box">
                            {answerFail.length < 1 ?
                                <div className="choice-result-not-data">
                                    <p>틀린 문제가 없습니다!</p>
                                </div> :
                                <div className="choice-result-ok-content">
                                    {answerFailWords?.map((item, index) => (
                                        <div className="choice-result-ok-map-content-box" key={index}>
                                            <div className="choice_result-ok-map-meaning">{item.wordMeaning}</div>
                                            <div className="choice-change-position-var" style={{padding: "0"}}></div>

                                            <div
                                                className="choice_result-ok-map-content">{item.wordContent}{item.wordChinese && '(' + item.wordChinese + ')'}</div>

                                            {/*<div className="choice-change-position-var" style={{padding: "0"}}></div>*/}

                                            <div className="choice_result-ok-map-icon">
                                                {1 == 1 ?
                                                    <FaRegStar size={21}/>
                                                    :
                                                    <FaStar size={21}/>
                                                }
                                                <Audio inputData={item?.wordContent}/>
                                            </div>
                                        </div>
                                    ))}
                                </div>}
                        </div>

                    </div>


                </div>

                <div className="choice-result-btn-box">
                    <button >목록으로</button>
                </div>

            </div>
        </div>)
}

export default ChoiceResult;