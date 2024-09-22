import {useEffect, useState, useContext} from "react";
import moment from "moment";
import 'moment/locale/ko';
import {TbCircleLetterN} from "react-icons/tb";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";
import PageNation from "../../component/PageNation";
import usePagination from "../../hook/usePagination";
import "../../styles/notice/NoticePage.css";
import {useNavigate} from "react-router-dom";

const NoticePage = () => {
    const {username} = useContext(tokenInfoContext);
    const [notices, setNotices] = useState([]);
    const [totalNotices, setTotalNotices] = useState(0);

    const noticesPerPage = 10; // 보여줄 목록 수
    const pagesPerRange = 5; // 표시할 페이지 수
    const navigate = useNavigate();

    // 페이지 네이션 hook 관리
    const {
        currentPage,
        totalPages,
        startPage,
        endPage,
        handlePageChange
    } = usePagination({
        totalItems: totalNotices,
        itemsPerPage: noticesPerPage,
        pagesPerRange
    });

    // 공지사항 내용의 길이가 페이지 너비 초과할 경우 ...으로 표시
    const truncate = (str, n) => (str?.length > n ? str.substr(0, n - 1) + "..." : str);

    // 등록한지 3일 전일 경우 new 표시될 수 있도록
    const isWithinOneDay = (date) => moment(date).isAfter(moment().subtract(3, 'days'));

    // 공자사항 목록 불러오기
    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await axiosInstance.get('notice/getList', {
                    params: {
                        page: currentPage,
                        size: noticesPerPage
                    }
                });
                setNotices(res.data.data.content);
                setTotalNotices(res.data.data.total_elements); // 전체 공지사항 개수 설정
            } catch (error) {
                toast.error('목록을 불러오는 중 오류가 발생하였습니다.');
            }
        };
        fetchNotices();
    }, [currentPage]);

    // 공지사항 상세 조회
    const handleDetail = (item) => {
        if (username) {
            axiosInstance.get(`/notice/noticeCheck/${item.notice_num}/${username}`)
                .catch(() => toast.error('조회가 정상적으로 이루어지지 않았습니다.'));
        }
        navigate(`/notice-detail`, {
            state: {noticeDetailNo: item.notice_num}
        })
    };

    return (
        <div className="user-notice-box-all">
            <div className="user-notice-box">
                <div className="user-notice-title-box">
                    <p>공지사항</p>
                </div>

                <div className="user-notice-detail-box">
                    {notices.map((item, index) => (
                        <div className="user-notice-content-box" key={item.notice_num}
                             onClick={() => handleDetail(item)}>
                            <div className="notice-content-high">
                                <p style={{marginRight: "5px", fontWeight: "700"}}>[공지사항]</p>
                                <p className="content-box-p-tag">{item.notice_title}</p>
                                {isWithinOneDay(item.notice_regdate) && <TbCircleLetterN color="red"/>}
                            </div>
                            <div className="notice-content-row">
                                <p>{moment(item.notice_regdate).format('YYYY. MM. DD')}</p>
                            </div>
                        </div>
                    ))}
                    <hr style={{border: "0.5px solid #777"}}/>
                </div>

                <PageNation
                    currentPage={currentPage}
                    startPage={startPage}
                    endPage={endPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                    pagesPerRange={pagesPerRange}
                />

            </div>


        </div>
    );
};

export default NoticePage;
