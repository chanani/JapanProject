import {useEffect, useState, useContext} from "react";
import "../../styles/notice/NoticePage.css"; // CSS 파일을 확인하세요
import moment from "moment";
import 'moment/locale/ko';
import {TbCircleLetterN} from "react-icons/tb";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";
import NoticeDetail from "../../component/NoticeDetail";
import {FaArrowLeft, FaArrowRight, FaLock} from "react-icons/fa";


const NoticePage = () => {
    const {username} = useContext(tokenInfoContext);
    const [notices, setNotices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [detailToggle, setDetailToggle] = useState(false);
    const [detailIndex, setDetailIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const noticesPerPage = 10; // 페이지당 공지사항 수
    const pagesPerRange = 5; // 한 번에 표시할 페이지 번호 수

    // 공지사항 불러오기
    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await axiosInstance.get('notice/getList', {
                    params: {
                        page: currentPage,
                        size: noticesPerPage
                    }
                });
                setNotices(res.data.data.content); // 공지사항 데이터 설정
                setTotalPages(res.data.data.total_pages); // 전체 페이지 수 설정
            } catch (error) {
                toast.error('목록을 불러오는 중 오류가 발생하였습니다.');
            }
        };
        fetchNotices();
    }, [currentPage]);

    // 페이지 이동 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 제목 글자 초과할 경우 ...으로 변경
    const truncate = (str, n) => (str?.length > n ? str.substr(0, n - 1) + "..." : str);

    // 날짜가 오늘로부터 3일 이내인지 확인하는 함수
    const isWithinOneDay = (date) => moment(date).isAfter(moment().subtract(3, 'days'));

    // 공지사항 상세보기 핸들러
    const handleDetail = (index) => {
        setDetailIndex(index);
        setDetailToggle(true);
        const selectedNotice = notices[index];
        if (username) {
            axiosInstance.get(`notice/noticeCheck/${selectedNotice.notice_num}/${username}`)
                .catch(() => toast.error('조회가 정상적으로 이루어지지 않았습니다. 관리자에게 문의해주세요.'));
        }
    };

    // 현재 페이지 범위의 시작과 끝 계산
    const startPage = Math.floor((currentPage - 1) / pagesPerRange) * pagesPerRange + 1;
    const endPage = Math.min(startPage + pagesPerRange - 1, totalPages);

    // 페이지 번호 버튼 렌더링
    const renderPageNumbers = () => {
        const pageNumbers = [];

        if (startPage > 1) {
            // 이전 페이지 범위로 이동 버튼 추가
            pageNumbers.push(
                <button
                    key="prev"
                    onClick={() => handlePageChange(startPage - pagesPerRange)}
                    style={{
                        padding: "15px 10px 10px 10px",
                        borderRadius: "100px",
                        backgroundColor: "transparent",
                        color: "#000",
                        cursor: "pointer",
                        border: "none",
                        fontSize: "15px",
                        fontWeight: "500"
                    }}
                >
                    {<FaArrowLeft/>}
                </button>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={currentPage === i ? "active-page" : ""}
                    style={{
                        padding: "6px 10px",
                        borderRadius: "100px",
                        backgroundColor: currentPage === i ? "#007bff" : "transparent",
                        color: currentPage === i ? "#fff" : "#000",
                        cursor: "pointer",
                        border: "none",
                        fontSize: "15px",
                        fontWeight: "500"
                    }}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            // 다음 페이지 범위로 이동 버튼 추가
            pageNumbers.push(
                <button
                    key="next"
                    onClick={() => handlePageChange(endPage + 1)}
                    style={{
                        padding: "15px 10px 10px 10px",
                        borderRadius: "100px",
                        backgroundColor: "transparent",
                        color: "#000",
                        cursor: "pointer",
                        border: "none",
                        fontSize: "15px",
                        fontWeight: "500"
                    }}
                >
                    {<FaArrowRight/>}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="user-notice-box-all">
            <div className="user-notice-box">
                <div className="user-notice-title-box">
                    <p>공지사항</p>
                </div>

                <div className="user-notice-detail-box">
                    {notices?.map((item, index) => (
                        <div className="user-notice-content-box" key={item.notice_num}
                             onClick={() => handleDetail(index)}>
                            <div className="notice-content-high">
                                <p style={{marginRight: "5px", fontWeight: "700"}}>[공지사항]</p>
                                <p className="content-box-p-tag">
                                    {truncate(item.notice_title, 14)}
                                </p>
                                {isWithinOneDay(item.notice_regdate) && <TbCircleLetterN color="red"/>}
                            </div>
                            <div className="notice-content-row">
                                <p>{moment(item.notice_regdate).format('YYYY. MM. DD')}</p>
                            </div>
                        </div>
                    ))}
                    <hr style={{border: "0.5px solid #777"}}/>
                </div>

                <div className="notice-pageNation" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '20px 0',
                    alignItems: 'center',
                }}>
                    {renderPageNumbers()}
                </div>
            </div>

            {detailToggle && (
                <NoticeDetail
                    setDetailToggle={setDetailToggle}
                    notice={notices[detailIndex]}
                    username={username}
                    handleDetailOut={() => setDetailToggle(false)}
                    kind="notice"
                />
            )}
        </div>
    );
};

export default NoticePage;
