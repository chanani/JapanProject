import '../styles/Header.css';
import Logo from '../image/logo.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
              <p className='title'>The Japen</p>
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
                    <p>초급 단계</p>
                    <p>중급 단계</p>
                    <p>고급 단계</p>
                </div>
                <div className='test-box'>
                    <h3 className='test-title'>단어 테스트</h3>
                    <p>초급 단계</p>
                    <p>중급 단계</p>
                    <p>고급 단계</p>
                </div>
                <div className='rank-box'>
                  <h3 className='rank-title'>기록, 랭킹</h3>
                  <p>학습기록</p>
                  <p>랭킹</p>
                </div>
            </div> 
          : ""} 
        </div>
        
      </header>
  );
}


export default Header;