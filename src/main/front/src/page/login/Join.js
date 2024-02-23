import '../../styles/login/Join.css'
import Logo from "../../image/logo.png"
import { Link } from "react-router-dom";

function Join() {
  const handleHome = () => {
    window.location.href = "/"
  }
  return (
    <div className="login-all">
    <div className="login-header">
      <p>문의하기</p>
      <p onClick={handleHome}>더재팬홈</p>
    </div>

    <div className="loginPage-box">
      <div className="logo-box">
        <img src={Logo} alt="" />
        <p>The Japen</p>
        <h5>더재팬</h5>
      </div>

      <div className="social-join">
        <div className='social-title'>
          <p>간편하게 가입하세요</p>
        </div>
        <div className='social-logo'>
          <Link><img src="https://i.jobkorea.kr/content/images/login/ver_1/sns_naver_large.svg" alt="" /></Link>
          <Link><img src="https://i.jobkorea.kr/content/images/login/ver_1/sns_kakao_large.svg" alt="" /></Link>
          <Link><img src="https://i.jobkorea.kr/content/images/login/ver_1/sns_facebook_large.svg" alt="" /></Link>
           <Link><img src="https://i.jobkorea.kr/content/images/login/ver_1/sns_apple_large.svg" alt="" /></Link>
        </div>
      </div>

      <div className="login-info-box">
        <div className="login-info-all">

          <div className="login-info">
            <div className="login-input-box">
              <input type="text" placeholder="이름(실명)" className='name'/>
              <input type="text" placeholder="아이디" className='username'/>
              <input type="password" placeholder="비밀번호" className='password'/>
              <input type="email" placeholder="이메일" className='email'/>
              <input type="password" placeholder="휴대폰번호" className='phone'/>
            </div>

            
          </div>

          <div className='join-btn-box'>
            <button className='join-bnt'>가입하기</button>
          </div>
         
         

          
        </div>

      </div>
    </div>
  </div>
  );
}

export default Join;
