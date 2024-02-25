import "../../styles/login/Login.css";
import Logo from "../../image/logo.png"
import { Link } from "react-router-dom";

function Login() {

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
          <Link to={"/"}><p>The Japen</p></Link>
          <h5>더재팬</h5>
          
          
        </div>
        

        <div className="login-info-box">
          <div className="login-info-all">

            <div className="login-info">
              <div className="login-input-box">
                <input type="text" placeholder="아이디"/>
                <input type="password" placeholder="비밀번호"/>
              </div>

              <div className="login-btn-box">
                <button className="login-btn">로그인</button>
              </div>

            </div>

            <div className="remember">
              <input type="checkbox" className="ch-box" id="ch-box"/>
              <label className="ch-text" for="ch-box">로그인 유지</label>
            </div>
            <hr />
            <div className="social-login">
              <Link><img src="https://i.jobkorea.kr/content/images/login/ver_1/sns_naver_large.svg" alt="" /></Link>
              <Link><img src="https://i.jobkorea.kr/content/images/login/ver_1/sns_kakao_large.svg" alt="" /></Link>
              <Link><img src="https://i.jobkorea.kr/content/images/login/ver_1/sns_facebook_large.svg" alt="" /></Link>
              <Link><img src="https://i.jobkorea.kr/content/images/login/ver_1/sns_apple_large.svg" alt="" /></Link>

            </div>

            <div className="id_pw_find">
                <Link style={{textDecoration : "none", color : "rgb(107, 107, 107)"}}><p>아이디 찾기</p></Link>
                <Link style={{textDecoration : "none", color : "rgb(107, 107, 107)"}}><p>비밀번호 찾기</p></Link>
                <Link style={{textDecoration : "none", color : "#0057ff"} } to="/join"><p>회원가입</p></Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
