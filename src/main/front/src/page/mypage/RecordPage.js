import React, {useContext, useEffect, useState} from "react";
import "../../styles/mypage/RecordPage.css";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";
import usePagination from "../../hook/usePagination";
import PageNation from "../../component/PageNation";
import {FaRegTrashAlt} from "react-icons/fa";
import axios from "axios";


const RecordPage = () => {

    const {userRole, username} = useContext(tokenInfoContext);
    const navigate = useNavigate();
    const [shortData, setShortData] = useState([]);
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


    // 단답형 상세페이지로 이동하는 핸들러
    const handleShortResultPage = async (index) => {
        try {
            let num = shortData[index]?.recordNum;
            let kind = shortData[index]?.recordKind;
            let level = shortData[index]?.recordLevel;
            let point = shortData[index]?.recordPoint;
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

    // 단어 선택 테스트 결과 상세페이지로 이동하는 핸들러
    const handleChoiceTestResultPage = async (index) => {
        try {
            let ctr = choiceData[index];

            const response = await axiosInstance.get('mypage/choice-record-detail', {
                    params: {
                        ctrNum: ctr.ctrNum
                    }
                }
            )
            const answer = response.data.data;
            navigate("/choice-test", {state: {ctr, answer}});
            window.scrollTo(0, 0);
        } catch (e) {
            toast.error("데이터 조회에 실패하였습니다. 관리자에게 문의해주세요.");
        }
    }

    // 단어 선택 테스트 목록 삭제
    const choiceTestDeleteHandle = (ctrNum) => {
        if (window.confirm('테스트 내역을 삭제하시겠습니까?')) {
            axiosInstance.post('mypage/choice-record-delete', {ctrNum: ctrNum})
                .then((res) => {
                    toast.success('정상적으로 삭제가 완료되었습니다.');
                    getChoiceRecordAPI();
                })
                .catch((e) => toast.error('삭제 중 오류가 발생하였습니다.'));
        }
    }

    // 단답형 테스트 목록 삭제
    const shortTestDeleteHandle = (strNum) => {
        if (window.confirm('기록을 삭제하시겠습니까 ?')) {
            axiosInstance.post('mypage/short-record-delete', {
                strNum : strNum
            })
                .then((res) => {
                    if(res.status !== 200) return toast.error('기록 삭제 중 오류가 발생하였습니다. 관리자에게 문의해주세요.');
                    toast.success('정상적으로 기록이 삭제되었습니다.');
                    getShortRecordAPI();
                })
        }
    }



    // 단답형 테스트 목록 조회
    const getShortRecordAPI = () => {
        axiosInstance.get('mypage/short-record', {
            params: {
                username: username,
                page: currentPage,
                size: perPage
            }
        })
            .then((res) => {
                setShortData(res.data.data.content);
                setTotalRecord(res.data.data.totalElements); // 전체 데이터
            })
            .catch((error) => {
                toast.error("데이터 조회에 실패하였습니다. 관리자에게 문의해주세요.");
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
            .catch((error) => {
                toast.error("데이터 조회에 실패하였습니다. 관리자에게 문의해주세요.");
            });
    }

    // studyTime을 시, 분, 초 형식으로 변환하는 핸들러
    const formatStudyTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        if (hours > 0) {
            return `${hours}시간 ${minutes}분 ${seconds}초`;
        } else if (minutes > 0) {
            return `${minutes}분 ${seconds}초`;
        } else {
            return `${seconds}초`;
        }
    };

    // 페이지 권한 및 데이터 가져오기
    useEffect(() => {
        if (userRole === "none") {
            toast.error("로그인 후 이용해주세요.");
            navigate("/login");
        }
    }, []);


    // 카테고리 변경
    const handleCategoryChange = (keyword) => {
        if (keyword === 'card') return toast.error('준비 중입니다.');
        setCategory(keyword);
        setCurrentPage(1);
    }

    // 카테고리 변경 시 데이터 조회
    useEffect(() => {
        if (category === 'short') return getShortRecordAPI();
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
                        className={(category === 'short' ? "recordPage-category-box-choice" : "recordPage-category-box-not-choice")}
                        onClick={() => handleCategoryChange('short')}
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
                             onClick={(event) => handleChoiceTestResultPage(index)}>
                            <div className="score-header">
                                <div>{username}</div>
                                <div style={{fontSize: "13px"}}>⏐</div>
                                <div className="level">{formatStudyTime(item.ctrTime)}</div>
                                <div className="recordPage-score-delete-btn"><FaRegTrashAlt size={15} onClick={(e) => {
                                    e.stopPropagation();
                                    choiceTestDeleteHandle(item.ctrNum);
                                }}/></div>
                            </div>
                            <div className="score-content">
                                <div className="point">{item.ctrAnswerPoint}점</div>
                                <div className="save-date">{moment(item.createdAt).format('YYYY.MM.DD')} </div>
                            </div>

                        </div>
                    ))}

                {category === 'short' &&
                    shortData?.map((item, index) => (
                        <div className="recordPage-score" key={index}
                             onClick={(event) => handleShortResultPage(index)}>
                            <div className="score-header">
                                <div>{username}</div>
                                <div style={{fontSize: "13px"}}>⏐</div>
                                <div className="level">{formatStudyTime(item.strTime)}</div>
                                <div className="recordPage-score-delete-btn"><FaRegTrashAlt size={15} onClick={(e) => {
                                    e.stopPropagation();
                                    shortTestDeleteHandle(item.strNum);
                                }}/></div>
                            </div>
                            <div className="score-content">
                                <div className="point">{item.strAnswerPoint}점</div>
                                <div className="save-date">{moment(item.createdAt).format('YYYY.MM.DD')} </div>
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