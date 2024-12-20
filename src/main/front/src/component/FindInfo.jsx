import '../styles/component/FindInfo.css'
import {IoCloseOutline} from "react-icons/io5";
import {useEffect, useState} from "react";
import {axiosInstance} from "../api";
import {toast} from "react-toastify";
import {Overlap} from "../hook/Overlap";

const FindInfo = ({info, find_check, setFind_check}) => {
    const [result, setResult] = useState(""); // 다음페이지로 넘어가는 정보
    const [email, setEmail] = useState(""); // 이메일
    const [authToken, setAuthToken] = useState(""); // 인증번호
    const [authTokenCheck, setAuthTokenCheck] = useState(""); // 입력하는 인증번호

    // 확인 버튼 핸들러
    const resultHandle = () => {
        if (!authToken) return toast.error("이메일 인증을 진행해주세요.");
        if (authToken !== authTokenCheck) return toast.error("인증번호가 일치하지 않습니다.");
        setResult(info);
    }
    // 인증번호 전송 API
    const emailAuthAPI = () => {
        if (!email) return toast.error("이메일을 입력해주세요.");
        toast.success("인증번호가 발송되었습니다.");
        axiosInstance.post('emailAuth', {email})
            .then((res) => {
                setAuthToken(res.data);
            })
            .catch(err => toast.error("등록되지 않은 이메일입니다."))
    }
    // 창 닫기 핸들러
    const closeHandle = () => {
        setFind_check("");
        setResult("");
        setEmail("");
        setAuthToken("");
        setAuthTokenCheck("");
    }
    return (
        find_check &&
        <div className='find_background'>

            <div className='find_box_all'>
                {result === "" ?
                    <div>
                        <div className='find_title_box'>
                            <p>{info === 'ID' ? '아이디 찾기' : '비밀번호 재설정'}</p>
                            <IoCloseOutline size={25} onClick={closeHandle}/>

                        </div>

                        <div className='find_box'>
                            {info === 'ID' ?
                                <div className="find-content-box">
                                    <p>아이디를 찾고자하는</p>
                                    <p>이메일을 입력해주세요.</p>
                                </div> :
                                <div className="find-content-box">
                                    <p>비밀번호를 찾고자하는</p>
                                    <p>이메일을 입력해주세요.</p>
                                </div>
                            }


                            <div className='find_input_box'>
                                <input type="email" placeholder='이메일'
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       disabled={authToken !== ""}
                                />
                                <input type="text" placeholder='인증번호 6자리 입력'
                                       disabled={authToken === ""}
                                       value={authTokenCheck}
                                       onChange={(e) => setAuthTokenCheck(e.target.value)}
                                       maxLength={6}
                                />
                            </div>

                            <div className="find-btn-all-box">
                                <div className='find_btn_box'>
                                    <button onClick={emailAuthAPI}>인증번호 받기</button>
                                </div>
                                <div className={"find_result_box" + (authToken ? " find-auth" : "")}>
                                    <button onClick={resultHandle}>확인</button>
                                </div>
                            </div>
                        </div>


                    </div>
                    : result === "ID" ?
                        <IdFind
                            email={email}
                            setFind_check={setFind_check}
                            setResult={setResult}
                            setEmail={setEmail}
                            setAuthToken={setAuthToken}
                            setAuthTokenCheck={setAuthTokenCheck}
                        /> :
                        <PwReset
                            email={email}
                            setFind_check={setFind_check}
                            setResult={setResult}
                            setEmail={setEmail}
                            setAuthToken={setAuthToken}
                            setAuthTokenCheck={setAuthTokenCheck}
                        />
                }

            </div>
        </div>
    );
}

export default FindInfo

export const IdFind = ({email, setFind_check, setResult, setEmail, setAuthToken, setAuthTokenCheck}) => {
    const [username, setUsername] = useState("");
    // 창 닫기 핸들러
    const closeHandle = () => {
        setFind_check("");
        setResult("");
        setEmail("");
        setAuthToken("");
        setAuthTokenCheck("");
    }
    // 아이디 조회 API
    useEffect(() => {
        axiosInstance.post('/findId', {email})
            .then(res => {
                setUsername(res.data);
                toast.success('아이디 조회에 성공하였습니다.');
            })
            .catch(err => toast.error("확인 중 오류가 발생하였습니다. 관리자에게 문의해주세요."))
    }, []);
    return (
        <div>
            <div className="id_find_title_box">
                <p>가입된 아이디</p>
                <IoCloseOutline size={25} onClick={closeHandle}/>
            </div>
            <div className="id_find_content">
                <p>{username.slice(0, -3) + "***"}</p>
            </div>
        </div>
    )
}

export const PwReset = ({email, setFind_check, setResult, setEmail, setAuthToken, setAuthTokenCheck, setModifyPassword}) => {
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    // 비밀번호 변경 핸들러
    const pwChangeHandle = () => {
        if (!password) return toast.error("변경할 비밀번호를 입력해주세요.");
        Overlap('password', password);
        if (password !== passwordCheck) return toast.error("비밀번호가 일치하지 않습니다.");
        if (window.confirm('정말 변경하시겠습니까?')) changePasswordApi();
    }

    // 비밀번호 변경 API
    const changePasswordApi = () => {
        axiosInstance.post('/passwordChange', {email, password})
            .then(res => {
                if (res.status !== 200) toast.error("비밀번호 변경 중 오류가 발생하였습니다. 관리자에게 문의해주세요.")
                else {
                    toast.success('비밀번호가 정상적으로 변경되었습니다.');
                    closeHandle();
                }
            })
            .catch(err => {
                toast.error("비밀번호 변경 중 오류가 발생하였습니다. 관리자에게 문의해주세요.")
            })
    }
    // 창 닫기 핸들러
    const closeHandle = () => {
        // 마이페이지에서 넘어 왔을 떄 바로 return
        if(setModifyPassword) return setModifyPassword(false);
        setFind_check("");
        setResult("");
        setEmail("");
        setAuthToken("");
        setAuthTokenCheck("");
        setPassword("");
        setPasswordCheck("");
    }
    return (
        <div>
            <div className="find_title_box">
                <p>비밀번호 재설정</p>
                <IoCloseOutline size={25} onClick={closeHandle}/>
            </div>

            <div className='find_box'>

                <p className="find-content-box">사용하실 비밀번호를 입력해주세요.</p>

                <div className='find_input_box'>
                    <input
                        type="password"
                        placeholder='비밀번호'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder='비밀번호 확인'
                        value={passwordCheck}
                        onChange={(e) => setPasswordCheck(e.target.value)}
                    />
                </div>

                <div className='pw_find_btn_box'>
                    <button onClick={pwChangeHandle}>변경하기</button>
                </div>

            </div>


        </div>
    )
}