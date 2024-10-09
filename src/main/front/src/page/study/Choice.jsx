import '../../styles/study/Choice.css'
import Audio from "../../component/Audio";
import {FaRegStar, FaStar} from "react-icons/fa";

const Choice = () => {

    let test = ["단어", 'ㅎㅎ', "출발", "ㅋㅋ"];


    return (
        <div className="choice-container">
            <div className="choice-all">

                <div className="choice-all-box">

                    <div className="choice-header-box">
                        <div className="choice-header-count">
                            10
                        </div>
                        <div className="choice-progress-bar">
                            <div
                                className="choice-progress-bar-fill"
                                style={{width: `${(10 / (30 - 1)) * 100}%`}}
                            >

                            </div>
                        </div>
                        <div className="choice-header-total-count">
                            30
                        </div>
                    </div>

                    <div className="choice-content-box">
                        <div className="choice-content-header-box">
                            <div className="choice-content-header-left">
                                <p>뜻</p>
                            </div>

                            <div className="choice-content-header-right">
                                {1 == 1 ?
                                    <FaRegStar size={21}/>
                                    :
                                    <FaStar size={21}/>
                                }
                                <Audio inputData={11}/>
                            </div>
                        </div>

                        <div className="choice-content-content-box">
                            <p className="choice-content-word-content">사탕</p>
                            <p className="choice-content-info">일치하는 단어 선택</p>
                        </div>

                        <div className="choice-content-choice-box">
                            {test.map((item, index) => (
                                <div className="choice-content-choice-example-box" key={index}>
                                    <div>{index}</div>
                                    <div>{item}</div>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Choice;