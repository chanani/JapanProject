import '../styles/Header.css';
import Logo from '../image/logo.png';
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
    const {userRole, username, accessToken, refreshToken} = useContext(tokenInfoContext);
    const cookie = new Cookies();

    const [isVisible, setIsVisible] = useState(false);
    const alarmRef = useRef(false);
    const [alarm, setAlarm] = useState(alarmRef.current);
    const [alarmOpen, setAlarmOpen] = useState(false);
    const [noCheckList, setNoCheckList] = useState([]); // 확인하지 않은 알람 목록
    const [openSide, setOpenSide] = useState(false); // 모바일 사이드바
    const [openCategory, setOpenCategory] = useState(Array(4).fill(false)); // 각 카테고리의 상태


    // 학습페이지 Link list
    const studyLink = [["/study/easy", "1단계"], ["/study/middle", "2단계"], ["/study/hard", "3단계"]];
    //　테스트 페이지 Link list
    const testLink = [["/test/easy", "1단계"], ["/test/middle", "2단계"], ["/test/hard", "3단계"]];
    // 마이페이지 Link list
    const myLink = [["/mypage/favorites", "즐겨찾기 목록"], ["/mypage/record", "학습기록"], ["/mypage", "나의정보"]];
    // 그 외 페이지 Link list
    const otherWise = [["/chatAi", "Ai학습"], ["/search", "통합검색"], ["/notice", "공지사항"], ["/inquiry", '문의사항'],
        ["/schoolPage", '단계별학습'], ["/translator", '번역기']]
    // admin 페이지 Link list
    const adminLink = [["/admin/addWord", "단어추가"], ["/admin/addNotice", "공지사항 전달"], ["/mypage", "나의정보"],
        ["/addInquiryComment", '문의사항'], ["/admin/addWeekWord", '단계별단어 추가']];

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

    useEffect(() => {
        setIsVisible(true);
    }, []);
    // 알람 SSE Connection
    useEffect(() => {
        let eventSource;
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
        }
    }, [userRole]);
    // 확인하지 않은 알람
    useEffect(() => {
        getNoticeList()
    }, [alarm, username]);

    if (window.location.pathname === '/login' || window.location.pathname === "/join") return null;

    return (

        <header>
            <div className="mobile-left-box">
                <FiMenu size="20" onClick={mobileSidebarToggle}/>
            </div>
            <div className="left-menu">

                <div className="site-name-box">
                    <h2>The Japan</h2>
                    <img className="header-logo" src={Logo} alt="Logo"/>
                </div>
                <div className="header-category-box">
                    <div>
                        <p>학습<MdOutlineKeyboardArrowDown/></p>
                        <div className="header-category-detail">
                            <p>단어학습 1단계</p>
                            <p>단어학습 2단계</p>
                            <p>단어학습 3단계</p>
                        </div>
                    </div>
                    <div>
                        <p>테스트<MdOutlineKeyboardArrowDown/></p>
                        <div className="header-category-detail">
                            <p>단어학습 1단계</p>
                            <p>단어학습 2단계</p>
                            <p>단어학습 3단계</p>
                        </div>
                    </div>
                    <div>
                        <p>기타페이지<MdOutlineKeyboardArrowDown/></p>
                        <div className="header-category-detail">
                            <p>단어학습 1단계</p>
                            <p>단어학습 2단계</p>
                            <p>단어학습 3단계</p>
                        </div>
                    </div>
                    <div>
                        <p>고객지원<MdOutlineKeyboardArrowDown/></p>
                        <div className="header-category-detail">
                            <p>단어학습 1단계</p>
                            <p>단어학습 2단계</p>
                            <p>단어학습 3단계</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="right-menu">
                <div className="login-box">
                    <button className="login-btn">로그인</button>
                    <button className="join-btn">회원가입</button>
                </div>
            </div>
            <div className="mobile-right-box">
                <button>My</button>
            </div>

            {/* 모바일 사이즈 사이드 바 */}
            <div className={"mobile-side-bar " + (openSide ? "show" : "")} >
                <div className="mobile-size-bar-category">
                    {['학습', '테스트', '기타페이지', '고객지원'].map((title, index) => (
                        <div key={index}>
                            <div className="mobile-size-title-box" onClick={() => handleCategoryToggle(index)}>
                                <p>{title}</p>
                                <MdOutlineKeyboardArrowDown/>
                            </div>
                            <div className={"mobile-category-detail " + (openCategory[index] ? " category-show" : "")}>
                                <p>단어학습 1단계</p>
                                <p>단어학습 2단계</p>
                                <p>단어학습 3단계</p>
                            </div>
                        </div>
                    ))}
                    <hr style={{borderColor : "#fffcfc82", margin : "24px 0"}}/>

                    <div className="mobile-login-box">
                        <button className="mobile-login-btn">로그인</button>
                        <button className="mobile-join-btn">회원가입</button>
                    </div>
                </div>
                <div className="mobile-size-close-box">
                    <IoMdClose size={30} fill="white" onClick={() => setOpenSide(false)}/>
                </div>
            </div>
        </header>
    );
}


export default Header;