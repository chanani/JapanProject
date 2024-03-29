import '../../styles/login/Join.css'
import Logo from "../../image/logo.png"
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

function Join() {
  const [form, setForm] = useState(["", "", "", "", ""]);
  
  let navigate = useNavigate();

  const handleHome = () => {
    window.location.href = "/"
  }

  const handleInfo = (event) => {
    let eventName = event.target.className;
    let e_value = event.target.value;
    let arr = form.slice();  
    if(eventName === "user_name"){
      arr[0] = e_value;
    } else if(eventName === "username"){
      arr[1] = e_value;
    } else if(eventName === "password"){
      arr[2] = e_value;
    } else if(eventName === "user_email"){
      arr[3] = e_value;
    } else if(eventName === "user_phone"){
      arr[4] = e_value;
    }
    setForm(arr);
  }


  const handleJoin = (event) => {
    event.preventDefault();
    axios({
      url : "/join",
      method : "POST",
      data : {
        user_name : form[0],
        username : form[1],
        password : form[2],
        user_email : form[3],
        user_phone : form[4]
      }
    })
    .then((res) => {
      if(res.data === '성공'){
        alert('회원가입을 축하드립니다 *_*');
        navigate("/login");
      } else{
        alert('회원가입에 실패하였습니다.');
      }
    })
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
              <input type="text" placeholder="이름(실명)" className='user_name'
              onChange={handleInfo}
              value={form[0]}
              />
              <input type="text" placeholder="아이디" className='username'
              onChange={handleInfo}
              value={form[1]}
              />
              <input type="password" placeholder="비밀번호" className='password'
              onChange={handleInfo}
              value={form[2]}
              />
              <input type="email" placeholder="이메일" className='user_email'
              onChange={handleInfo}
              value={form[3]}
              />
              <input type="text" placeholder="휴대폰번호" className='user_phone'
              onChange={handleInfo}
              value={form[4]}
              />
            </div>

            
          </div>

          <div className='join-btn-box'>
            <button className='join-bnt' onClick={handleJoin}>가입하기</button>
          </div>
         
         

          
        </div>

      </div>
    </div>
  </div>
  );
}

export default Join;
