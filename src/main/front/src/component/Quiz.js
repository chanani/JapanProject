import {useContext, useEffect, useState} from 'react';
import '../styles/component/Quiz.css';
import {FaPlay} from "react-icons/fa";

import {MdOutlineSensorDoor} from "react-icons/md";
import {FaRegStar} from "react-icons/fa";
import {FaStar} from "react-icons/fa";
import {Link} from 'react-router-dom';
import {FaStopCircle} from "react-icons/fa";
import Audio from './Audio';
import {tokenInfoContext} from './TokenInfoProvider';
import {axiosInstance} from '../api';
import {toast} from "react-toastify";
import {FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight} from "react-icons/fa";


const Quiz = ({level, num, arr}) => {
    let [word, setWord] = useState([]);
    const [current, setCurrent] = useState(0);
    const [meaning, setMeaning] = useState(false);
    const [play, setPlay] = useState(false);
    const [help, setHelp] = useState(false);
    const {userRole, username} = useContext(tokenInfoContext);

    // 단위 뒤집는 핸들러
    const handleMeaning = () => {
        setMeaning((meaning) => !meaning);
        setTimeout(() => {
            const box = document.querySelector('.study-on-header-box');
            box.classList.toggle('fade-out');
        }, 100);
    };
    // 즐겨찾기 핸들러
    const handleStar = () => {
        if (userRole === 'none') return toast.error("로그인 후 이용해주세요.");
        else {
            setWord(prevWord => {
                const newWord = [...prevWord];
                newWord[current].wordFavorite = !newWord[current].wordFavorite;
                return newWord;
            });
            changeFavorite();
        }
    }
    // 즐겨 찾기 백엔드로 전달
    const changeFavorite = () => {
        axiosInstance.get(`study/addFavorite/${word[current].wordNum}/${!word[current].wordFavorite}/${username}`)
            .catch((e) => toast.error('데이터를 저장하는 중 에러가 발생하였습니다. 관리자에게 문의해주세요.'))
    }
    // +1 핸들러
    const handleNext = () => {
        setCurrent((current) => {
            if (current >= num - 1) {
                toast.error('더 이상 단어가 없습니다.');
                return current; // 그대로 유지
            }
            return current + 1;
        });
    }
    // -1 핸들러
    const handleBack = () => {
        setCurrent((current) => {
            if (current <= 0) {
                toast.error('첫 번째 단어입니다.');
                return current;
            }
            return current - 1;
        });
    }


    // 자동 넘기기 핸들러
    const handlePlay = () => {
        setPlay((play) => !play);
    }
    // 자동 넘기기 기능
    useEffect(() => {
        let autoPlayInterval;
        if (play) {
            autoPlayInterval = setInterval(() => {
                setCurrent((prevCurrent) => {
                    if (prevCurrent < word.length - 1) {
                        return prevCurrent + 1;
                    } else {
                        clearInterval(autoPlayInterval);
                        setPlay(false);
                        return prevCurrent;
                    }
                });
            }, 3000);
        } else {
            clearInterval(autoPlayInterval);
        }
        return () => {
            clearInterval(autoPlayInterval);
        };
    }, [play, word.length]);

    // 키보드 입력 감지
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Space') {
                event.preventDefault(); // 스크롤 방지
                handleMeaning();
            } else if (event.code === 'ArrowRight') {
                event.preventDefault();
                handleNext();
            } else if (event.code === 'ArrowLeft') {
                event.preventDefault();
                handleBack();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // 단어 및 즐겨찾기 가져오기
    useEffect(() => {
        if (arr.length !== 0) setWord(arr);
        else {
            axiosInstance(`study/data/${level}/${num}/${username}`)
                .then((res) => {
                    setWord(res.data);
                })
                .catch((e) => toast.error('데이터를 불러오는 중 에러가 발생하였습니다. 관리자에게 문의해주세요.'));
        }
    }, [arr, level, num, username]);

    // help 상태 관리
    const handleHelpChange = (event) => {
        setHelp(event.target.checked);
    };


    return (
        <div className='study-on-box'>

            <div className="study-on-header-box">
                <div className="progress-bar">
                    <div
                        className="progress-bar-fill"
                        style={{width: `${(current / (num - 1)) * 100}%`}}
                    ></div>
                </div>
                <div className='on-header-box'>

                    {word.length > 0 && current >= 0 && word[current].wordFavorite === false ?
                        <FaRegStar size={21} onClick={handleStar}/>
                        :
                        <FaStar size={21} onClick={handleStar}/>}

                    <Audio inputData={word[current]?.wordContent}/>


                </div>

                <div className='on-word-box' onClick={handleMeaning}>
                    {meaning ? word[current]?.wordMeaning :
                        word[current]?.wordChinese === null || word[current]?.wordChinese === '' ?
                            <div>
                                <p>{word[current]?.wordContent}</p>
                            </div>
                            :
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column"
                            }}>
                                <p style={{fontSize: "20px"}}>{word[current]?.wordContent}</p>
                                <p>{word[current]?.wordChinese}</p>
                            </div>

                    }
                </div>
                {help ?
                    meaning ?
                        <div className="help-box">
                            <p>방향키를 눌러 다음 단어를 확인하세요</p>
                        </div>
                        :
                        <div className="help-box">
                            <p>카드를 클릭 또는 Spacebar를 눌러 뒤집으세요</p>
                        </div>
                    :
                    ""
                }
            </div>

            <div className="study-on-footer-box">

                <div className='on-click-box'>

                    <div className='click-mid'>
                        {current === 0 ?
                            <FaRegArrowAltCircleLeft size={35} color='#d2cfcf'/>
                            :
                            <FaRegArrowAltCircleLeft size={35} onClick={handleBack} color='#4e4e4e'/>}

                        <p>{current + 1} / {word.length}</p>
                        {current === word.length - 1 ?
                            <FaRegArrowAltCircleRight size={35} color='#d2cfcf'/>
                            :
                            <FaRegArrowAltCircleRight size={35} onClick={handleNext} color='#4e4e4e'/>
                        }
                    </div>

                </div>

                <div className="study-on-play-box">
                    <div className='click-left'>
                        {play ?
                            <FaStopCircle size={26} onClick={handlePlay} color='#4e4e4e'/>
                            :
                            <FaPlay size={23} onClick={handlePlay} color='#4e4e4e'/>
                        }
                    </div>

                    <div className="study-rule-box">
                        <fieldset>
                            <label>
                                <span>이용방법</span>
                                <input role="switch"
                                       type="checkbox"
                                       checked={help}
                                       onChange={handleHelpChange}/>
                            </label>

                        </fieldset>
                    </div>

                    <div className='click-right'>
                        <Link to={"/"}><MdOutlineSensorDoor size={30} color='#4e4e4e'/></Link>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Quiz;