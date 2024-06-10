import "../../styles/inquiry/Inquiry.css";
import {useEffect, useState} from "react";
import {FaArrowLeft, FaArrowRight, FaLock} from "react-icons/fa";
import {FaLockOpen} from "react-icons/fa";
import {GrPowerReset} from "react-icons/gr";
import {useNavigate} from "react-router-dom";
import {axiosInstance} from "../../api";
import moment from "moment";
import CheckPassword from "../../component/CheckPassword";
import {toast} from "react-toastify";
import {IoIosSearch} from "react-icons/io";

const Inquiry = () => {

    const navigator = useNavigate();
    // 문의사항 목록
    const [data, setData] = useState([]);
    // 비밀번호 확인 컴포넌트 활성화/비활성화
    const [checkPassword, setCheckPassword] = useState(false);
    const [nowNumber, setNowNumber] = useState(0);
    // 페이지 네이션 관련 state
    const [currentPage, setCurrentPage] = useState(1);
    const InquiryPerPage = 5;
    const indexOfLastNotice = currentPage * InquiryPerPage;
    const indexOfFirstNotice = indexOfLastNotice - InquiryPerPage;
    const currentNotices = data.slice(indexOfFirstNotice, indexOfLastNotice);

    // 검색 단어 State
    const [word, setWord] = useState("");
    // 작성자 이름 처리 함수
    const formatWriterName = (name) => {
        if (name.length > 3) {
            return `${name[0]}**..`;
        } else {
            return `${name[0]}${'**'.repeat(name.length - 2)}`;
        }
    };
    // 글쓰기 페이지로 이동
    const writeHandle = () => {
        navigator("/inquiryWrite");
        window.scrollTo(0, 0);
    }
    // 목록 조회 API
    const getListAPI = () => {
        axiosInstance.get(`inquiry/getList`)
            .then((res) => {
                setData(res.data);
            })
    }
    // 비밀번호 모달 on 핸들러
    const CheckPasswordHandle = (event) => {
        setNowNumber(event.target.id);
        setCheckPassword((prev) => !prev);
    }
    // 검색 핸들러
    const searchHandle = () => {
        if (!word) toast.error('검색하실 문구를 입력해주세요.');
        searchAPI();
    }
    const keyDownHandle = (event) => {
        if(event.key !== 'Enter') return;
        searchAPI();
    }
    // 검색 요청 API
    const searchAPI = () => {
        axiosInstance.get('inquiry/searchInquiry', {
            params: {
                word: word
            }
        })
            .then((res) => {
                if (res.data === 'NOT_FOUND') return toast.error('일치하는 게시글이 존재하지 않습니다.');
                setData(res.data);
            })
    }
    // 검색 초기화 핸들러
    const resetHandle = () => {
        setWord("");
        getListAPI();
    }
    // 페이지 변경 핸들러
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    // 페이지 변경 핸들러
    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };


    // 목록 불러오기
    useEffect(() => {
        getListAPI();
    }, []);


    return (
        <div className="inquiry-container">
            <div className="inquiry-box">

                <div className="inquiry-title-box">
                    <h2>문의하기</h2>
                </div>

                <div className="inquiry-content-box">

                    <div className="inquiry-content-title">
                        <p style={{width: "7%"}}>번호</p>
                        <p style={{width: "12%"}}>답변</p>
                        <p style={{width: "48%"}}>제목</p>
                        <p style={{width: "13%"}}>글쓴이</p>
                        <p style={{width: "20%"}}>등록일</p>
                    </div>

                    <div className="inquiry-content-detail">
                        {data.length === 0 ?
                            <div className="inquiry-notData-box">
                                <p>목록이 없습니다.</p>
                            </div>
                            :
                            <div className="inquiry-inData-box">
                                {currentNotices.map((item, index) => (
                                    item.inquiry_state === 'y' &&
                                    <div className="inquiry-data-box" key={index}>
                                        <p style={{width: "7%", textAlign: "center"}}
                                           className="inquiry_num">{item.inquiry_num}</p>

                                        {item.inquiry_comment ?
                                            <p style={{width: "12%", textAlign: "center"}}
                                               className='inquiry-comment inquiry-comment-y'>답변완료</p>
                                            :
                                            <p style={{width: "12%", textAlign: "center"}}
                                               className='inquiry-comment inquiry-comment-n'>미완료</p>

                                        }
                                        <p
                                            className="inquiry_title"
                                            onClick={CheckPasswordHandle}
                                            id={item.inquiry_num}
                                        >
                                            {item.inquiry_secret === 'y' ? <FaLock/> : <FaLockOpen/>}
                                            {item.inquiry_title}

                                        </p>
                                        <p style={{textAlign: "center"}}
                                           className="inquiry_writer">{formatWriterName(item.inquiry_writer)}</p>
                                        <p style={{width: "20%", textAlign: "center"}}
                                           className="inquiry_regdate">{moment(item.inquiry_regdate).format('YY/MM/DD')}</p>
                                    </div>
                                ))}
                            </div>
                        }
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

                        <div className="inquiry-button-box">
                            <button onClick={writeHandle}>글쓰기</button>
                        </div>
                    </div>

                    {checkPassword && <CheckPassword
                        setCheckPassword={setCheckPassword}
                        nowNumber={nowNumber}
                    />}
                </div>
                <div className="inquiry-pageNation">
                    {currentPage === 1 ?
                        <FaArrowLeft color="gray" size={20}/>
                        :
                        <FaArrowLeft onClick={prevPage} size={20}/>
                    }
                    {currentPage * InquiryPerPage < data.length ?
                        <FaArrowRight onClick={nextPage} size={20}/>
                        :
                        <FaArrowRight color="gray" size={20}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Inquiry;