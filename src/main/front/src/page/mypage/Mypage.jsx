import '../../styles/mypage/Mypage.css';
import {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {useNavigate} from "react-router-dom";
import {axiosInstance} from "../../api";
import {CiCamera} from "react-icons/ci";
import FindInfo from "../../component/FindInfo";
import {Overlap} from "../../hook/Overlap";

const Mypage = () => {
    const navigate = useNavigate();
    const {userRole, username} = useContext(tokenInfoContext);
    const [modify, setModify] = useState(false);
    const [form, setForm] = useState(["", "", "", "", "", "", ""]);
    const [pwModifyCheck, setPwModifyCheck] = useState("");
    const [userIcon, setUserIcon] = useState("");

    // 수정하기 활성화
    const modifyToggleHandle = (event) => {
        setModify(current => !current);
        if (event.target.className === 'modifyToggleClose') getData();
    }

    // 정보 수정하기
    const changeInfo = (event) => {
        let eventName = event.target.className;
        let e_value = event.target.value;
        let arr = form.slice();
        if (eventName === "user_name") arr[0] = e_value;
        else if (eventName === "username") arr[1] = e_value;
        else if (eventName === "password") arr[2] = e_value;
        else if (eventName === "user_email") arr[3] = e_value;
        else if (eventName === "user_phone") arr[4] = e_value;
        else if (eventName === "password_check") arr[5] = e_value;
        setForm(arr);
    }
    // 변경사항 저장하기
    const modifySubmit = () => {
        if (form[0]?.trim() === "" || form[1]?.trim() === "" || form[3]?.trim() === "" || form[4]?.trim() === "") {
            return toast.error('모든 항목를 입력하세요.');
        }
        if (!Overlap("email", form[3])) return;
        if (!Overlap("phone", form[4])) return;
        // 전화번호 유효성
        let check = window.confirm('정말 변경하시겠습니까?');
        if (check) {
            modifyData();
            setModify(current => !current);
        }
    }

    // 데이터 호출 API
    const getData = () => {
        axiosInstance.get('mypage/data', {
            params: {
                username: username
            }
        })
            .then((res) => {
                let arr = [res.data.userName, res.data.username, "", res.data.userEmail, res.data.userPhone, "", res.data.imagePath];
                setForm(arr);
                setUserIcon(res.data.imagePath);
            })
            .catch(e => "catch : " + e)
    }

    // 데이터 변경 API
    const modifyData = () => {
        axiosInstance.post('mypage/update', {
            username: username,
            userEmail: form[3],
            userPhone: form[4]
        })
            .then((res) => {
                if (res.status === 200) {
                    toast.success('정보가 정상적으로 수정되었습니다.');
                    getData();
                }
            })
            .catch(e => toast.error('정보 수정 중 오류가 발생하였습니다. 관리자에게 문의해주세요.'));
    }

    // 비밀번호 찾기 핸들러
    const pwModifyHandle = () => {
        setPwModifyCheck("PW");
    }

    // 탈퇴 페이지로 이동
    const withdrawalHandle = () => {
        navigate('/withdrawal');
    }

    // 이미지 변경 API
    const imageChangeAPI = (formData) => {
        axiosInstance.post('mypage/image-change', formData, {
            headers: {'content-type': 'multipart/form-data'}
        })
            .then((res) => {
                setUserIcon(res.data.data);
                toast.success("이미지를 변경하였습니다.")
            })
            .catch((e) => toast.error("이미지 변경 중 오류가 발생하였습니다."))
    }


    // 대표 이미지 변경 핸들러
    const userIconChangeHandle = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("username", username);

        // API 호출
        imageChangeAPI(formData);
    }

    // 페이지 권한 및 데이터 호출
    useEffect(() => {
        if (userRole === "none" || username === 'none') {
            toast.error("로그인 후 이용해주세요.");
            navigate("/login");
        } else {
            getData();
        }
    }, []);


    return (
        <div className="mypage-container">
            <div className="mypage-box">

                <div className="mypage-title-box">
                    <p>나의 정보 관리</p>
                </div>


                <div className='mypage-content-box'>
                    <div className='mypage-content'>

                        <div className="mypage-image-box">
                            {/* 서버  이미지 */}
                            <img
                                className="user-icon"
                                src={userIcon ? `/icon-image/${userIcon}` : "/default_icon.svg"}
                                alt="이미지"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/default_icon.svg";
                                }}
                            />

                            {/* 로컬 이미지 */}
                            {/*<img
                                className="user-icon"
                                src={userIcon ? `https://lg.thejapan.today/icon-image/${userIcon}` : "/default_icon.svg"}
                                alt="이미지"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/default_icon.svg";
                                }}
                            />*/}
                            <label className="user-icon-modify-btn"
                                   htmlFor="icon-file"><CiCamera size={30}/></label>
                            <span>{form[0]}</span>
                            <input id="icon-file"
                                   type="file"
                                   style={{display: 'none'}}
                                   onChange={userIconChangeHandle}
                            />
                        </div>

                        <div className='id-box'>
                            <p><label>아이디</label></p>
                            <input type="text"
                                   placeholder=''
                                   disabled
                                   value={form[1]}
                                   className='username'
                                   onChange={changeInfo}
                            />
                        </div>

                        <div className='password-box'>
                            <p><label>비밀번호</label></p>
                            <input type="text"
                                   placeholder='**********'
                                   className='password'
                                   disabled={true}
                            />
                            <button className="password-change-btn"
                                    onClick={pwModifyHandle}>변경
                            </button>
                        </div>

                        <div className='email-box'>
                            <p><label>이메일</label></p>
                            <input type="email"
                                   placeholder=''
                                   disabled={!modify}
                                   value={form[3]}
                                   className='user_email'
                                   onChange={changeInfo}
                            />
                        </div>
                        <div className='phone-box'>
                            <p><label>연락처</label></p>
                            <input type="text"
                                   placeholder=''
                                   disabled={!modify}
                                   value={form[4]}
                                   className='user_phone'
                                   onChange={changeInfo}
                            />
                        </div>
                    </div>

                    {!modify ?
                        <div className="mypage-btn-box-on">
                            <button onClick={modifyToggleHandle}>수정하기</button>
                            <FindInfo info="pw" find_check={pwModifyCheck} setFind_check={setPwModifyCheck}/>
                            {!modify &&
                                <div className="withdrawal-box">
                                    <p>The Japan을 더 이상 사용하지 않으신가요?</p>
                                    <input type='button' value='회원탈퇴' onClick={withdrawalHandle}/>
                                </div>
                            }
                        </div>
                        :
                        <div className="mypage-btn-box-off">
                            <button onClick={modifySubmit}>변경사항 저장</button>
                            <button onClick={modifyToggleHandle} className="modifyToggleClose">취소</button>
                        </div>
                    }

                </div>


            </div>
        </div>
    )
}

export default Mypage