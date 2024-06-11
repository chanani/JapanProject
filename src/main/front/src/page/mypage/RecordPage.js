import {useContext, useEffect, useState} from "react";
import "../../styles/mypage/RecordPage.css";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";


const RecordPage = () => {

    const {userRole, username, accessToken, refreshToken} = useContext(tokenInfoContext);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const dataPerPage = 5;

    // 현재 페이지의 공지사항 목록 가져오기
    const indexOfLastNotice = currentPage * dataPerPage;
    const indexOfFirstNotice = indexOfLastNotice - dataPerPage;
    const currentData = data.slice(indexOfFirstNotice, indexOfLastNotice);

    // 페이지 변경 핸들러
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    // 페이지 변경 핸들러
    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };
    // 상세페이지로 이동하는 핸들러
    const handleContent = async (index) => {
        try {
            let num = data[index].record_num;
            let kind = data[index].record_kind;
            let level = data[index].record_kind;
            let point = data[index].record_point;
            const response = await axiosInstance.post('mypage/recordDetails', {username: username, record_num: num})

            const answer = response.data;
            navigate("/recordDetails", {state: {kind, level, answer, point, num}});
            window.scrollTo(0, 0);
        } catch (e) {
            toast.error("데이터 조회에 실패하였습니다. 관리자에게 문의해주세요.");
            console.error(e);
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
                    username: username
                }
            })
                .then((res) => {
                    setData(res.data);
                })
                .catch((error) => {
                    toast.error("데이터 조회에 실패하였습니다. 관리자에게 문의해주세요.");
                });
        }
    }, []);


    return (

        <div className="recordPage-page-all">
            <div className="recordPage-page-mid">

                <div className="recordPage-info">
                    {data.length === 0 ?
                        <p>학습 기록이 존재하지 않습니다.</p>
                        :
                        <p>{username}님의 기록</p>
                    }
                </div>

                {currentData.map((item, index) => (
                    <div className="recordPage-score" key={index}
                         onClick={(event) => handleContent(index + ((currentPage - 1) * dataPerPage))}>
                        <div className="score-header">
                            <div className="level">{item.record_level}단계</div>
                            <div style={{fontSize: "13px"}}>⏐</div>
                            <div>{username}</div>
                        </div>
                        <div className="score-content">
                            <div className="point">{item.record_point}점</div>
                            <div className="save-date">{moment(item.record_date).format('YYYY/MM/DD')} </div>
                        </div>

                    </div>
                ))}

                <div className="data-detail-box-all">
                    <div className="data-pageNation">
                        {currentPage === 1 ?
                            <FaArrowLeft color="gray" size={20}/>
                            :
                            <FaArrowLeft onClick={prevPage} size={20}/>
                        }
                        {currentPage * dataPerPage < data.length ?
                            <FaArrowRight onClick={nextPage} size={20}/>
                            :
                            <FaArrowRight color="gray" size={20}/>
                        }
                    </div>
                </div>
            </div>


        </div>

    );
}

export default RecordPage;