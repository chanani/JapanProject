import {useContext, useEffect, useState} from "react";
import "../../styles/mypage/RecordPage.css";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import usePagination from "../../hook/usePagination";
import PageNation from "../../component/PageNation";


const RecordPage = () => {

    const {userRole, username} = useContext(tokenInfoContext);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [totalRecord, setTotalRecord] = useState(0);



    const noticesPerPage = 5; // 보여줄 목록 수
    const pagesPerRange = 5; // 표시할 페이지 수

    // 페이지 네이션 hook 관리
    const {
        currentPage,
        totalPages,
        startPage,
        endPage,
        handlePageChange
    } = usePagination({
        totalItems: totalRecord,
        itemsPerPage: noticesPerPage,
        pagesPerRange
    });



    // 상세페이지로 이동하는 핸들러
    const handleContent = async (index) => {
        try {
            let num = data[index]?.recordNum;
            let kind = data[index]?.recordKind;
            let level = data[index]?.recordLevel;
            let point = data[index]?.recordPoint;
            const response = await axiosInstance.post('mypage/recordDetails', {
                    username: username,
                    recordNum: num
                }
            )

            const answer = response.data;
            navigate("/recordDetails", {state: {kind, level, answer, point, num}});
            window.scrollTo(0, 0);
        } catch (e) {
            toast.error("데이터 조회에 실패하였습니다. 관리자에게 문의해주세요.");
        }
    };
    // 페이지 권한 및 데이터 가져오기
    useEffect(() => {
        if (userRole === "none") {
            toast.error("로그인 후 이용해주세요.");
            navigate("/login");
        } else {
            axiosInstance.get('mypage/record', {
                params: {
                    username: username,
                    page: currentPage,
                    size: noticesPerPage
                }
            })
                .then((res) => {
                    setData(res.data.data.content);
                    setTotalRecord(res.data.data.totalElements); // 전체 공지사항 개수 설정
                })
                .catch((error) => {
                    toast.error("데이터 조회에 실패하였습니다. 관리자에게 문의해주세요.");
                    setData([]); // 데이터 조회 실패 시 빈 배열로 설정
                });
        }
    }, [currentPage]);


    return (

        <div className="recordPage-page-all">
            <div className="recordPage-page-mid">

                <div className="recordPage-info">
                    {data?.length === 0 ?
                        <p>학습 기록이 존재하지 않습니다.</p>
                        :
                        <p>{username}님의 기록</p>
                    }
                </div>

                {data?.map((item, index) => (
                    <div className="recordPage-score" key={index}
                         onClick={(event) => handleContent(index)}>
                        <div className="score-header">
                            <div className="level">{item.recordLevel}단계</div>
                            <div style={{fontSize: "13px"}}>⏐</div>
                            <div>{username}</div>
                        </div>
                        <div className="score-content">
                            <div className="point">{item.recordPoint}점</div>
                            <div className="save-date">{moment(item.recordDate).format('YYYY/MM/DD')} </div>
                        </div>

                    </div>
                ))}

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
}

export default RecordPage;