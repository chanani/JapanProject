import {useContext, useEffect, useState} from "react";
import "../../styles/mypage/RecordPage.css";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";
import usePagination from "../../hook/usePagination";
import PageNation from "../../component/PageNation";


const RecordPage = () => {

    const {userRole, username} = useContext(tokenInfoContext);
    const navigate = useNavigate();
    const [sortData, setSortData] = useState([]);
    const [choiceData, setChoiceData] = useState([]);
    const [cardData, setCardData] = useState([]);
    const [totalRecord, setTotalRecord] = useState(0);
    const [category, setCategory] = useState('choice');

    const perPage = 5; // 보여줄 목록 수
    const pagesPerRange = 5; // 표시할 페이지 수

    // 페이지 네이션 hook 관리
    const {
        currentPage,
        totalPages,
        startPage,
        endPage,
        handlePageChange,
        setCurrentPage
    } = usePagination({
        totalItems: totalRecord,
        itemsPerPage: perPage,
        pagesPerRange
    });


    // 상세페이지로 이동하는 핸들러
    const handleContent = async (index) => {
        try {
            let num = sortData[index]?.recordNum;
            let kind = sortData[index]?.recordKind;
            let level = sortData[index]?.recordLevel;
            let point = sortData[index]?.recordPoint;
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

    // 단답형 테스트 목록 조회
    const getSortRecordAPI = () => {
        axiosInstance.get('mypage/record', {
            params: {
                username: username,
                page: currentPage,
                size: perPage
            }
        })
            .then((res) => {
                setSortData(res.data.data.content);
                setTotalRecord(res.data.data.totalElements); // 전체 데이터
            })
            .catch((error) => {
                toast.error("데이터 조회에 실패하였습니다. 관리자에게 문의해주세요.");
                setSortData([]); // 데이터 조회 실패 시 빈 배열로 설정
            });
    }

    // 단어 선택 테스트 목록 조회
    const getChoiceRecordAPI = () => {
        axiosInstance.get('mypage/choice-record', {
            params: {
                username: username,
                page: currentPage,
                size: perPage
            }
        })
            .then((res) => {
                setChoiceData(res.data.data.content);
                setTotalRecord(res.data.data.totalElements);
            })
    }

    // 페이지 권한 및 데이터 가져오기
    useEffect(() => {
        if (userRole === "none") {
            toast.error("로그인 후 이용해주세요.");
            navigate("/login");
        }
    }, []);


    // 카테고리 변경
    const handleCategoryChange = (keyword) => {
        if(keyword === 'card') return toast.error('준비 중입니다.');
        setCategory(keyword);
        setCurrentPage(1);
    }

    useEffect(() => {
        if (category === 'sort') return getSortRecordAPI();
        if (category === 'choice') return getChoiceRecordAPI();
        // if (category === 'card') return ;

    }, [currentPage, category])


    return (

        <div className="recordPage-page-all">
            <div className="recordPage-page-mid">

                <div className="recordPage-info">
                    <p>테스트 기록</p>
                </div>

                <div className="recordPage-category-box">
                    <div
                        className={(category === 'choice' ? "recordPage-category-box-choice" : "recordPage-category-box-not-choice")}
                        onClick={() => handleCategoryChange('choice')}
                    >
                        단어 선택 테스트
                    </div>
                    <div
                        className={(category === 'sort' ? "recordPage-category-box-choice" : "recordPage-category-box-not-choice")}
                        onClick={() => handleCategoryChange('sort')}
                    >
                        단답형 테스트
                    </div>
                    <div
                        className={(category === 'card' ? "recordPage-category-box-choice" : "recordPage-category-box-not-choice")}
                        onClick={() => handleCategoryChange('card')}>
                        카드 맞추기
                    </div>
                </div>

                {category === 'choice' &&
                    choiceData?.map((item, index) => (
                        <div className="recordPage-score" key={index}
                             onClick={(event) => handleContent(index)}>
                            <div className="score-header">
                                <div>{username}</div>
                            </div>
                            <div className="score-content">
                                <div className="point">{item.ctrAnswerCount * 10}점</div>
                                <div className="save-date">{moment(item.createdAt).format('YYYY.MM.DD')} </div>
                            </div>

                        </div>
                    ))}

                {category === 'sort' &&
                    sortData?.map((item, index) => (
                        <div className="recordPage-score" key={index}
                             onClick={(event) => handleContent(index)}>
                            <div className="score-header">
                                <div className="level">{item.recordLevel}단계</div>
                                <div style={{fontSize: "13px"}}>⏐</div>
                                <div>{username}</div>
                            </div>
                            <div className="score-content">
                                <div className="point">{item.recordPoint}점</div>
                                <div className="save-date">{moment(item.recordDate).format('YYYY.MM.DD')} </div>
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
                    divMargin={"30px 0"}
                />


            </div>


        </div>

    );
}

export default RecordPage;