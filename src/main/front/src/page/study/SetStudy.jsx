import "../../styles/study/SetStudy.css"
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";
import {TiHeartOutline} from "react-icons/ti";
import PageNation from "../../component/PageNation";
import usePagination from "../../hook/usePagination";


const SetStudy = () => {

    const navigator = useNavigate();
    const {userRole, username} = useContext(tokenInfoContext);
    const [data, setData] = useState([]); // 세트 단어 목록
    const [choiceModal, setChoiceModal] = useState(false); // 선택창 모달 여부
    const [choiceSetNum, setChoiceSetNum] = useState(0);

    const [totalData, setTotalData] = useState(0);
    const dataPerPage = 9; // 보여줄 목록 수
    const pagesPerRange = 10; // 표시할 페이지 수

    // 페이지 네이션 hook 관리
    const {
        currentPage,
        totalPages,
        startPage,
        endPage,
        handlePageChange
    } = usePagination({
        totalItems: totalData,
        itemsPerPage: dataPerPage,
        pagesPerRange
    });

    // 모달 여는 핸들러
    const handleOnModal = (index) => {
        setChoiceModal(true);
        setChoiceSetNum(data[index].wsNum);
    }

    // 학습페이지로 이동하는 핸들러
    const handleStudyPage = () => {
        getDetailDataAPI(choiceSetNum)
    }

    // 나의 학습 관리 페이지로 이동
    const handleSoloStudyPage = () => {
        navigator("/solo-study")
    }

    // 학습 페이지로 가기 위해 단어 목록 조회 API
    const getDetailDataAPI = (wsNum) => {
        axiosInstance.post('study/get-set-detail-data', {
            wsNum: wsNum
        })
            .then((res) => {
                navigator('/study', {state: {soloWord: res.data.data}});
                window.scroll(0,0)
            })
            .catch((err) => toast.error(err));
    }

    // 데이터 조회 API
    const getDataAPI = () => {
        axiosInstance.get('study/get-set-data-all', {
            params: {
                page: currentPage,
                size: dataPerPage
            }
        })
            .then((res) => {
                setData(res.data.data.content);
                setTotalData(res.data.data.totalElements)
            })
            .catch((e) => toast.error('조회 중 오류가 발생하였습니다.'));
    }
    // 데이터 조회
    useEffect(() => {
        getDataAPI();
    }, [currentPage]);

    return (
        <div className="set-study-container">
            <div className="set-study-all">

                <div className="solo-study-header-sub-title">
                    <p>단어 세트 학습</p>
                </div>
                <div className="solo-study-header">
                    <p>단어 세트 전체 목록</p>
                </div>

                <div className="solo-study-content-all">
                    {data?.map((item, index) => (
                        <div className="solo-study-content-box" key={index}
                             onClick={() => handleOnModal(index)}>
                            <div className="solo-study-title">
                                <p>{item.wsTitle}</p>
                            </div>
                            <div className="solo-study-count">
                                <p>{item.totalCount} 단어</p>
                            </div>
                            <div className="solo-study-write">
                                <img
                                    className="header-user-icon"
                                    src={`https://lg.thejapan.today/icon-image/${item?.userIconPath}`}
                                    alt="이미지"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/default_icon.svg";
                                    }}
                                />
                                <p>{item.username}</p>

                            </div>
                            <div className="solo-study-setting-box">
                                <p>{item.wsHits}</p>
                                <TiHeartOutline size={20}/>
                            </div>
                        </div>
                    ))}

                </div>

                <PageNation
                    currentPage={currentPage}
                    startPage={startPage}
                    endPage={endPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                    pagesPerRange={pagesPerRange}
                    divMargin={"30px 0"}
                />


                <div className='set-study-my-page'>
                    <button onClick={handleSoloStudyPage}>나의 학습 관리</button>
                </div>


                {choiceModal &&
                    <div className="solo-study-modal-back-ground">
                        <div className="solo-study-modal-all">
                            <div onClick={handleStudyPage}
                                 className="solo-study-modal-move">
                                <p>단어 학습</p>
                            </div>

                            <button onClick={() => setChoiceModal(false)}>목록으로</button>
                        </div>


                    </div>
                }

            </div>
        </div>
    )
}


export default SetStudy;