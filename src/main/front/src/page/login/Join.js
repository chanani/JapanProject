import '../../styles/login/Join.css'
import Logo from "../../image/logo_image.png"
import {Link, useNavigate} from "react-router-dom";
import {useState} from 'react';
import axios from 'axios';
import {toast} from "react-toastify";
import {axiosInstance} from "../../api";
import {Overlap} from "../../hook/Overlap";
import {FaRegEyeSlash} from "react-icons/fa";
import {MdOutlineRemoveRedEye} from "react-icons/md";


function Join() {
    const [form, setForm] = useState(["", "", "", "", "", ""]);
    const [idCheck, setIdCheck] = useState(false);
    const [emailCheck, setEmailCheck] = useState(false);
    const [phoneCheck, setPhoneCheck] = useState(false);
    const [showPassword, setShowPassword] = useState([false, false])
    let navigate = useNavigate();

    // 홈 핸들러
    const handleHome = () => {
        navigate("/");
    }
    // 중복확인 핸들러
    const checkHandle = (event) => {
        let eventName = event.target.className;
        if (eventName === 'check_id') {
            if (!form[1]) return toast.error('아이디를 입력해주세요.');
            if (!Overlap("username", form[1])) return;
            checkIdAPI();
        } else if (eventName === 'check_email') {
            if (!form[3]) return toast.error('이메일을 입력해주세요.');
            if (!Overlap("email", form[3])) return;
            checkEmailAPI();
        } else if (eventName === 'check_phone') {
            if (!form[4]) return toast.error('휴대폰번호를 입력해주세요.');
            if (!Overlap("phone", form[4])) return;
            checkPhoneAPI();
        }

    }
    // id 중복확인 API
    const checkIdAPI = () => {
        axiosInstance.get(`/check/id/${form[1]}`)
            .then((res) => {
                if (!res.data) {
                    toast.success('사용 가능한 아이디입니다.')
                    setIdCheck(true);
                } else {
                    toast.error('이미 사용 중인 아이디입니다.');
                }
            })
            .catch(e => toast.error('중복 확인 중 오류가 발생하였습니다. 관리자에게 문의해주세요.'));
    }
    // email 중복확인 API
    const checkEmailAPI = () => {
        axiosInstance.get(`/check/email/${form[3]}`)
            .then((res) => {
                if (!res.data) {
                    toast.success('사용 가능한 이메일입니다.')
                    setEmailCheck(true);
                } else {
                    toast.error('이미 사용 중인 이메일입니다.');
                }
            })
            .catch(e => toast.error('중복 확인 중 오류가 발생하였습니다. 관리자에게 문의해주세요.'));
    }
    // phone 중복확인 API
    const checkPhoneAPI = () => {
        axiosInstance.get(`/check/phone/${form[4]}`)
            .then((res) => {
                if (!res.data) {
                    toast.success('사용 가능한 휴대폰번호입니다.')
                    setPhoneCheck(true);
                } else {
                    toast.error('이미 사용 중인 휴대폰번호입니다.');
                }
            })
            .catch(e => toast.error('중복 확인 중 오류가 발생하였습니다. 관리자에게 문의해주세요.'));
    }
    // input 입력 시 state 변경
    const handleInfo = (event) => {
        let eventName = event.target.className;
        let e_value = event.target.value;
        let arr = form.slice();
        if (eventName === "user_name") {
            arr[0] = e_value;
        } else if (eventName === "username") {
            arr[1] = e_value;
            setIdCheck(false);
        } else if (eventName === "password") {
            arr[2] = e_value;
        } else if (eventName === "user_email") {
            arr[3] = e_value;
            setEmailCheck(false);
        } else if (eventName === "user_phone") {
            arr[4] = e_value;
            setPhoneCheck(false);
        } else if (eventName === "password_check") {
            arr[5] = e_value;
        }
        setForm(arr);
    }

    const handleShowPassword = (index) => {
        setShowPassword((prev) => {
            const newShowPassword = [...prev];
            newShowPassword[index] = !newShowPassword[index];
            return newShowPassword;
        });
    };

    // 회원가입 핸들러
    const handleJoin = (event) => {
        if (!!!idCheck || !!!emailCheck) return toast.error('중복확인 후 가입 가능합니다.');
        if (form[0].trim() === "" || form[1].trim() === "" || form[2].trim() === "" || form[3].trim() === "" || form[4].trim() === "" || form[5].trim() === "") {
            return toast.error('모든 항목를 입력하세요.');
        }
        if (!Overlap("username", form[1])) return;
        if (!Overlap("password", form[2])) return;
        // 비밀번호 일치 여부 확인
        if (form[2] !== form[5]) return toast.error('비밀번호가 일치하지 않습니다.');
        if (!Overlap("email", form[3])) return;
        if (!Overlap("phone", form[4])) return;

        axios({
            url: process.env.REACT_APP_URL_JAVA + "join",
            method: "POST",
            data: {
                user_name: form[0],
                username: form[1],
                password: form[2],
                user_email: form[3],
                user_phone: form[4]
            }
        })
            .then((res) => {
                if (res.status !== 200) toast.error('회원가입에 실패하였습니다.');
                else if (res.data.code === 200) {
                    toast.success('회원가입을 축하드립니다 *_*');
                    navigate("/login");
                }
            })
    }


    return (
        <div className="login-all">
            {/* <div className="login-header">
                <p>문의하기</p>
                <p onClick={handleHome}>더재팬홈</p>
            </div>*/}

            <div className="loginPage-box">
                <div className="logo-box">
                    <img src={Logo} alt=""/>
                </div>

                <div className="social-join">
                    <div className='social-title'>
                        <p>간편하게 가입하세요</p>
                    </div>
                    <div className='social-logo'>
                        <Link><img src="https://i.jobkorea.kr/content/images/login/ver_1/sns_naver_large.svg"
                                   alt=""/></Link>
                        <Link><img src="https://i.jobkorea.kr/content/images/login/ver_1/sns_kakao_large.svg"
                                   alt=""/></Link>
                        <Link><img src="https://i.jobkorea.kr/content/images/login/ver_1/sns_facebook_large.svg"
                                   alt=""/></Link>
                        <Link><img src="https://i.jobkorea.kr/content/images/login/ver_1/sns_apple_large.svg"
                                   alt=""/></Link>
                    </div>
                </div>

                <hr className="join-hr"/>


                <div className="join-info-box">

                    <div className="join-info">
                        <div className="join-input-box">

                            <div className="join-name-box">
                                <p>이름</p>
                                <input type="text" placeholder="이름(실명)을 입력해 주세요" className='user_name'
                                       onChange={handleInfo}
                                       value={form[0]}
                                />
                            </div>

                            <div className="join-id-box">
                                <p>아이디</p>
                                <div>
                                    <input type="text" placeholder="영문, 숫자 6자 이상" className='username'
                                           onChange={handleInfo}
                                           value={form[1]}
                                    />
                                    <button onClick={checkHandle}
                                            className={`check_id`}
                                            id={idCheck ? 'check_true' : ''}
                                    >중복확인
                                    </button>
                                </div>
                            </div>

                            <div className="join-password-box">
                                <p>비밀번호</p>
                                <input type={showPassword[0] ? "text" : "password"}
                                       placeholder="영문, 숫자, 특수문자 8자 이상"
                                       className='password'
                                       onChange={handleInfo}
                                       value={form[2]}
                                       style={{marginBottom: '10px'}}
                                />

                                <input type={showPassword[1] ? "text" : "password"}
                                       placeholder="비밀번호를 한번 더 입력해주세요"
                                       className='password_check'
                                       onChange={handleInfo}
                                       value={form[5]}
                                />
                                {!showPassword[0] ?
                                <FaRegEyeSlash
                                    size={20}
                                    className="password-not-show-icon"
                                    onClick={() => handleShowPassword(0)}
                                />
                                :
                                <MdOutlineRemoveRedEye
                                    size={20}
                                    className="password-show-icon"
                                    onClick={() => handleShowPassword(0)}
                                />
                                }
                                {!showPassword[1] ?
                                <FaRegEyeSlash
                                    size={20}
                                    className="password-check-not-show-icon"
                                    onClick={() => handleShowPassword(1)}
                                />
                                :
                                <MdOutlineRemoveRedEye
                                    size={20}
                                    className="password-check-show-icon"
                                    onClick={() => handleShowPassword(1)}
                                />
                                }
                            </div>

                            <div className="join-email-box">
                                <p>이메일</p>
                                <div>
                                    <input type="email" placeholder="이메일을 입력해 주세요" className='user_email'
                                           onChange={handleInfo}
                                           value={form[3]}
                                    />
                                    <button onClick={checkHandle}
                                            className='check_email'
                                            id={emailCheck ? 'check_true' : ''}
                                    >중복확인
                                    </button>
                                </div>
                            </div>

                            <div className="join-phone-box">
                                <p>휴대폰 번호</p>
                                <div>
                                    <input type="number" placeholder="휴대폰번호('-'제외)를 입력해 주세요" className='user_phone'
                                           onChange={handleInfo}
                                           value={form[4]}
                                    />
                                    <button onClick={checkHandle}
                                            className='check_phone'
                                            id={phoneCheck ? 'check_true' : ''}
                                    >중복확인
                                    </button>
                                </div>
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
