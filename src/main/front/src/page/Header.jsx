import '../styles/Header.css';
import Logo from '../image/default_icon11.svg';
import {useContext, useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {tokenInfoContext} from '../component/TokenInfoProvider';
import {MdOutlineKeyboardArrowDown} from "react-icons/md";
import {FiMenu} from "react-icons/fi";
import {IoMdClose} from "react-icons/io";


import {Cookies} from 'react-cookie';
import {axiosInstance} from '../api';
import {toast} from "react-toastify";

function Header() {
    const navigate = useNavigate();
    const {userRole, username} = useContext(tokenInfoContext);
    const cookie = new Cookies();

    const alarmRef = useRef(false);
    const [alarm, setAlarm] = useState(alarmRef.current);
    const [alarmOpen, setAlarmOpen] = useState(false);
    const [noCheckList, setNoCheckList] = useState([]); // 확인하지 않은 알람 목록
    const [openSide, setOpenSide] = useState(false); // 모바일 사이드바
    const [openCategory, setOpenCategory] = useState(Array(5).fill(false)); // 각 카테고리의 상태
    const [userIcon, setUserIcon] = useState("");


    // 학습페이지 Link list
    const studyLink = [["/study", "단어 학습"], ["/choice", "단어 선택 학습"], ["/set-study", '모두의 단어장'], ["/schoolPage", '단계별 학습']];
    //　테스트 페이지 Link list
    const testLink = [["/choice-test", "단어 선택 테스트"], ["/short-test", "단어 단답형 테스트"]];
    // 마이페이지 Link list
    const myLink = [["/mypage", "나의 정보"], ["/mypage/favorites", "즐겨찾기 목록"], ["/mypage/record", "학습 기록"],];
    // 그 외 페이지 Link list
    const otherLink = [["/chatAi", "Ai 학습"], ["/search", "단어검색"], ["/translator", '번역기']];
    // 고객지원 list
    const customerLink = [["/notice", "공지사항"], ["/inquiry", '문의사항']];
    // admin 페이지 Link list
    const adminLink = [["/admin/addWord", "단어 등록"], ["/admin/addNotice", "공지사항 전달"], ["/addInquiryComment", '문의사항 답글']];

    // 알랑 목록 조회 API
    const getNoticeList = () => {
        if (userRole === "role_user") {
            axiosInstance.get(`notice/alarmList/${username}`)
                .then((res) => {
                    setNoCheckList(res.data);
                })
                .catch((e) => toast.error('알람을 불러오는 중 에러가 발생하였습니다. 관리자에게 문의해주세요.'));
        }
    }
    // 알람 목록 클릭 핸들러
    const handleAlarmCheck = (notice_num) => {
        setNoCheckList([]);
        navigate("/notice");
        setAlarmOpen(false);
    }
    // 알람 버튼 핸들러
    const handleAlarm = () => {
        setAlarm(false);
        alarmRef.current = false;
        setAlarmOpen((current) => !current);
    }
    //　모바일 사이드바 on/off
    const mobileSidebarToggle = () => {
        setOpenSide(current => !current);
    }
    // 모바일 카테고리 on/off
    const handleCategoryToggle = (index) => {
        setOpenCategory((prev) => {
            const updated = [...prev];
            updated[index] = !updated[index]; // 해당 카테고리의 상태를 반전시킴
            return updated;
        });
    };

    // 로그인 페이지 핸들러
    const handleLogin = () => {
        navigate("/login");
    }

    // 로그아웃 핸들러
    const handleLogout = () => {
        axiosInstance.post('logout', {username: username})
            .then((res) => {
                if (res.status === 200) {
                    cookie.remove('accessToken');
                    cookie.remove('username');
                    toast.success("로그아웃 되었습니다.");
                    window.location = "/";
                }
            })
            .catch((e) => toast.error("로그아웃 중 오류가 발생하였습니다."))

    }
    // 이미지 불러오는 핸들러
    const userIconHandler = () => {
        axiosInstance.post('/user-icon', {username: username})
            .then((res) => {
                setUserIcon(res.data.data);
            })
            .catch((e) => toast.error("이미지 불러오는 중 오류가 발생하였습니다."));
    }
    // 회원가입 페이지 핸들러
    const handleJoin = () => {
        navigate("/join");
    }
    // 홈으로 이동 핸들러
    const handleHome = () => {
        navigate("/");
    }

    // userIcon 태그
    const userIconDiv = () => {
        if (process.env.REACT_APP_URL_JAVA === 'http://localhost:8889/') {
            return <img
                className="header-user-icon"
                src={userIcon ? `https://lg.thejapan.today/icon-image/${userIcon}` : "/default_icon.svg"}
                alt="이미지"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default_icon.svg";
                }}
            />
        } else {
            return <img
                className="header-user-icon"
                src={userIcon ? `https://lg.thejapan.today/icon-image/${userIcon}` : "/default_icon.svg"}
                alt="이미지"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default_icon.svg";
                }}
            />
        }
    }


    // 알람 SSE Connection
    useEffect(() => {
        /*let eventSource;
        if (userRole === 'role_user') {
            eventSource = new EventSource('http://localhost:8889/notifications/subscribe/1');
            eventSource.addEventListener('alarm', async (event) => {
                const res = await event.data;
                if (!res.includes("EventStream Created.")) {
                    setAlarm(true); // 아이콘 상태 변경
                    alarmRef.current = true; // 랜더링되도 상태 값 유지를 위해
                }
            });

            eventSource.onerror = (event) => {
                eventSource.close();
            };
        }
        return () => {
            eventSource.close();
        } */
    }, [userRole]);
    // 확인하지 않은 알람
    useEffect(() => {
        getNoticeList()
    }, [alarm, username]);

    // 유저 이미지 불러오기
    useEffect(() => {
        if (userRole !== 'none') userIconHandler();
    }, [userRole])

    // if (window.location.pathname === '/login' || window.location.pathname === "/join") return null;

    return (

        <header>
            <div className="mobile-left-box">
                <FiMenu size="20" onClick={mobileSidebarToggle}/>
            </div>
            <div className="left-menu">

                <div className="site-name-box" onClick={handleHome}>
                    <img className="header-logo" src={Logo} alt="Logo"/>
                </div>
                <div className="header-category-box">
                    {['학습', '테스트', '기타페이지', '고객지원', ...(userRole === 'role_admin' ? ['관리자 페이지'] : [])].map((title, index) => {
                        let links;
                        switch (index) {
                            case 0:
                                links = studyLink;
                                break;
                            case 1:
                                links = testLink;
                                break;
                            case 2:
                                links = otherLink;
                                break;
                            case 3:
                                links = customerLink;
                                break;
                            case 4:
                                if (userRole === 'role_admin') {
                                    links = adminLink;
                                }
                                break;
                            default:
                                links = [];
                        }
                        return (
                            <div key={index}>
                                <p>{title}<MdOutlineKeyboardArrowDown/></p>
                                <div className="header-category-detail">
                                    {links.map((item, i) => (
                                        <Link key={i} to={item[0]}>{item[1]}</Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="right-menu">
                {userRole === 'none' ?
                    <div className="login-box">
                        <button className="login-btn" onClick={handleLogin}>로그인</button>
                        <button className="join-btn" onClick={handleJoin}>회원가입</button>
                    </div>
                    :
                    <div className="header-category-box">
                        <div className="header-category-box no-margin">
                            <div className="header-user-icon-box">
                                {userIconDiv()}
                                <div className="header-category-detail mypage-detail">
                                    {myLink.map((item, i) => (
                                        <Link key={i} to={item[0]}>{item[1]}</Link>
                                    ))}
                                    <Link onClick={handleLogout}>로그아웃</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
            {userRole === 'none' ?
                <div className="mobile-right-box">
                    <button onClick={handleLogin}>My</button>
                </div>
                :
                <div className="header-category-box show-box">
                    <div className="header-category-box show-box">
                        <div className="header-user-icon-box">
                            {userIconDiv()}
                            <div className="header-category-detail mypage-detail mobile-detail">
                                {myLink.map((item, i) => (
                                    <Link key={i} to={item[0]}>{item[1]}</Link>
                                ))}
                                <Link onClick={handleLogout}>로그아웃</Link>
                            </div>
                        </div>
                    </div>
                </div>
            }


            {/* 모바일 사이즈 사이드 바 */}
            <div className={"mobile-side-bar " + (openSide ? "show" : "")}>
                <div className="mobile-size-bar-category">
                    {['학습', '테스트', '기타페이지', '고객지원', ...(userRole === 'role_admin' ? ['관리자 페이지'] : [])].map((title, index) => {
                        let links;
                        switch (index) {
                            case 0:
                                links = studyLink;
                                break;
                            case 1:
                                links = testLink;
                                break;
                            case 2:
                                links = otherLink;
                                break;
                            case 3:
                                links = customerLink;
                                break;
                            case 4:
                                if (userRole === 'role_admin') {
                                    links = adminLink;
                                }
                                break;
                            default:
                                links = [];
                        }
                        return (
                            <div key={index}>
                                <div className="mobile-size-title-box" onClick={() => handleCategoryToggle(index)}>
                                    <p>{title}</p>
                                    <MdOutlineKeyboardArrowDown/>
                                </div>
                                <div
                                    className={"mobile-category-detail " + (openCategory[index] ? " category-show" : "")}>
                                    {links.map((item, i) => (
                                        <Link key={i} to={item[0]} onClick={() => setOpenSide(false)}>{item[1]}</Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                    <hr style={{borderColor: "#fffcfc82", margin: "24px 0"}}/>

                    {userRole === 'none' ?
                        <div className="mobile-login-box">
                            <button className="mobile-login-btn" onClick={() => {
                                handleLogin();
                                setOpenSide(false);
                            }}>로그인
                            </button>
                            <button className="mobile-join-btn" onClick={() => {
                                handleJoin();
                                setOpenSide(false);
                            }}>회원가입
                            </button>
                        </div> :
                        <div>
                            <div className="mobile-size-title-box" onClick={() => handleCategoryToggle(5)}>
                                <p>마이페이지</p>
                                <MdOutlineKeyboardArrowDown/>
                            </div>
                            <div
                                className={"mobile-category-detail " + (openCategory[5] ? " category-show" : "")}>
                                {myLink.map((item, i) => (
                                    <Link key={i} to={item[0]}>{item[1]}</Link>
                                ))}
                            </div>
                            <div className="mobile-login-box" style={{marginTop: "15px"}}>
                                <button className="mobile-join-btn" onClick={() => {
                                    handleLogout();
                                    setOpenSide(false);
                                }}>로그아웃
                                </button>
                            </div>
                        </div>


                    }

                </div>
                <div className="mobile-size-close-box" onClick={() => setOpenSide(false)}>
                    <IoMdClose size={30} fill="white" onClick={() => setOpenSide(false)}/>
                </div>

            </div>

        </header>
    );
}


export default Header;