import "../../styles/test/ChoiceTest.css"
import Audio from "../../component/Audio";
import {FaRegArrowAltCircleRight} from "react-icons/fa";

const ChoiceTest = () => {

    const word = [{
        wordContent : "asd",
        wordMeaning : "뜻ㅎㅎㅎ",
        wordChinese : "ㅎㅎ"
    },{
        wordContent : "asd",
        wordMeaning : "뜻ㅎㅎㅎ",
        wordChinese : "ㅎㅎ"
    },{
        wordContent : "asd",
        wordMeaning : "뜻ㅎㅎㅎ",
        wordChinese : "ㅎㅎ"
    },{
        wordContent : "asd",
        wordMeaning : "뜻ㅎㅎㅎ",
        wordChinese : "ㅎㅎ"
    },{
        wordContent : "asd",
        wordMeaning : "뜻ㅎㅎㅎ",
        wordChinese : "ㅎㅎ"
    },]

    return (
        <div className="choice-test-container">
            <div className="choice-test-all">

                <div className="choice-test-header">
                    <p>10 / 30</p>
                    <div className="choice-test-progress-bar">
                        <div
                            className="choice-test-progress-bar-fill"
                            style={{width: `${(10 / (30 - 1)) * 100}%`}}
                        >

                        </div>
                    </div>
                </div>

                <div className="choice-test-content-box">
                    <div className="choice-test-content-header-box">
                        <div className="choice-test-content-header-left">
                            <p>뜻</p>
                        </div>

                        <div className="choice-test-content-header-right">
                            <Audio inputData={word[0]?.wordContent}/>
                        </div>
                    </div>

                    <div className="choice-test-content-content-box">
                        <p className="choice-test-content-word-content">{word[0]?.wordMeaning}</p>
{/*
                        {contentText[answerResult]}
*/}
                    </div>

                   {/* <div className="choice-test-content-choice-box">
                        {word[currentWord]?.wordContentList.map((item, index) => (
                            <div id={`choice-${index}`}
                                 className="choice-test-content-choice-example-box"
                                 onClick={() => !answerCheck && checkHandle(index)}
                                 key={index}>
                                <div className="choice-example-index">{index}</div>
                                <div className="choice-example-word">{item}</div>
                            </div>
                        ))}
                    </div>*/}

                    {/*<div className="choice-test-content-i-do-not-know-box">
                        <div onClick={() => !answerCheck && checkHandle(5)}>
                            <p>잘 모르시겠어요?</p>
                        </div>
                    </div>*/}

                   {/* {answerCheck &&
                        <div className="choice-test-content-next-btn-box"
                             onClick={handleNext}>
                            <FaRegArrowAltCircleRight size={35} color='rgb(66 85 255)'/>
                        </div>
                    }*/}


                </div>


            </div>
        </div>
    )
}

export default ChoiceTest;