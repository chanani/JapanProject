import { useContext, useEffect, useState } from "react";
import "../../styles/search/SearchPage.css"
import { tokenInfoContext } from "../../component/TokenInfoProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import moment from "moment";
import 'moment/locale/ko';
import { IoCloseOutline } from "react-icons/io5";

const Search = () => {
  const {userRole} = useContext(tokenInfoContext);
  const navigate = useNavigate();
  useEffect(() =>{
    if(userRole === "none"){
      alert("로그인 후 이용해주세요.");
      navigate("/login");
    }
  });

  // 검색 종류
  const [searchKind, setSearchKind] = useState("");

  const kindChangeHandle = (event) => {
    setSearchKind(event.target.innerText);
  }

  // 단어검색 리스트, 검색 요청 단어
  const [wordList, setWordList] = useState([]);
  const [wordKeyword, setWordKeyword] = useState("");

  // 공지사항 검색 리스트, 공지사항 요청 단어
  const [noticeList, setNoticeList] = useState([]);
  const [noticeKeyword, setNoticeKeyword] = useState("");

  // 검색 단어 변경 핸들러
  const keywordChange = (event) => {
    setWordKeyword(event.target.value);
  }

  // 검색 공지사항 변경 핸들러
  const noticeKeywordChange = (event) => {
    setNoticeKeyword(event.target.value);
  }

  // 검색 버튼 핸들러
  const submitHandle = (event) => {
    if(event.key !== 'Enter') return;
    if(searchKind === '단어') requestWordData();
    else if(searchKind === '공지사항') requestNoticeData();
  }

  // elasticsearch로 word 데이터 요청
  const requestWordData = () => {
    if(!!!wordKeyword) return alert("검색어를 입력해주세요.");
    axios.get('http://localhost:9200/word/_search', {
      params: {
        size: 1000,
        q: `word_meaning:${wordKeyword} OR word_content:${wordKeyword}`
      }
    })
    .then((res) => {
      setWordList(res.data.hits.hits);
      setWordKeyword("");
    })
    .catch((e) => {
      alert("검색 중 오류가 발생하였습니다. 관리자에게 문의해주세요.");
    })
  }

  // elasticsearch로 notice 데이터 요청
  const requestNoticeData = () => {
    if(!!!noticeKeyword) return alert("검색어를 입력해주세요.");
    axios.get('http://localhost:9200/notice/_search', {
      params: {
        size: 1000,
        q: `notice_title:${noticeKeyword} OR notice_content:${noticeKeyword}`
      }
    })
    .then((res) => {
      setNoticeList(res.data.hits.hits);
      setNoticeKeyword("");
    })
    .catch((e) => {
      alert("검색 중 오류가 발생하였습니다. 관리자에게 문의해주세요.");
    })
  }

  return (
    <div className="search-box-all">
      <div className="search-box">
        <div className="search-header-box">
          <div onClick={kindChangeHandle}>단어</div>
          <div onClick={kindChangeHandle}>공지사항</div>
        </div>

        {!!!searchKind ? 
          <div className="kind-not-check">
            <p>상단의 버튼을 클릭해주세요.</p>
          </div>
        : 
        searchKind === "단어" ? 
        <WordComponent 
        wordKeyword={wordKeyword} 
        keywordChange={keywordChange} 
        submitHandle={submitHandle} 
        requestWordData={requestWordData} 
        wordList={wordList}
        /> 
        : searchKind === "공지사항" &&  
        <NoticeComponent 
        noticeKeyword={noticeKeyword} 
        noticeKeywordChange={noticeKeywordChange} 
        submitHandle={submitHandle} 
        requestNoticeData={requestNoticeData} 
        noticeList={noticeList}
        /> 
      }
        
      </div>
      
    </div>
  );
}

export default Search;

const WordComponent = ({wordKeyword, keywordChange, submitHandle, requestWordData, wordList}) => {
  return (
     <div>
        <div className="search-box-title">
          <p>단어 검색</p>

          <div className="search-input-box">
            <input type="text" value={wordKeyword} onChange={keywordChange} onKeyDown={submitHandle}/>
            <FaSearch onClick={requestWordData}/>
          </div>
        </div>

        <div className="search-content-box">
          {!!!wordList.length ? 
            <div className="search-notice-content-box">
              <p>검색된 항목이 없습니다.</p>
            </div> : 
              wordList.map((item, index) => (
                <div className="search-word-all" key={index}>
                  <div className="search-word-box">
                    <div className="search-word-content"><h3>{item._source.word_content}</h3></div>
                    <div className="search-word-meaning"><p>{item._source.word_meaning}</p></div>
                  </div>
                </div>
              ))
            }
        </div>
      </div> 
  )
}

const NoticeComponent = ({noticeKeyword, noticeKeywordChange, submitHandle, requestNoticeData, noticeList}) => {
  const [detail, setDetail] = useState(false);
  const [detailIndex, setDetailIndex] = useState(0); 

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
  const handleDetail = ({index}) => {
    console.log(index)
    setDetailIndex(index);
    console.log(noticeList[0]._source)
    setDetail((current) => !current);
  }

  // 상세 공지사항 닫기 핸들러
  const handleDetailOut = () => {
    setDetail((current) => !current);
  }

  return (
    <div>
       <div className="search-box-title">
         <p>공지사항 검색</p>

         <div className="search-input-box">
           <input type="text" value={noticeKeyword} onChange={noticeKeywordChange} onKeyDown={submitHandle}/>
           <FaSearch onClick={requestNoticeData}/>
         </div>
       </div>

       <div className="search-notice-content-box">
         {!!!noticeList.length ? <p>검색된 항목이 없습니다.</p> : 
             noticeList.map((item, index) => (
              <div className="user-notice-content-box" key={index} onClick={(e) => handleDetail({index})}>
                <p className="content-box-p-tag">
                  {truncate(item._source.notice_title,14)}
                  {isWithinOneDay(item._source.notice_regdate)}
                </p>
                <p>{moment(item._source.notice_regdate).format('YYYY/MM/DD')}</p>
            </div>
            ))
           }
       </div>

       {!detail ? "" : 
       <div className="notice-detail-box-all">
          <div className="notice-detail-box">
            <div className="notice-detail-title">
              <p>제목 : </p>
              <div>{noticeList[detailIndex]._source.notice_title}</div>
              
            </div>
            
            <div className="notice-detail-content">
              <p>내용 : </p>
              <textarea defaultValue={noticeList[detailIndex]._source.notice_content} readOnly></textarea>
            </div>
            <div className="notice-detail-out">
            <IoCloseOutline size={25} onClick={handleDetailOut}/>
            </div>
          </div>
        </div>
        }
     </div> 
 )
}

