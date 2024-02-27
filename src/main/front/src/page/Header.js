import '../styles/Header.css';
import Logo from '../image/logo.png';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header(){
  const navigate = useNavigate();
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
              <button className='login-btn' onClick={handleLogin}>로그인</button>
            </div>
            
          </div> 
          {open ? 
            <div className='menu-box'>
                <div className='study-box'>
                    <h3 className='study-title'>단어 학습</h3>
                    <Link to={"/study/easy"} onClick={handleToggle}><p>초급 단계</p></Link>
                    <Link to={"/study/middle"} onClick={handleToggle}><p>중급 단계</p></Link>
                    <Link to={"/study/hard"} onClick={handleToggle}><p>고급 단계</p></Link>
                </div>
                <div className='test-box'>
                    <h3 className='test-title'>단어 테스트</h3>
                    <Link to={"/test/easy"} onClick={handleToggle}><p>초급 단계</p></Link>
                    <Link to={"/test/middle"} onClick={handleToggle}><p>중급 단계</p></Link>
                    <Link to={"/test/hard"} onClick={handleToggle}><p>고급 단계</p></Link>
                </div>
                <div className='rank-box'>
                  <h3 className='rank-title'>기록, 랭킹</h3>
                    <Link onClick={handleToggle}><p>즐겨찾기 목록</p></Link>
                    <Link onClick={handleToggle}><p>학습기록</p></Link>
                    <Link onClick={handleToggle}><p>랭킹</p></Link>
                </div>
            </div> 
          : ""} 
        </div>
        
      </header>
  );
}


export default Header;