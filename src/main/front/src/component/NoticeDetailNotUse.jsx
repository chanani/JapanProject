import "../styles/component/NoticeDetail.css";
import {axiosInstance} from "../api";
import {toast} from "react-toastify";
import {IoCloseOutline} from "react-icons/io5";
import {useEffect} from "react";

const NoticeDetailNotUse = ({ notice, username, handleDetailOut, kind }) => {
    const getNoticeDetail = () => {
        if (username !== null && username !== undefined) {
            axiosInstance.get(`notice/noticeCheck/${notice.notice_num}/${username}`)
                .catch((e) => toast.error('조회가 정상적으로 이루어지지 않았습니다. 관리자에게 문의해주세요.'));
        }
    }

    useEffect(() => {
        getNoticeDetail();
    }, []);

    return (
        <div className="notice-detail-box-all">
            <div className="notice-detail-box">

                <div className="notice-detail-title">
                    <div>{notice.notice_title}</div>
                    <div className="notice-detail-out">
                        <IoCloseOutline size={25} onClick={handleDetailOut}/>
                    </div>
                </div>

                <div className="notice-detail-content">
                    <textarea defaultValue={notice.notice_content} readOnly></textarea>
                </div>

            </div>
        </div>
    )
}

export default NoticeDetailNotUse