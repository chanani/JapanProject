import "../../styles/inquiry/InquiryWrite.css";
import {useEffect, useState} from "react";
import {FaLock} from "react-icons/fa";
import {FaLockOpen} from "react-icons/fa";
import {GrPowerReset} from "react-icons/gr";
import {useNavigate} from "react-router-dom";
import {axiosInstance} from "../../api";
import moment from "moment";
import {toast} from "react-toastify";
import {IoIosSearch} from "react-icons/io";
import usePagination from "../../hook/usePagination";
import PageNation from "../../component/PageNation";

const AddInquiryComment = () => {

    const navigator = useNavigate();
    // 문의사항 목록
    const [data, setData] = useState([]);
    const [totalData, setTotalData] = useState(0);

    // 페이지 네이션 관련 state
    const inquiryPerPage = 5; // 보여줄 목록 수
    const pagesPerRange = 5; // 표시할 페이지 수

    // 페이지 네이션 hook 관리
    const {
        currentPage,
        totalPages,
        startPage,
        endPage,
        handlePageChange
    } = usePagination({
        totalItems: totalData,
        itemsPerPage: inquiryPerPage,
        pagesPerRange
    });


    // 검색 단어 State
    const [word, setWord] = useState("");

    // comment 입력 페이지로 이동
    const writeHandle = (inquiryNum) => {
        navigator(`/AddInquiryCommentWrite?inquiryNum=${inquiryNum}`);
        window.scrollTo(0, 0);
    }
    // 목록 조회 API
    const getListAPI = () => {
        axiosInstance.get(`inquiry/getList`,{
            params: {
                page: currentPage,
                size: inquiryPerPage,
                keyword: word
            }
        })
            .then((res) => {
                setData(res.data.data.content);
                setTotalData(res.data.data.totalElements);
            })
            .catch(e => toast.error('목록 조회를 실패하였습니다.'));
    }

    // 검색 핸들러
    const searchHandle = () => {
        if (!word) toast.error('검색하실 문구를 입력해주세요.');
        handlePageChange(1);
        getListAPI();
    }
    // 검색 엔터 핸들러
    const keyDownHandle = (event) => {
        if (event.key !== 'Enter') return;
        handlePageChange(1);
        getListAPI();
    }

    // 검색 초기화 핸들러
    const resetHandle = () => {
        setWord("");
        getListAPI();
    }



    // 목록 불러오기
    useEffect(() => {
        getListAPI();
    }, [currentPage]);

    return (
        <div className="inquiry-container">
            <div className="inquiry-box">

                <div className="inquiry-title-box">
                    <p>문의하기</p>
                </div>

                <div className="inquiry-content-box">
                    <div className="inquiry-content-detail">
                        {data?.length === 0 ?
                            <div className="inquiry-notData-box">
                                <p>목록이 없습니다.</p>
                            </div>
                            :
                            <div className="inquiry-inData-box">
                                {data?.map((item, index) => (
                                    <div className="inquiry-data-box" key={index} onClick={() => writeHandle(item.inquiryNum)}>
                                        <div className="inquiry-content-high-box">
                                            {item.inquiryComment ?
                                                <p style={{width: "65px", textAlign: "center"}}
                                                   className='inquiry-comment inquiry-comment-y'>답변완료</p>
                                                :
                                                <p style={{width: "65px", textAlign: "center"}}
                                                   className='inquiry-comment inquiry-comment-n'>미완료</p>

                                            }
                                            <p
                                                className="inquiry_title"
                                                id={item.inquiryNum}
                                            >
                                                {item.inquirySecret === 'y' ? <FaLock/> : <FaLockOpen/>}
                                                {item.inquiryTitle}

                                            </p>
                                        </div>
                                        <div className="inquiry-content-row-box">
                                            <p className="inquiry_regdate">{moment(item.inquiryRegdate).format('YYYY. MM. DD')}</p>
                                            <p className="inquiry_writer">{item.inquiryWriter}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                        <hr style={{border: "-0.5px solid #777"}}/>
                    </div>

                    <div className="inquiry-search-button-box">
                        <div className="inquiry-search-box">
                            <input type="text"
                                   value={word}
                                   onChange={(e) => setWord(e.target.value)}
                                   onKeyDown={keyDownHandle}
                            />
                            <IoIosSearch size={25} onClick={searchHandle}/>
                            <GrPowerReset size={20} onClick={resetHandle}/>

                        </div>

                    </div>


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
            </div>
        </div>
    )
}

export default AddInquiryComment;