import {useContext, useState} from "react";
import "../../styles/adminPage/AddNoticePage.css";
import axios from "axios";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";

const AddNoticePage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const {userRole, username, accessToken, refreshToken} = useContext(tokenInfoContext);


    // 제목 수정 핸들러
    const handleTitle = (event) => {
        let input_value = event.target.value;
        setTitle(input_value);
    }
    // 내용 수정 핸들러
    const handleContent = (event) => {
        let input_value = event.target.value;
        setContent(input_value);
    }
    // 공지사항 등록 핸들러
    const handleSubmit = async () => {
        try {
            // 공지사항 등록
            const noticeResponse = await axiosInstance.post('admin/addNotice', {title: title, content: content})
            // 카프카 Topic 등록
            await axiosInstance.post('kafka/send', {message: content})
            toast.success("정상적으로 등록되었습니다.");
            window.location = "/";
        } catch (error) {
            if (error.response && error.response.status === 403) toast.error("등록에 실패하였습니다. 관리자에게 문의해주세요.");
            else toast.error("등록에 실패하였습니다. 관리자에게 문의해주세요.");
        }
    }

    return (
        <div className="notice-box-all">
            <div className="notice-box">
                <div className="noticePage-title-box">
                    <p>공지사항 작성</p>
                </div>
                <div className="notice-title-box">
                    <label htmlFor="notice-title">제목 :</label>
                    <input type="text"
                           id="notice-title"
                           value={title}
                           onChange={handleTitle}
                    />
                </div>
                <div className="notice-content-box">
                    <label htmlFor="notice-content">내용 : </label>
                    <textarea id="notice-content"
                              value={content}
                              onChange={handleContent}
                    ></textarea>
                </div>
                <div className="notice-btn-box">
                    <button onClick={handleSubmit}>전송하기</button>
                </div>
            </div>
        </div>
    );
}

export default AddNoticePage;