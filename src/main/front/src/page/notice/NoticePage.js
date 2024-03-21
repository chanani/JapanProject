import { useEffect, useState } from "react";
import "../../styles/notice/NoticePage.css";
import axios from "axios";
import moment from "moment";
import 'moment/locale/ko';
import { TbCircleLetterN } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { tokenInfoContext } from "../../component/TokenInfoProvider";
import { useContext } from "react";

const NoticePage = () => {
  const { userRole, username } = useContext(tokenInfoContext);
  const[notice, setNotice] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [detail, setDetail] = useState(false);
  const noticesPerPage = 5;
  const [detailIndex, setDetailIndex] = useState(1); 

  // 현재 페이지의 공지사항 목록 가져오기
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = notice.slice(indexOfFirstNotice, indexOfLastNotice);

  // 페이지 변경 핸들러
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  // 페이지 변경 핸들러
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // 공지사항 불러오기
  useEffect(() => {
    axios({
      url : '/notice/getList',
      method : 'GET'
    })
    .then((res) => {
      console.log(res.data);
      setNotice(res.data);
    })
  },[])
  // 제목 글자 초과할 경우 ...으로 변경
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  // 날짜가 오늘로부터 1일 이내인지 확인하는 함수
  const isWithinOneDay = (date) => {
    const oneDayAgo = moment().subtract(1, 'day');
    return moment(date).isAfter(oneDayAgo);
  };
  // 상세 공지사항 핸들러
  const handleDetail = (index) => {
    let realIndex = (currentPage - 1 )* noticesPerPage + index;
    setDetailIndex(realIndex);
    console.log(notice[realIndex]);
    setDetail((current) => !current);
    if(username !== null){
      axios({
        url : `/notice/noticeCheck/${notice[realIndex].notice_num}/${username}`,
        method : "GET",
      })
      .catch((e) => alert('조회가 정상적으로 이루어지지 않았습니다. 관리자에게 문의해주세요.'));
    }
   
  }
  // 상세 공지사항 닫기 핸들러
  const handleDetailOut = () => {
    setDetail((current) => !current);
  }
  

  return (
    <div className="user-notice-box-all">
      <div className="user-notice-box">

        <div className="user-notice-title-box">
          <p>The Japen 공지사항</p>
        </div>
        {currentNotices.map((item, index) => (
          <div className="user-notice-content-box" key={index} onClick={(e) => handleDetail(index)}>
            <p className="content-box-p-tag">
              {isWithinOneDay(item.notice_regdate) && <TbCircleLetterN color="red"/>}
              {truncate(item.notice_title,14)}
            </p>
            <p>{moment(item.notice_regdate).format('YYYY/MM/DD')}</p>
        </div>
        ))}
        <div className="notice-pageNation">
          {currentPage === 1 ? 
          <FaArrowLeft color="gray" size={20}/>
           :
          <FaArrowLeft onClick={prevPage} size={20}/>
          }
           {currentPage * noticesPerPage < notice.length ? 
           <FaArrowRight onClick={nextPage} size={20}/>
           :
           <FaArrowRight color="gray" size={20} />
          }
        </div>
      </div>
        
      {detail ? 
      <div className="notice-detail-box">

        <div className="notice-detail-title">
          <p>제목 : </p>
          <div>{notice[detailIndex].notice_title}</div>
          
        </div>
        
        <div className="notice-detail-content">
          <p>내용 : </p>
          <textarea defaultValue={notice[detailIndex].notice_content} readOnly></textarea>
        </div>
        <div className="notice-detail-out">
        <IoCloseOutline size={25} onClick={handleDetailOut}/>
        </div>
      </div>
      :
      ""
      }
      
    </div>
  )
}

export default NoticePage;