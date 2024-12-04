import {useContext, useEffect, useState} from "react";
import "../../styles/search/SearchPage.css"
import axios from "axios";
import {FaSearch} from "react-icons/fa";
import 'moment/locale/ko';
import {toast} from "react-toastify";
import {axiosInstance} from "../../api";
import {tokenInfoContext} from "../../component/TokenInfoProvider";

const Search = () => {
    const {username, userRole} = useContext(tokenInfoContext);

    // 단어검색 리스트, 검색 요청 단어
    const [wordList, setWordList] = useState([]);
    const [wordKeyword, setWordKeyword] = useState("");

    // 검색 단어 변경 핸들러
    const keywordChange = (event) => {
        setWordKeyword(event.target.value);
    }

    // 검색된 단어 즐겨 찾기에 저장 핸들러
    const favoriteHandle = (wordNum) => {
        if (userRole === 'none') return toast.error("로그인 후 이용해주세요.");
        if (!window.confirm('즐겨찾기에 추가하시겠습니까?')) return;
        axiosInstance.post('mypage/search-register-word', {
            username: username,
            wordNum: wordNum
        })
            .then((res) => {
                if (res.status !== 200) return toast.error('이미 추가된 단어입니다.');
                toast.success('즐겨찾기에 추가되었습니다.');
            })
            .catch((e) => toast.error('즐겨찾기 추가 중 오류가 발생하였습니다.'))
    }

    // 검색 버튼 핸들러
    const submitHandle = (event) => {
        if (event.key !== 'Enter') return;
        requestWordData();
    }


    // elasticsearch로 word 데이터 요청
    const requestWordData = async () => {
        if (!!!wordKeyword) return toast.error("검색어를 입력해주세요.");
        await axios.get(`${process.env.REACT_APP_URL_ELASTICSEARCH}word/_search`, {
            params: {
                size: 10000,
                q: `word_meaning:${wordKeyword} OR word_content:${wordKeyword} OR word_chinese:${wordKeyword}`
            },
            auth: {
                username: 'elastic',
                password: 'thejapan'
            }
        })
            .then((res) => {
                console.log(res.data.hits.hits);
                setWordList(res.data.hits.hits);
            })
            .catch((e) => {
                toast.error("검색 중 오류가 발생하였습니다. 관리자에게 문의해주세요.");
            })
    }


    return (
        <div className="search-box-all">
            <div className="search-box">

                <div className="search-header-center">
                </div>
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
                            <div className="search-word-all" key={index}
                                 onClick={() => favoriteHandle(item._id)}>
                                <div className="search-word-box">
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



