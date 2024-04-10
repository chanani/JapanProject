import '../styles/Header.css';
import Logo from '../image/logo.png';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { tokenInfoContext } from '../component/TokenInfoProvider';
import { HiOutlineBell } from "react-icons/hi";
import { GoDotFill } from "react-icons/go";
import { BiCaretUp } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import axios from "axios";
import {Cookies} from 'react-cookie';
function Header(){
  const navigate = useNavigate();
  const { userRole, username } = useContext(tokenInfoContext);
  const cookie = new Cookies();

  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const alarmRef = useRef(false);
  const [alarm, setAlarm] = useState(alarmRef.current);
  const [alarmOpen, setAlarmOpen] = useState(false);
  const [noCheckList, setNoCheckList] = useState([]); // 확인하지 않은 알람 목록
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // 알람 SSE Connection
  useEffect(() => {
    let eventSource;
    if(userRole === 'role_user'){
      eventSource = new EventSource('http://localhost:8889/notifications/subscribe/1');
      eventSource.addEventListener('alarm', async (event) => {
          const res = await event.data;
          console.log(res);
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
  // 알랑 목록 조회
  const getNoticeList = () => {
    if(username !== null){
      axios({
        url : `/notice/alarmList/${username}`,
        method : 'GET'
      })
      .then((res) => {
        console.log(res.data);
        setNoCheckList(res.data);
      })
      .catch((e) => {
        alert('알람을 불러오는 중 에러가 발생하였습니다. 관리자에게 문의해주세요.');
      });
    }
  }
  // 알람 목록 클릭 
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
  // 메뉴바 상태 핸들러
  const handleToggle = () => {
    setOpen((open) => !open);
  }
  // 로그인 페이지 핸들러
  const handleLogin = () => {
    navigate("/login");
  }
  // 로그아웃 핸들러
  const handleLogout = () => {
    cookie.remove('accessToken');
    cookie.remove('username');
    alert("로그아웃 되었습니다.");
    window.location = "/";
  }
  if(window.location.pathname === '/login' || window.location.pathname === "/join") return null;

  return(
    
      <header>
          <div className={`header-box ${isVisible ? 'show' : ''}`}>

          <div className={"header-info" + (open ? " menu-open" : "")}>
            <div className='title-box'>
              <img src={Logo} alt="로고" className='logo-image'/>
              <Link to={"/"} ><p className='title'>The Japen</p></Link>
            </div>
            <div className='login-box'>
              {userRole === 'role_user' ? 
              <div className='alarm-box'>
                <HiOutlineBell size={27} className='alarm-btn' onClick={handleAlarm}/> 
                {alarm ? <GoDotFill color='red' className='alarm-bot'/> : ""}
              </div>
              : 
              ""
              }

              <button className='menu-btn' onClick={handleToggle}>+</button>

              {userRole === "none" ? 
                <button className='login-btn' onClick={handleLogin}>로그인</button>
                :
                <button className='login-btn' onClick={handleLogout}>로그아웃</button>
              }
              
            </div>
            
          </div> 
          {open ? 
            userRole === 'role_admin' ? 
            <div className='menu-box'>
            
                <div className='rank-box'>
                  <h3 className='rank-title'>관리</h3>
                    <Link onClick={handleToggle} to={"/admin/addWord"}><p>단어추가</p></Link>
                    <Link onClick={handleToggle} to={"/admin/addNotice"}><p>공지사항 전달</p></Link>
                </div>
            </div> 
            
             : 
             
             <div className='menu-box'>
                <div className='study-box'>
                    <h3 className='study-title'>단어 학습</h3>
                    <Link to={"/study/easy"} onClick={handleToggle}><p>1단계</p></Link>
                    <Link to={"/study/middle"} onClick={handleToggle}><p>2단계</p></Link>
                    <Link to={"/study/hard"} onClick={handleToggle}><p>3단계</p></Link>
                </div>
                <div className='test-box'>
                    <h3 className='test-title'>단어 테스트</h3>
                    <Link to={"/test/easy"} onClick={handleToggle}><p>1단계</p></Link>
                    <Link to={"/test/middle"} onClick={handleToggle}><p>2단계</p></Link>
                    <Link to={"/test/hard"} onClick={handleToggle}><p>3단계</p></Link>
                </div>
                <div className='rank-box'>
                  <h3 className='rank-title'>마이페이지</h3>
                    <Link onClick={handleToggle} to={"/mypage/favorites"}><p>즐겨찾기 목록</p></Link>
                    <Link onClick={handleToggle} to={"/mypage/record"}><p>학습기록</p></Link>
                    <Link onClick={handleToggle} to={"/chatAi"}><p>Ai학습</p></Link>
                    <Link onClick={handleToggle} to={"/rank"}><p>랭킹</p></Link>
                    <Link onClick={handleToggle} to={"/notice"}><p>공지사항</p></Link>
                </div>
            </div> 
            
          : ""} 

          {alarmOpen ? 
          <div>
            <BiCaretUp size={30} className='alarm-box-arrow'color='#272829'/>
            <div className='alarm-toggle-all'>
              <div className='alarm-toggle-title-box'>
                <p>알림</p>
              </div>
              {noCheckList.length !== 0 ?
              noCheckList.map((item, index) => (
                <div className='alarm-toggle-content-box' key={index} onClick={(e) => handleAlarmCheck(item.notice_num)}>
                  <CiMenuKebab className='alarm-content-menu'/>
                  <h5> 열람하지 않은 공지사항이 있습니다.</h5>
                </div>
              ))
                :
              "등록된 알람이 없습니다."
            }
            </div>
          </div>
            :
            ""
          }
        </div>
        
      </header>
  );
}


export default Header;