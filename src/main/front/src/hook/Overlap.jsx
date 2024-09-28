import {toast} from "react-toastify";

/**
 * @param kind 유효성 검사할 종류
 * @param data 유효성 검사할 데이터
 * */
export const Overlap = (kind, data) => {

    // 아이디 유효성 : 영어, 숫자 6글자 이상
    const usernameRegex = /^[a-zA-Z0-9]{6,}$/;
    // 비밀번호 유효성 : 영어, 숫자 포함 8글자 이상
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // 이메일 유효성
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let status = "success";

    if(kind === 'username' && !usernameRegex.test(data)) status = '아이디는 영문자와 숫자로만 구성되어야 하고 최소 6글자 이상이어야 합니다. ';
    else if(kind === 'password' && !passwordRegex.test(data)) status = '비밀번호는 영어, 숫자, 특수문자를 포함하여 8글자 이상이어야 합니다.';
    else if(kind === 'email' && !emailRegex.test(data)) status = '유효한 이메일을 입력하세요.';
    else if(kind === 'phone' && data.length !== 11) status = '전화번호는 11자리여야 합니다.';

    if(status !== 'success') toast.error(status);
    return status === 'success'
}