import "../../styles/inquiry/Inquiry.css";
import {useEffect, useState} from "react";
import {FaLock, FaSearch} from "react-icons/fa";
import {FaLockOpen} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {axiosInstance} from "../../api";
import moment from "moment";
import CheckPassword from "../../component/CheckPassword";

const Inquiry = () => {

    // 문의사항 목록
    const [data, setData] = useState([]);
    const [checkPassword, setCheckPassword] = useState(false);
    const [nowNumber, setNowNumber] = useState(0);
    const navigator = useNavigate();
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
    // 비밀번호 모달 핸들러
    const CheckPasswordHandle = (event) => {

        setNowNumber(event.target.id);
        setCheckPassword((prev) => !prev);
    }

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
                        <p style={{width: "10%"}}>답변</p>
                        <p style={{width: "50%"}}>제목</p>
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
                                {data.map((item, index) => (
                                    item.inquiry_state === 'y' &&
                                    <div className="inquiry-data-box" key={index}>
                                        <p style={{width: "7%", textAlign: "center"}}
                                           className="inquiry_num">{item.inquiry_num}</p>
                                        <p style={{width: "10%", textAlign: "center"}}
                                           className="inquiry_kind">
                                            {item.inquiry_comment !== null ?
                                                <span>답변완료</span> : <span>미완료</span>}
                                        </p>
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
                            <input type="text"/>
                            <FaSearch size={18}/>
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
            </div>
        </div>
    )
}

export default Inquiry;