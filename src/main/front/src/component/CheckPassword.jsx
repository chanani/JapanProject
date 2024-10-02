import "../styles/component/CheckPassword.css"
import {IoCloseOutline, IoLockClosed} from "react-icons/io5";
import {axiosInstance} from "../api";
import {toast} from "react-toastify";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const CheckPassword = ({setCheckPassword, nowNumber}) => {
    const [password, setPassword] = useState("");
    const navigator = useNavigate();
    // 페이지 닫기
    const closeHandle = () => {
        setCheckPassword((prev) => !prev);
    }

    // 비밀번호 확인 요청 API
    const checkHandle = () => {
        axiosInstance.post('inquiry/checkPassword', {
            inquiryPassword: password,
            inquiryNum: nowNumber
        })
            .then((res) => {
                if (!res.data) return toast.error("비밀번호가 일지하지 않습니다.");
                navigator(`/inquiryDetail?inquiryNum=${nowNumber}`);
            })
            .catch(e => toast.error('비밀번호 확인 중 오류가 발생하였습니다. 관리자에게 문의해주세요.'))
    }

    return (
        <div className="check-password-container">
            <div className="check-password-box">
                <div className="check-password-lock-box">
                    <IoLockClosed size={33}/>
                </div>
                <div className="check-password-text-box">
                    <p>이 페이지는 비밀번호를 입력해야 볼 수 있습니다.</p>
                </div>
                <div className="check-password-input-box">
                    <input type="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="check-password-btn-box">

                    <div className="check-password-button-box">
                        <button onClick={checkHandle}>확인</button>
                    </div>

                    <div className="close-password-button-box">
                        <button onClick={closeHandle}>취소</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CheckPassword;