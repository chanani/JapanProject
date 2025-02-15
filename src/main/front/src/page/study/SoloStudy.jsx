import "../../styles/study/SoloStudy.css"
import {FaPlus} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {toast} from "react-toastify";
import {axiosInstance} from "../../api";
import {TiHeartOutline} from "react-icons/ti";
import PageNation from "../../component/PageNation";
import usePagination from "../../hook/usePagination";


const SoloStudy = () => {
    const navigator = useNavigate();
    const {userRole, username} = useContext(tokenInfoContext);
    const [data, setData] = useState([]); // 세트 단어 목록
    const [choiceModal, setChoiceModal] = useState(false); // 선택창 모달 여부
    const [choiceSetNum, setChoiceSetNum] = useState(0);

    const [totalData, setTotalData] = useState(0);
    const dataPerPage = 8; // 보여줄 목록 수
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


    // 등록 페이지로 이동
    const handleAddPage = () => {
        navigator("/solo-study/add-word");
        window.scrollTo(0, 0);
    }
    // 모달 여는 핸들러
    const handleOnModal = (index) => {
        setChoiceModal(true);
        setChoiceSetNum(data[index].wsNum);
    }

    // 학습페이지로 이동하는 핸들러
    const handleStudyPage = () => {
        getDetailDataAPI(choiceSetNum)
    }

    // 수정페이지로 이동하는 핸들러
    const handleModifyPage = () => {
        setModifyDataAPI(choiceSetNum)
    }

    // 목록 페이지로 이동하는 핸들러
    const handleListMove = () => {
        navigator("/set-study")
    }

    // 삭제 핸들러
    const handleRemove = () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("단어 세트 목록을 삭제하시겠습니까?")) {
            setRemoveAPI(choiceSetNum);
        }
    }


    // 학습 페이지로 가기 위해 단어 목록 조회 API
    const getDetailDataAPI = (wsNum) => {
        axiosInstance.post('study/get-set-detail-data', {
            username: username,
            wsNum: wsNum
        })
            .then((res) => {
                navigator('/study', {state: {soloWord: res.data.data}});
            })
            .catch((err) => toast.error(err));
    }

    // 수정 페이지로 가기 위해 단어 목록 조회 API
    const setModifyDataAPI = (wsNum) => {
        axiosInstance.post('study/get-modify-data', {
            username: username,
            wsNum: wsNum
        })
            .then((res) => {
                navigator('/solo-study/add-word', {state: {soloWord: res.data.data}});
            })
            .catch((err) => toast.error(err));
    }

    // 세트 단어 삭제 API
    const setRemoveAPI = (wsNum) => {
        axiosInstance.post('study/solo-study-remove', {
            username: username,
            wsNum: wsNum
        }).then((res) => {
            setChoiceModal(false);
            getDataAPI();
        }).catch((err) => toast.error(err));
    }

    // 데이터 조회 API
    const getDataAPI = () => {
        axiosInstance.get('study/get-set-data', {
            params: {
                username: username,
                size : dataPerPage,
                page : currentPage
            }
        })
            .then((res) => {
                console.log(res.data.data)
                setData(res.data.data.content);
                setTotalData(res.data.data.totalElements)
            })
            .catch((e) => toast.error('조회 중 오류가 발생하였습니다.'));
    }
    // 데이터 조회
    useEffect(() => {
        if (userRole === "none") {
            toast.error('로그인 후 이용해주세요.');
            navigator("/set-study")
        } else {
            getDataAPI();
        }
    }, [currentPage]);


    return (
        <div className="solo-study-container">
            <div className="solo-study-all">

                <div className="solo-study-header-sub-title">
                    <p>단어장</p>
                </div>
                <div className="solo-study-header">
                    <p>나의 단어장</p>
                </div>

                <div className="solo-study-content-all">
                    <div className="solo-study-content-add-box"
                         onClick={handleAddPage}>
                        <FaPlus size={28} color="rgb(130 129 129)"/>
                    </div>
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
                                <p>{username}</p>

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
                    <button onClick={handleListMove}>모두의 단어장으로</button>
                </div>

                {choiceModal &&
                    <div className="solo-study-modal-back-ground">
                        <div className="solo-study-modal-all">
                            <div onClick={handleStudyPage}
                                 className="solo-study-modal-move">
                                <p>단어 학습</p>
                            </div>
                            <div onClick={handleModifyPage}
                                 className="solo-study-modal-modify">
                                <p>수정하기</p>
                            </div>
                            <div onClick={handleRemove}
                                 className="solo-study-modal-remove">
                                <p>삭제하기</p>
                            </div>
                            <button onClick={() => setChoiceModal(false)}>목록으로</button>
                        </div>


                    </div>
                }

            </div>
        </div>
    )
}

export default SoloStudy;