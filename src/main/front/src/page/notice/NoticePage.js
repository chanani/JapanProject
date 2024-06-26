import {useEffect, useState} from "react";
import "../../styles/notice/NoticePage.css";
import moment from "moment";
import 'moment/locale/ko';
import {TbCircleLetterN} from "react-icons/tb";
import {FaArrowLeft} from "react-icons/fa";
import {FaArrowRight} from "react-icons/fa";
import {IoCloseOutline} from "react-icons/io5";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {useContext} from "react";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";
import NoticeDetail from "../../component/NoticeDetail";

const NoticePage = () => {
    const {userRole, username} = useContext(tokenInfoContext);
    const [notice, setNotice] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [detailToggle, setDetailToggle] = useState(false);
    const noticesPerPage = 5;
    const [detailIndex, setDetailIndex] = useState(1);

    // 현재 페이지의 공지사항 목록 가져오기
    const indexOfLastNotice = currentPage * noticesPerPage;
    const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
    const currentNotices = notice.slice(indexOfFirstNotice, indexOfLastNotice);

    // 페이지 변경 핸들러
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    // 페이지 변경 핸들러
    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };
    // 제목 글자 초과할 경우 ...으로 변경
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };
    // 날짜가 오늘로부터 1일 이내인지 확인하는 함수
    const isWithinOneDay = (date) => {
        const oneDayAgo = moment().subtract(1, 'day');
        return moment(date).isAfter(oneDayAgo);
    };
    // 상세 공지사항 핸들러
    const handleDetail = (index) => {
        let realIndex = (currentPage - 1) * noticesPerPage + index;
        setDetailIndex(realIndex);
        setDetailToggle((current) => !current);
        if (username !== null) {
            axiosInstance.get(`notice/noticeCheck/${notice[realIndex].notice_num}/${username}`)
                .catch((e) => toast.error('조회가 정상적으로 이루어지지 않았습니다. 관리자에게 문의해주세요.'));
        }

    }
    // 상세 공지사항 닫기 핸들러
    const handleDetailOut = () => {
        setDetailToggle((current) => !current);
    }

    // 공지사항 불러오기
    useEffect(() => {
        axiosInstance.get('notice/getList')
            .then((res) => setNotice(res.data))
            .catch((e) => toast.error('목록을 불러오는 중 오류가 발생하였습니다.'));
    }, [])

    return (
        <div className="user-notice-box-all">
            <div className="user-notice-box">

                <div className="user-notice-title-box">
                    <p>The Japan 공지사항</p>
                </div>
                {currentNotices.map((item, index) => (
                    <div className="user-notice-content-box" key={index} onClick={(e) => handleDetail(index)}>
                        <p className="content-box-p-tag">
                            {truncate(item.notice_title, 14)}
                            {isWithinOneDay(item.notice_regdate) && <TbCircleLetterN color="red"/>}
                        </p>
                        <p>{moment(item.notice_regdate).format('YYYY/MM/DD')}</p>
                    </div>
                ))}
                <div className="notice-pageNation">
                    {currentPage === 1 ?
                        <FaArrowLeft color="gray" size={20}/>
                        :
                        <FaArrowLeft onClick={prevPage} size={20}/>
                    }
                    {currentPage * noticesPerPage < notice.length ?
                        <FaArrowRight onClick={nextPage} size={20}/>
                        :
                        <FaArrowRight color="gray" size={20}/>
                    }
                </div>
            </div>

            {detailToggle &&
                <NoticeDetail
                    setDetailToggle={setDetailToggle}
                    notice={notice[detailIndex]}
                    username={username}
                    handleDetailOut={handleDetailOut}
                    kind="notice"
                />
            }

        </div>
    )
}

export default NoticePage;