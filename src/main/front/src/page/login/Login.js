import "../../styles/login/Login.css";
import Logo from "../../image/logo_image.png"
import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {Cookies} from 'react-cookie';
import FindInfo from "../../component/FindInfo";
import {toast} from "react-toastify";
import {FaRegEyeSlash} from "react-icons/fa";
import {MdOutlineRemoveRedEye} from "react-icons/md";
import {setTokenCookies} from "../../util/cookies";

function Login() {
    const navigator = useNavigate();
    const {userRole} = useContext(tokenInfoContext);
    const cookies = new Cookies();
    const [find_check, setFind_check] = useState("");
    const [info, setInfo] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    // 로그인 되어있을 때 홈으로 리턴
    useEffect(() => {
        if (userRole !== "none") {
            toast.error("이미 로그인 하셨습니다.");
            navigator("/");
        }
    })
    const savedCheck = localStorage.getItem("check");
    const savedUsername = localStorage.getItem("remember") || '';
    const [check, setCheck] = useState(savedCheck === "true");
    const [username, setUsername] = useState(savedCheck === "true" ? savedUsername : '');
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // 홈버튼 핸들러
    const handleHome = () => {
        navigator("/");
    }
    // 아이디 입력 핸들러
    const handleUsername = (event) => {
        let u_value = event.target.value;
        setUsername(u_value);
        rememberMe(check, u_value);
    }
    // 페스워드 입력 핸들러
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    // 로그인 이벤트
    const loginKeyDown = (event) => {
        if (event.key !== 'Enter') return
        handleLogin(event);
    }
    // 회원가입 페이지로 이동
    const handleJoin = () => {
        navigate("/join");
    }
    // 비밀번호 보이기/숨기기 핸들러
    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    }

    // 로그인 핸들러
    const handleLogin = async (event) => {


        axios({
            url: process.env.REACT_APP_URL_JAVA + 'login',
            method: 'POST',
            data: {
                username : username,
                password : password
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    setTokenCookies({
                        refreshToken: res.data.data.refreshToken,
                        accessToken : res.data.data.accessToken,
                        username : res.data.data.username
                    })
                    //setCookies(res.data.data.accessToken, res.data.data.refreshToken, res.data.data.username);
                    toast.success("반갑습니다 *_*");
                    //navigate("/");
                    window.location = "/";
                }
            })
            .catch((error) => {
                console.log("로그인 실패:", error);
                toast.error("아이디와 비밀번호를 확인해주세요.");
            });
    }
    // 쿠키 저장 핸들러
    const setCookies = (accessToken, refreshToken, username) => {
        cookies.set('accessToken', accessToken, {
            path: '/',
            secure: true,
            httpOnly: false,
            maxAge: 7200 // 2시간
        });
        cookies.set('username', username, {
            path: '/',
            secure: true,
            httpOnly: false,
            maxAge: 7200 // 2시간
        });
        cookies.set('refreshToken', refreshToken, {
            path: '/',
            secure: true,
            httpOnly: false,
            maxAge: 1209600 // 2주
        });
    }
    // 아이디 유지 핸들러
    const handleCheck = (event) => {
        const isChecked = event.target.checked;
        setCheck(isChecked);
        rememberMe(isChecked, username);
    }
    // 아이디 유지 local storage에 저장
    const rememberMe = (isChecked, username) => {
        if (isChecked && username) localStorage.setItem("remember", username);
        else localStorage.removeItem("username");
        localStorage.setItem("check", isChecked);
    }
    // 비밀번호 찾기 핸들러
    const findHandle = (event) => {
        setInfo(event.target.className);
        setFind_check((current) => setFind_check(!current));
    }

    return (
        <div className="login-all">


            <div className="loginPage-box">
                <div className="logo-box">
                    <img src={Logo} alt="The Japan"/>
                    <div className="logo-title-box">
                        <p>로그인하고 나만의 학습을</p>
                        <p>시작해 보세요</p>
                    </div>
                </div>

                <div className="login-info-box">
                    <div className="login-info-all">

                        <div className="login-info">
                            <div className="login-input-box">
                                <p>아이디</p>
                                <input type="text" placeholder="아이디"
                                       onChange={handleUsername}
                                       value={username}
                                />
                                <p>비밀번호</p>
                                <input type={showPassword ? "text" : "password"}
                                       className="login-password_input"
                                       placeholder="••••••••"
                                       onChange={handlePassword}
                                       value={password}
                                       onKeyDown={loginKeyDown}
                                />
                                {!showPassword ?
                                    <FaRegEyeSlash
                                        size={20}
                                        className="login-password-not-show-icon"
                                        onClick={handleShowPassword}
                                    />
                                    :
                                    <MdOutlineRemoveRedEye
                                        size={20}
                                        className="login-password-show-icon"
                                        onClick={handleShowPassword}
                                    />
                                }
                            </div>
                        </div>


                        <div className="login-middle-box">
                            <div className="remember">
                                <input type="checkbox" className="ch-box" id="ch-box"
                                       onChange={handleCheck}
                                       checked={check}
                                />
                                <label className="ch-text" htmlFor="ch-box"
                                >아이디 저장</label>
                            </div>

                            <div className="id_pw_find">
                                <div style={{textDecoration: "none", color: "rgb(107, 107, 107)"}} onClick={findHandle}>
                                    <p className="ID">아이디 찾기·</p></div>
                                <div style={{textDecoration: "none", color: "rgb(107, 107, 107)"}} onClick={findHandle}>
                                    <p className="PW">비밀번호 찾기</p></div>
                            </div>
                        </div>

                        <div className="login-btn-box">
                            <button className="login-btn"
                                    onClick={handleLogin}>로그인
                            </button>
                        </div>

                        <hr className="login-hr"/>

                        <div className="social-login">
                            <Link><img src="https://i.jobkorea.kr/content/images/login/ver_1/sns_naver_large.svg"
                                       alt=""/></Link>
                            <Link><img src="https://i.jobkorea.kr/content/images/login/ver_1/sns_kakao_large.svg"
                                       alt=""/></Link>
                            <Link><img src="https://i.jobkorea.kr/content/images/login/ver_1/sns_facebook_large.svg"
                                       alt=""/></Link>
                            <Link><img src="https://i.jobkorea.kr/content/images/login/ver_1/sns_apple_large.svg"
                                       alt=""/></Link>

                        </div>

                        <div className="login-join-box">
                            <p>아직 회원이 아니신가요?</p>
                            <p onClick={handleJoin} className="login-join-btn">회원가입</p>
                        </div>
                    </div>
                    <FindInfo info={info} find_check={find_check} setFind_check={setFind_check}/>
                </div>
            </div>
        </div>
    );
}

export default Login;
