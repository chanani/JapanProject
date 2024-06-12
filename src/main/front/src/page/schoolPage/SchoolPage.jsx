import "../../styles/schoolPage/SchoolPage.css";
import {useContext, useEffect, useState} from "react";
import {FaStar} from "react-icons/fa";
import {axiosInstance} from "../../api";
import Audio from "../../component/Audio";
import {toast} from "react-toastify";
import {TbCircleLetterN} from "react-icons/tb";
import moment from "moment/moment";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {useNavigate} from "react-router-dom";

const SchoolPage = () => {
    const [mode, setMode] = useState(1);
    const [word, setWord] = useState([]);
    const [week, setWeek] = useState([]);
    const [nowWeek, setNowWeek] = useState(1);
    const [check, setCheck] = useState([]);
    const [animateIndex, setAnimateIndex] = useState(null); // 애니메이션 인덱스 상태 추가
    // 목록 불러오는 API
    const getListAPI = () => {
        axiosInstance.get('mypage/getSchoolList', {
            params: {
                school_week: nowWeek
            }
        })
            .then((res) => {
                setWord(res.data);
                setCheck(new Array(res.data.length).fill(false));
            })
    }

    // 단어, 뜻 변경 핸들러
    const typeChangeHandle = (index) => {
        setAnimateIndex(index);
        setTimeout(() => {
            setCheck(prevCheck => {
                const newCheck = [...prevCheck];
                newCheck[index] = !newCheck[index];
                return newCheck;
            });
            setAnimateIndex(null); // 애니메이션 종료 후 초기화
        }, 300); // 애니메이션 지속 시간과 일치
    }

    // selectBox(주차) 불러오는 API
    const getWeekAPI = () => {
        axiosInstance.get('mypage/getWeekList')
            .then((res) => {
                if (res.data === 'NOT_FOUND') toast.error('조회하려는 목록이 없습니다.');
                setWeek(res.data);
            })
    }

    const weekChangeHandle = (event) => {
        setNowWeek(event.target.value);
    }
    // 모드 변경 핸들러
    const modeChangeHandle = () => {
        if (mode === 1) setMode(2);
        else if (mode === 2) setMode(1);
    }

    // 목록 불러오기
    useEffect(() => {
        getListAPI();
    }, [nowWeek]);
    // 주차 목록 불러오기

    // 주차 목록 불러오기
    useEffect(() => {
        // 일본어 : ja, 영어 : en, 한국어 : ko, 이탈리아어 : it
        axiosInstance.get('translator/changeWord', {
            params : {
                word : "엔지니어",
                from : "ko",
                to : "ja"
            }
        })
            .then((res) => {
                console.log(res.data)
            })
        getWeekAPI();
    }, [])

    return (
        <div className='school-container'>
            <div className='school-box'>
                <div className='school-box-title'>
                    <p>단계별 학습</p>
                </div>

                <div className='school-select-box'>
                    <select name="" id="" onChange={weekChangeHandle}>
                        {week.map((item, index) => (
                            <option key={index} value={item}>{item}주차</option>
                        ))}
                    </select>
                </div>

                <div className='school-mode-box'>
                    <div className={mode === 1 ? 'mode-back-ground-color' : ""}
                         style={{borderRadius: "15px 0 0 0"}}
                         onClick={modeChangeHandle}
                    >
                        <p>단어형</p>
                    </div>
                    <div className={mode === 2 ? 'mode-back-ground-color' : ""}
                         style={{borderRadius: "0 15px 0 0"}}
                         onClick={modeChangeHandle}
                    >
                        <p>리스트형</p>
                    </div>
                </div>

                {mode === 1 ?
                    <div className="school-mode-one-box">
                        <div className="school-data">
                            {word.map((item, index) => (
                                <div className="school-data-box" key={index} onClick={() => typeChangeHandle(index)}>
                                    <div className="school-data-star">
                                        <Audio inputData={item.school_content}/>
                                    </div>
                                    <div className="school-data-text">
                                        <p className={`school-word-content ${animateIndex === index ? 'fade-out' : ''}`}>
                                            {!check[index] ? item.school_content : item.school_meaning}
                                        </p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                    :
                    <div className="school-mode-two-box">
                        {word.map((item, index) => (
                            <div className="school-content-box" key={index} onClick={(e) => (index)}>
                                <p className="content-box-p-tag"　style={{paddingTop: "1px"}}>
                                    {item.school_content} {item.school_chinese ? `/ ${item.school_chinese}` : ""}
                                </p>
                                <p style={{paddingTop: "1px"}}>
                                    {item.school_meaning}
                                </p>
                                <p className="school-audio">
                                    <Audio inputData={item.school_content}/>
                                </p>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default SchoolPage;
