import "../../styles/study/ChoiceResult.css";
import {FaRegStar, FaStar} from "react-icons/fa";
import Audio from "../../component/Audio";
import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {toast} from "react-toastify";
import {axiosInstance} from "../../api";

const ChoiceResult = ({word, answerOk, answerFail}) => {
    const contentText = [<p className="">너무 잘하셨어요!</p>, <p className="">다음번에는 더 잘할 수 있습니다!</p>];
    let navigator = useNavigate();
    const {userRole, username} = useContext(tokenInfoContext);
    const [favoriteList, setFavoriteList] = useState([]);
    const [favoriteState, setFavoriteState] = useState(false);

    // 홈으로 가는 핸들러
    const handleHome = () => {
        navigator("/");
    };

    // 즐겨찾기 등록 핸들러
    const handleFavorite = (index) => {
        if (userRole === "none") return toast.error("로그인 후 이용해주세요.");
        favoriteAPI(index);
    };

    // 즐겨찾기 등록 API
    const favoriteAPI = (index) => {
        axiosInstance.get(`study/choice-result-addFavorite`,{
                params : {
                    wordNum : word[index].wordNum,
                    username : username
                }
            })
            .then((res) => {
                setFavoriteState((current) => !current);
            })
            .catch(() => toast.error('데이터를 저장하는 중 에러가 발생하였습니다. 관리자에게 문의해주세요.'));
    };

    // 페이지 진입 시 단어들 즐겨 찾기 되어있는지 여부 확인
    const favoriteCheckAPI = () => {
        let payload = word.map(item => item.wordNum);
        axiosInstance.post('study/choice-result/favoriteCheck', {
            wordNum: payload,
            username : username
        })
            .then((res) => {
                setFavoriteList(res.data.data);
            })
            .catch((e) => toast.error('데이터를 불러오는 중 오류가 발생하였습니다.'));
    }

    // 즐겨 찾기 여부 목록 조회
    useEffect(() => {
        if (userRole !== "none") {
            favoriteCheckAPI();
        }
    }, [favoriteState]);

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
                                style={{width: `${(answerOk.length / word.length) * 100}%`}}
                            />
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
                            {answerOk.length < 1 ? (
                                <div className="choice-result-not-data">
                                    <p>조금 더 열심히 해보세요!</p>
                                </div>
                            ) : (
                                <div className="choice-result-ok-content">
                                    {word.map((item, index) =>
                                        answerOk.includes(index) ? (
                                            <div className="choice-result-ok-map-content-box" key={index}>
                                                <div className="choice_result-ok-map-meaning">{item.wordMeaning}</div>
                                                <div className="choice-change-position-var"
                                                     style={{padding: "0"}}></div>

                                                <div className="choice_result-ok-map-content">
                                                    {item.wordContent}
                                                    {item.wordChinese && '(' + item.wordChinese + ')'}
                                                </div>

                                                <div className="choice_result-ok-map-icon">
                                                    { !favoriteList[index]?
                                                        <FaRegStar size={21} onClick={() => handleFavorite(index)}/>
                                                        :
                                                        <FaStar size={21} onClick={() => handleFavorite(index)}/>
                                                    }
                                                    <Audio inputData={item?.wordContent}/>
                                                </div>
                                            </div>
                                        ) : null
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="choice-result-fail-box">
                        <div className="choice-result-fail-title-box">
                            <p>이번 학습에서 틀린 단어</p>
                        </div>

                        <div className="choice-result-fail-content-box">
                            {answerFail.length < 1 ? (
                                <div className="choice-result-not-data">
                                    <p>틀린 문제가 없습니다!</p>
                                </div>
                            ) : (
                                <div className="choice-result-ok-content">
                                    {word.map((item, index) =>
                                        answerFail.includes(index) ? (
                                            <div className="choice-result-ok-map-content-box" key={index}>
                                                <div className="choice_result-ok-map-meaning">{item.wordMeaning}</div>
                                                <div className="choice-change-position-var"
                                                     style={{padding: "0"}}></div>

                                                <div className="choice_result-ok-map-content">
                                                    {item.wordContent}
                                                    {item.wordChinese && '(' + item.wordChinese + ')'}
                                                </div>

                                                <div className="choice_result-ok-map-icon">
                                                    { !favoriteList[index]?
                                                        <FaRegStar size={21} onClick={() => handleFavorite(index)}/>
                                                        :
                                                        <FaStar size={21} onClick={() => handleFavorite(index)}/>
                                                    }
                                                    <Audio inputData={item?.wordContent}/>
                                                </div>
                                            </div>
                                        ) : null
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                <div className="choice-result-btn-box">
                    <button onClick={handleHome}>목록으로</button>
                </div>

            </div>
        </div>
    );
};

export default ChoiceResult;
