import {useContext, useEffect, useState} from 'react';
import '../../styles/study/Study.css';

import {MdOutlineSensorDoor} from "react-icons/md";
import {FaRegStar} from "react-icons/fa";
import {FaStar} from "react-icons/fa";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Audio from '../../component/Audio';
import {axiosInstance} from '../../api';
import {toast} from "react-toastify";
import {FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight} from "react-icons/fa";
import {IoPlayCircle, IoStopCircle} from "react-icons/io5";
import {IoIosArrowUp, IoIosArrowDown} from "react-icons/io";
import {FaExchangeAlt} from "react-icons/fa";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {useDialog} from "../../hook/UseDialog.jsx";


const Study = () => {
    const location = useLocation();
    let navigator = useNavigate();
    const {soloWord} = location.state || {}; // 넘겨받은 데이터
    const {userRole, username} = useContext(tokenInfoContext);
    const [word, setWord] = useState([]); // 단어 데이터
    const [current, setCurrent] = useState(0); // 현재 인덱스
    const [meaning, setMeaning] = useState(false); // 뜻 보이기, 숨기기 여부
    const [play, setPlay] = useState(false); // 자동으로 단어 넘기기
    const [help, setHelp] = useState(true); // 이용 방법 활성화 여부
    const [hiragana, setHiragana] = useState(true); // 히라나가 활성화 여부
    const [chinese, setChinese] = useState(true); // 한자 활성화 여부
    const [showList, setShowList] = useState(true) // 학습 단어 목록 보이기 여부
    const [showButton, setShowButton] = useState(false); // 단어 목록 보여주기, 숨김 관리
    const [listHiddenWord, setListHiddenWord] = useState(true); // 단어 목록 단어 숨기기
    const [listHiddenContent, setListHiddenContent] = useState(true); // 단어 목록  뜻 숨기기
    const [isEndReached, setIsEndReached] = useState(false); // 단어 목록 높이 관리
    const [listChangeBtn, setListChangeBtn] = useState(false) // 단어 목록 숨김 버튼 false 뜻
    const [studyLevel, setStudyLevel] = useState(1); // 테스트 레벨
    const [soloStudyState, setSoloStudyState] = useState(false); // 세트 학습에서 왔는지 여부
    const {openConfirm} = useDialog();

    // 단위 뒤집는 핸들러
    const handleMeaning = () => {
        setMeaning((meaning) => !meaning);
        setTimeout(() => {
            const box = document.querySelector('.study-on-header-box');
            box.classList.toggle('fade-out');
        }, 100);
    };
    // 즐겨찾기 핸들러
    const handleStar = (index) => {
        if (userRole === 'none') return toast.error("로그인 후 이용해주세요.");
        else {
            setWord(prevWord => {
                const newWord = [...prevWord];
                newWord[index].wordFavorite = !newWord[index].wordFavorite;
                return newWord;
            });
            changeFavorite(index);
        }
    }
    // 즐겨 찾기 백엔드로 전달
    const changeFavorite = (index) => {
        axiosInstance.get(`study/addFavorite/${word[index].wordNum}/${!word[index].wordFavorite}/${username}`)
            .catch((e) => toast.error('데이터를 저장하는 중 에러가 발생하였습니다. 관리자에게 문의해주세요.'))
    }
    // +1 핸들러
    const handleNext = () => {
        setCurrent((prevCurrent) => {
            if (prevCurrent >= word.length - 1) {
                toast.error('더 이상 단어가 없습니다.');
                return prevCurrent; // 그대로 유지
            }
            setMeaning(false);
            return prevCurrent + 1;
        });
    }
    // -1 핸들러
    const handleBack = () => {
        setCurrent((current) => {
            if (current <= 0) {
                toast.error('첫 번째 단어입니다.');
                return current;
            }
            setMeaning(false);
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
    }, [play, word?.length]);

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
    }, [word]);

    // 이용방법 상태 관리
    const handleHelpChange = (event) => {
        setHelp(event.target.checked);
    };
    // 히라가나와 가타가나 보이기, 숨기기 상태 관리
    const handleBlackContent = (type) => {

        if (type === 'hiragana') {
            if (!chinese) return toast.error('히라가나와 한자를 모두 숨길 수 없습니다.');
            setHiragana((current) => !current);
        }
        if (type === 'chinese') {
            if (!hiragana) return toast.error('히라가나와 한자를 모두 숨길 수 없습니다.');
            setChinese((current) => !current);
        }
    }
    // 단어 목록 보이기, 숨기기 핸들러
    const handleShowList = () => {
        setShowList((current) => !current);
    }
    // 단어 목록의 뜻 보이기, 숨기기
    const listContentToggle = () => {
        setListHiddenContent((current) => !current);
    }
    // 단어 목록의 단어 보이기, 숨기기
    const listWordToggle = () => {
        setListHiddenWord((current) => !current);
    }
    // 단어 목록 버튼(단어 -> 뜻, 뜻 -> 단어)
    const handleChangeToggle = () => {
        setListChangeBtn((current) => !current);
    }
    // 개별 블라인드 제거
    const handleChangeCancelBlind = (event) => {
        const target = event.target; // 클릭된 요소를 가져옴
        target.classList.remove('word-blind'); // 'word-blind' 클래스를 제거
    }
    // level 변경
    const handleLevelChange = (level) => {
        setStudyLevel(level);
        setCurrent(0);
    }
    // 선택 학습으로 이동
    const moveChoice = () => {
        navigator("/choice");
    }
    // 단어 선택 테스트로 이동
    const moveChoiceTest = async () => {
        const isConfirmed = await openConfirm("단어 선택 테스트를 진행하시겠습니까?");
        if (!isConfirmed) return;
        navigator("/choice-test");
    }

    // 단어 및 즐겨찾기 가져오기
    useEffect(() => {
        // location은 즐겨 찾기 목록에서 해당 페이지로 이동될 때 작동
        if (soloWord && Array.isArray(soloWord)) {
            setSoloStudyState(true);
            setWord(soloWord)
            return;
        }
        const arr = location.state ? location.state.arr : [];
        if (arr?.length !== 0) setWord(arr);
        else {
            axiosInstance(`study/data/${studyLevel}/20/${username}`)
                .then((res) => {
                    setWord(res.data);
                })
                .catch((e) => toast.error('데이터를 불러오는 중 에러가 발생하였습니다. 관리자에게 문의해주세요.'));
        }
    }, [studyLevel, username, soloWord]);

    // 단어 목록 높이 감지 중간이 보일 때 버튼 표시
    useEffect(() => {
        const target = document.querySelector('.study-page-word-list-content-box');
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShowButton(true);
                } else {
                    setShowButton(false);
                }
            },
            {threshold: 0.1} // 요소가 50% 보일 때 트리거
        );
        if (target) {
            observer.observe(target);
        }

        return () => {
            if (target) observer.unobserve(target);
        };
    }, []);

    // 단어 목록 끝 감지
    useEffect(() => {
        const target = document.querySelector('.study-page-word-list-content-box');

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsEndReached(true); // 끝에 도달하면 상태 변경
                } else {
                    setIsEndReached(false);
                }
            },
            {rootMargin: '0px', threshold: 1.0} // 요소가 100% 보일 때 트리거
        );

        let lastElement = target?.lastElementChild; // 최초 마지막 요소를 감지

        if (lastElement) {
            observer.observe(lastElement);
        }

        // DOM 변화를 감지하여 마지막 요소를 다시 설정
        const mutationObserver = new MutationObserver(() => {
            // 기존 마지막 요소를 언옵저브
            if (lastElement) {
                observer.unobserve(lastElement);
            }

            // 새로운 마지막 요소를 관찰
            lastElement = target?.lastElementChild;
            if (lastElement) {
                observer.observe(lastElement);
            }
        });

        if (target) {
            mutationObserver.observe(target, {childList: true}); // 자식 요소 변화 감지
        }

        return () => {
            if (lastElement) observer.unobserve(lastElement);
            if (target) mutationObserver.disconnect();
        };
    }, []);


    return (
        <div className="study-page-all">
            <div className="study-page-mid">
                <div className='study-on-box'>

                    <div className="study-on-header-box">
                        <div className="progress-bar">
                            <div
                                className="progress-bar-fill"
                                style={{width: `${(current / (word?.length - 1)) * 100}%`}}
                            ></div>
                        </div>
                        <div className='on-header-box'>
                            <div className="on-header-left-box">
                                {!soloStudyState && (
                                    word?.length > 0 && current >= 0 && word[current].wordFavorite === false ?

                                        <FaRegStar size={21} onClick={() => handleStar(current)}/>
                                        :
                                        <FaStar size={21} onClick={() => handleStar(current)}/>
                                )}

                                {word?.length > 0 && current >= 0 && word[current] && (
                                    <Audio inputData={word[current]?.wordContent}/>
                                )}                            </div>


                        </div>

                        <div className='on-word-box' onClick={handleMeaning}>
                            {word?.length > 0 && current >= 0 && word[current] && (
                                meaning ? (
                                    <div className="only-word">
                                        <p>{word[current]?.wordMeaning}</p>
                                    </div>
                                ) : (
                                    word[current]?.wordChinese === null || word[current]?.wordChinese === '' ? (
                                        <div className="only-content">
                                            <p>{word[current]?.wordContent}</p>
                                        </div>
                                    ) : (
                                        <div className="content-and-chinese">
                                            {hiragana ? (
                                                <p className="content-and-chinese-content">{word[current]?.wordContent}</p>
                                            ) : (
                                                <p className="content-and-chinese-content word-blind">{word[current]?.wordContent}</p>
                                            )}
                                            {chinese ? (
                                                <p>{word[current]?.wordChinese}</p>
                                            ) : (
                                                <p className="word-blind">{word[current]?.wordChinese}</p>
                                            )}
                                        </div>
                                    )
                                )
                            )}
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


                        <div className="study-on-play-box">
                            <div className='click-left'>
                                {play ?
                                    <IoStopCircle size={32} onClick={handlePlay} color='#4e4e4e'/>
                                    :
                                    <IoPlayCircle size={32} onClick={handlePlay} color='#4e4e4e'/>
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

                        <div className='click-mid'>
                            {word?.length > 0 && (
                                <>
                                    {current === 0 ? (
                                        <FaRegArrowAltCircleLeft size={35} color='#d2cfcf'/>
                                    ) : (
                                        <FaRegArrowAltCircleLeft size={35} onClick={handleBack} color='#4e4e4e'/>
                                    )}

                                    <p>{current + 1} / {word.length}</p>

                                    {current === word.length - 1 ? (
                                        <FaRegArrowAltCircleRight size={35} color='#d2cfcf'/>
                                    ) : (
                                        <FaRegArrowAltCircleRight size={35} onClick={handleNext} color='#4e4e4e'/>
                                    )}
                                </>
                            )}
                        </div>


                        {/* 레벨 박스, 한자, 히라가나 숨김 박스 */}
                        <div className="study-level-change-box">

                            <div className="study-level-box">
                                <div className={(studyLevel === 1 ? "word-on" : "word-off")}
                                     onClick={() => handleLevelChange(1)}>
                                    <p>초급</p>
                                </div>
                                <div className={(studyLevel === 2 ? "word-on" : "word-off")}
                                     onClick={() => handleLevelChange(2)}>
                                    <p>중급</p>
                                </div>
                                <div className={(studyLevel === 3 ? "word-on" : "word-off")}
                                     onClick={() => handleLevelChange(3)}>
                                    <p>고급</p>
                                </div>
                            </div>

                            <div className="study-change-box">
                                <div className={"hiragana-btn-box " + (hiragana ? "word-on" : "word-off")}
                                     onClick={() => handleBlackContent("hiragana")}>
                                    <p>あ</p>
                                </div>
                                <div className={"chinese-btn-box " + (chinese ? "word-on" : "word-off")}
                                     onClick={() => handleBlackContent("chinese")}>
                                    <p>文</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* 학습, 테스트, 카드게임 섹션 */}
                    <div className="study-page-test-type-box"  >
                        <div className="study-page-choice-box" onClick={moveChoice}>
                            <img src="/svg/choice1.svg" alt=""/>
                            <p>학습</p>
                        </div>
                        <div className="study-page-test-box" onClick={moveChoiceTest}>
                            <img src="/svg/test1.svg" alt="" />
                            <p>선택 테스트</p>
                        </div>
                        <div className="study-page-card-box" onClick={() => toast.error("아직 준비중입니다.")}>
                            <img src="/svg/card1.svg" alt=""/>
                            <p>카드 테스트</p>
                        </div>
                    </div>

                    {/* 단어 전체 리스트 */}
                    <div className="study-page-word-list-box">

                        <div className="study-page-word-list-title-box" onClick={handleShowList}>
                            <p>학습 단어 목록({word?.length || 0})</p>
                            {showList ? <IoIosArrowDown size={20}/> : <IoIosArrowUp size={20}/>}
                        </div>


                        <div className={`study-page-word-list-content-box ${showList ? 'show' : 'hide'}`}>

                            {word?.map((item, index) => (
                                <div className="study-page-word-list-content" key={index}>

                                    <div className="study-page-word-list-word">
                                        {listHiddenWord ?
                                            <p className="study-page-word-list-word-content">{item.wordContent} {item.wordChinese ? `/ ${item.wordChinese}` : ""}</p>
                                            :
                                            <p className="study-page-word-list-word-content word-blind"
                                               onClick={handleChangeCancelBlind}>{item.wordContent} {item.wordChinese ? `/ ${item.wordChinese}` : ""}</p>
                                        }
                                        {listHiddenContent ? <p>{item.wordMeaning}</p> :
                                            <p className="word-blind"
                                               onClick={handleChangeCancelBlind}>{item.wordMeaning}</p>}
                                    </div>

                                    <div className="study-page-word-list-btn">
                                        {!soloStudyState && word.length > 0 && current >= 0 && (
                                            word[index].wordFavorite === false ? (
                                                <FaRegStar size={21} onClick={() => handleStar(index)}/>
                                            ) : (
                                                <FaStar size={21} onClick={() => handleStar(index)}/>
                                            )
                                        )}
                                        <Audio inputData={item?.wordContent}/>
                                    </div>

                                </div>
                            ))}
                        </div>

                        {showList &&
                            <div
                                className={`change-position-box ${showButton ? 'change-position-show' : ''} ${isEndReached ? 'absolute-button' : ''}`}>
                                <div className="change-btn-box-position">
                                    {listChangeBtn ?

                                        listHiddenWord ?
                                            <div className="change-position-text"
                                                 onClick={listContentToggle}>단어 숨기기</div>
                                            :
                                            <div className="change-position-text"
                                                 onClick={listContentToggle}>단어 보기</div>
                                        :
                                        listHiddenContent ?
                                            <div className="change-position-text"
                                                 onClick={listWordToggle}>뜻 숨기기</div>
                                            :
                                            <div className="change-position-text"
                                                 onClick={listWordToggle}>뜻 보이기</div>
                                    }

                                    <div className="change-position-var"></div>
                                    <div className="change-position-btn"
                                         onClick={handleChangeToggle}><FaExchangeAlt color="#586380"/></div>
                                </div>
                            </div>
                        }

                    </div>
                    {showList &&
                        <div className="study-white-box"></div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Study;