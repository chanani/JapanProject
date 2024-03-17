import '../styles/Header.css';
import Logo from '../image/logo.png';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { tokenInfoContext } from '../component/TokenInfoProvider';

function Header(){
  const navigate = useNavigate();
  const { userRole } = useContext(tokenInfoContext);

  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleToggle = () => {
    setOpen((open) => !open);
  }

  const handleLogin = () => {
    navigate("/login");
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
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
                  <h3 className='rank-title'>기록, 랭킹</h3>
                    <Link onClick={handleToggle} to={"/mypage/favorites"}><p>즐겨찾기 목록</p></Link>
                    <Link onClick={handleToggle} to={"/mypage/record"}><p>학습기록</p></Link>
                    <Link onClick={handleToggle} to={"/chatAi"}><p>Ai학습</p></Link>
                    <Link onClick={handleToggle} to={"/rank"}><p>랭킹</p></Link>
                </div>
            </div> 
            
          : ""} 
        </div>
        
      </header>
  );
}


export default Header;