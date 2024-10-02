import {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import Audio from "../../component/Audio";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";


const RecordDetails = () => {
    const location = useLocation();
    const {kind, answer, point, num} = location.state;
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
    // 삭제 핸들러
    const deleteHandle = () => {
        if (!window.confirm('기록을 삭제하시겠습니까 ?')) return;
        deleteAPI();
    }
    const deleteAPI = () => {
        axiosInstance.post('mypage/deleteRecord', {
            recordNum : num
        })
            .then((res) => {
                if(res.status !== 200) return toast.error('기록 삭제 중 오류가 발생하였습니다. 관리자에게 문의해주세요.');
                toast.success('정상적으로 기록이 삭제되었습니다.');
                navigate("/mypage/record");
            })
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
                        {answer?.map((item, index) => (
                            <div
                                className={"result-box-content index" + (index) + (item.rdCheck ? " success" : " fail")}
                                key={index}>
                                <div className="result-header-box">
                                    {<Audio inputData={item.word_vo.wordContent}/>}
                                    <p>{index + 1} / {answer.length}</p>
                                </div>
                                <div className="result-word-box" onClick={(event) => handleCheck(index)}>
                                    {kind ?
                                        check[index] ? item.word_vo.wordMeaning : item.word_vo.wordContent
                                        :
                                        check[index] ? item.word_vo.wordContent : item.word_vo.wordMeaning
                                    }
                                </div>
                                <div className="result-input-box">
                                    <input type="text" value={(answer[index] && item.recordValue) || ''}
                                           className={index} readOnly/>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="submit-box">
                        <button onClick={handleHome}>돌아가기</button>
                        <button onClick={deleteHandle}>삭제하기</button>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default RecordDetails;