import { useContext, useEffect, useState } from "react";
import "../../styles/search/SearchPage.css"
import { tokenInfoContext } from "../../component/TokenInfoProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const Search = () => {
  const {userRole} = useContext(tokenInfoContext);
  const navigate = useNavigate();
  useEffect(() =>{
    if(userRole === "none"){
      alert("로그인 후 이용해주세요.");
      navigate("/login");
    }
  });
  const [wordList, setWordList] = useState([]);
  const [keyword, setKeyword] = useState("");

  const keywordChange = (event) => {
    setKeyword(event.target.value);
  }

  const submitHandle = (event) => {
    if(event.key !== 'Enter') return;
    responseData()
  }

  // elasticsearch로 데이터 요청
  const responseData = () => {
    if(!!!keyword) return alert("검색어를 입력해주세요.");
    axios.get('http://localhost:9200/word/_search', {
      params: {
        size: 1000,
        q: `word_meaning:${keyword} OR word_content:${keyword}`
      }
    })
    .then((res) => {
      console.log(res.data.hits.hits);
      setWordList(res.data.hits.hits);
      setKeyword("");
    })
  }

  return (
    <div className="search-box-all">
      <div className="search-box">
        <div className="search-box-title">
          <p>단어검색</p>

          <div className="search-input-box">
            <input type="text" value={keyword} onChange={keywordChange} onKeyDown={submitHandle}/>
            <FaSearch onClick={responseData}/>
          </div>
        </div>

        

        <div className="search-content-box">
          {!!!wordList.length ? <p>검색된 항목이 없습니다.</p> : 
              wordList.map((item, index) => (
                <div className="search-word-all" key={index}>
                  <div className="search-word-box">
                  {/* <div className="favorite-data-star">
                    <FaStar size={13} onClick={() => handleFavorite(index)}/>
                  </div> */}
                  
                  <div className="search-word-content"><h3>{item._source.word_content}</h3></div>
                  <div className="search-word-meaning"><p>{item._source.word_meaning}</p></div>
                  </div>
                </div>
              ))
            }
        </div>
      </div>
      
    </div>
  );
}

export default Search;