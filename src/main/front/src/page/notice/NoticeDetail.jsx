import "../../styles/notice/NoticeDetail.css";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import { IoChevronBackOutline } from "react-icons/io5";

const NoticeDetail = () => {
    const location = useLocation(); // useLocation으로 state 받기
    const {noticeDetailNo} = location.state; // 전달된 state에서 값 추출
    const [noticeDetail, setNoticeDetail] = useState([]) // 공지사항 데이터
    const [otherNoticeData, setOtherNoticeData] = useState([]) // 이전, 다음 공지사항
    const navigate = useNavigate();

    // 공지사항 상세 내용 가져오기
    const getNoticeDetail = () => {
        axiosInstance.get(`/notice/get-detail?noticeNum=${noticeDetailNo}`)
            .then((res) => {
                setNoticeDetail(res.data.data)
            })
            .catch(err => toast.error("공지사항 조회 중 오류가 발생하였습니다."));
    }

    const getOtherData = (noticeNum) => {
        navigate(`/notice-detail`, {
            state: {noticeDetailNo: noticeNum}
        })
    }

    // 뒤로 가기
    const historyBackHandle = () => {
        navigate("/notice");
    }

    // 공지사항 조회
    useEffect(() => {
        getNoticeDetail();
    }, [noticeDetailNo]);


    return(
        <div className="user-notice-box-all">
            <div className="user-notice-box">
                <div className="history-back-box" onClick={historyBackHandle}>
                    <IoChevronBackOutline size={25} />
                    <p>공지사항 목록</p>
                </div>

                <div className="notice-detail-title-box">
                    <p>{noticeDetail[1]?.noticeTitle}</p>
                </div>

                <div className="notice-detail-content-box">
                    <p>{noticeDetail[1]?.noticeContent}</p>
                </div>

                <div className="notice-other-data-box">
                    {noticeDetail[2]?.noticeTitle ?
                        <div className="notice-back-data-box" onClick={() => getOtherData(noticeDetail[2].noticeNum)}>
                            <p className="notice-other-info">이전글</p>
                            <p className="notice-other-title">{noticeDetail[2].notice_title}</p>
                        </div>
                    :
                    ""
                    }
                    {noticeDetail[0]?.noticeTitle ?
                        <div className="notice-next-data-box" onClick={() => getOtherData(noticeDetail[0].noticeNum)}>
                            <p className="notice-other-info">다음글</p>
                            <p className="notice-other-title">{noticeDetail[0].noticeTitle}</p>
                        </div>
                        :
                        ""
                    }

                </div>
                <div className="notice-list-btn-box">
                    <button onClick={historyBackHandle}>목록으로</button>
                </div>

            </div>


        </div>
    );
}

export default NoticeDetail;