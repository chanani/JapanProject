import {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import Audio from "../../component/Audio";


const RecordDetails = () => {
    const location = useLocation();
    const {kind, answer, point} = location.state;
    const navigate = useNavigate();
    const [check, setCheck] = useState([false, false, false, false, false, false, false, false, false, false]);
    // 학습 기록 페이지로 이동하는 핸들러
    const handleHome = () => {
        navigate("/mypage/record");
    }
    // 정답 확인 핸들러
    const handleCheck = (index) => {
        let newCheck = [...check];
        newCheck[index] = !newCheck[index];
        setCheck(newCheck);
        setTimeout(() => {
            const box = document.querySelector('.index' + index);
            box.classList.toggle('fade-out');
        }, 100);
    }

    return (
        <div className="result-page-all">
            <div className="result-page-mid">

                <div className="result-on-box">
                    <div className="result-on-header-box">
                        <h3>{point}점 입니다.</h3>
                        {point === 10 ? "" : <p>단어를 클릭하여 답을 확인하세요.</p>}
                    </div>
                    <div className="result-box">
                        {answer.map((item, index) => (
                            <div
                                className={"result-box-content index" + (index) + (item.rd_check ? " success" : " fail")}
                                key={index}>
                                <div className="result-header-box">
                                    {<Audio inputData={item.word_vo.word_content}/>}
                                    <p>{index + 1} / {answer.length}</p>
                                </div>
                                <div className="result-word-box" onClick={(event) => handleCheck(index)}>
                                    {kind ?
                                        check[index] ? item.word_vo.word_meaning : item.word_vo.word_content
                                        :
                                        check[index] ? item.word_vo.word_content : item.word_vo.word_meaning
                                    }
                                </div>
                                <div className="result-input-box">
                                    <input type="text" value={(answer[index] && item.record_value) || ''}
                                           className={index} readOnly/>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="submit-box">
                        <button onClick={handleHome}>돌아가기</button>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default RecordDetails;