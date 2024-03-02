import "../../styles/login/Login.css";
import Logo from "../../image/logo.png"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const savedCheck = localStorage.getItem("check");
  const savedUsername = localStorage.getItem("username") || '';
  const [check, setCheck] = useState(savedCheck === "true");
  const [username, setUsername] = useState(savedCheck === "true" ? savedUsername : '');
  const [password, setPassword] = useState("");
  const navigator = useNavigate();
  // 홈버튼 핸들러
  const handleHome = () => {
    window.location.href = "/"
  }
  // 아이디 입력 핸들러
  const handleUsername = (event) => {
    let u_value = event.target.value;
    setUsername(u_value);
  }
  // 페스워드 입력 핸들러
  const handlePassword = (event) => {
    let u_value = event.target.value;
    setPassword(u_value);
  }
  // 로그인 핸들러
  const handleLogin = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    axios({
      url: "/login",
      method : "post",
      data : formData,
    })
    .then((res) => {
      if(res.status === 200){
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", username);
        window.location = "/";
      }
    })
    .catch((error) => {
      console.error("로그인 실패:", error);
      alert("아이디와 비밀번호를 확인해주세요.");
    });
  } 
  // 아이디 유지 핸들러
  const handleCheck = (event) => {
    const isChecked = event.target.checked;
    setCheck(isChecked);
    rememberMe(isChecked);  
  }
  // 아이디 유지 local storage에 저장
  const rememberMe = (isChecked) => {
    if (isChecked) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }
    localStorage.setItem("check", isChecked);
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
                <input type="text" placeholder="아이디" 
                onChange={handleUsername}
                value={username}
                />
                <input type="password" placeholder="비밀번호"
                onChange={handlePassword}
                value={password}
                />
              </div>

              <div className="login-btn-box">
                <button className="login-btn"
                onClick={handleLogin}>로그인</button>
              </div>

            </div>

            <div className="remember">
              <input type="checkbox" className="ch-box" id="ch-box" 
              onChange={handleCheck} 
              checked={check} 
              />
              <label className="ch-text" htmlFor="ch-box"
              >아이디 저장</label>
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
