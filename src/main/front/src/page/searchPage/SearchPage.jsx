import {useContext, useEffect, useState} from "react";
import "../../styles/search/SearchPage.css"
import axios from "axios";
import {FaSearch} from "react-icons/fa";
import moment from "moment";
import 'moment/locale/ko';
import {toast} from "react-toastify";
import NoticeDetail from "../../component/NoticeDetail";

const Search = () => {
    // 검색 종류
    const [searchKind, setSearchKind] = useState("전체");
    // 키워드 저정하는 핸들러
    const kindChangeHandle = (event) => {
        setSearchKind(event.target.innerText);
        setAllKeyword("");
        setWordKeyword("");
        setNoticeKeyword("");
    }

    // 전체검색 리스트, 검색 요청 문구
    const [allKeyword, setAllKeyword] = useState("");
    // 단어검색 리스트, 검색 요청 단어
    const [wordList, setWordList] = useState([]);
    const [wordKeyword, setWordKeyword] = useState("");
    // 공지사항 검색 리스트, 공지사항 요청 단어
    const [noticeList, setNoticeList] = useState([]);
    const [noticeKeyword, setNoticeKeyword] = useState("");
    // 전체 단어 변경 핸들러
    const allKeywordChange = (event) => {
        setAllKeyword(event.target.value);
        setNoticeKeyword(event.target.value);
        setWordKeyword(event.target.value);
    }
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
        if (event.key !== 'Enter') return;
        if (searchKind === '전체') requestAllData();
        else if (searchKind === '단어') {
            requestWordData();
            setNoticeList([]);
        } else if (searchKind === '공지사항') {
            requestNoticeData();
            setWordList([]);
        }
    }
    // 공지사항, 단어 모두 검색하는 핸들러 당장 사용하지 않을 예정
    const doubleRequest = async () => {
        await axios.get(`${process.env.REACT_APP_URL_ELASTICSEARCH}notice,word/_search`, {
            params: {
                size: 1000,
                q: `word_meaning:${allKeyword} OR word_content:${allKeyword} OR notice_title:${allKeyword} OR notice_content:${allKeyword}`
            },
            auth: {
                username: 'elastic',
                password: 'thejapan'
            }
        })
            .then((res) => {
                console.log(res);
            })
    }
    // elasticsearch로 all 데이터 요청
    const requestAllData = () => {
        if (!!!allKeyword) return toast.error("검색어를 입력해주세요.");
        requestWordData();
        requestNoticeData();
    }
    // elasticsearch로 word 데이터 요청
    const requestWordData = async () => {
        if (!!!wordKeyword) return toast.error("검색어를 입력해주세요.");
        await axios.get(`${process.env.REACT_APP_URL_ELASTICSEARCH}word/_search`, {
            params: {
                size: 1000,
                q: `word_meaning:${wordKeyword} OR word_content:${wordKeyword}`
            },
            auth: {
                username: 'elastic',
                password: 'thejapan'
            }
        })
            .then((res) => {
                setWordList(res.data.hits.hits);
            })
            .catch((e) => {
                toast.error("검색 중 오류가 발생하였습니다. 관리자에게 문의해주세요.");
            })
    }
    // elasticsearch로 notice 데이터 요청
    const requestNoticeData = async () => {
        if (!!!noticeKeyword) return toast.error("검색어를 입력해주세요.");
        await axios.get(`${process.env.REACT_APP_URL_ELASTICSEARCH}notice/_search`, {
            params: {
                size: 1000,
                q: `notice_title:${noticeKeyword} OR notice_content:${noticeKeyword}`
            },
            auth: {
                username: 'elastic',
                password: 'thejapan'
            }
        })
            .then((res) => {
                setNoticeList(res.data.hits.hits);
            })
            .catch((e) => toast.error("검색 중 오류가 발생하였습니다. 관리자에게 문의해주세요."))
    }
    // elasticsearch server로 호출 테스트
    const testBtn = async () => {
        await axios.get(`${process.env.REACT_APP_URL_ELASTICSEARCH}univ/_search`, {
            params: {
                size: 1000,
            },
            auth: {
                username: 'elastic',
                password: 'thejapan'
            }
        })
            .then((res) => {
                console.log(res.data)
            })
            .catch((e) => toast.error("검색 중 오류가 발생하였습니다. 관리자에게 문의해주세요."))
    }

    return (
        <div className="search-box-all">
            <input type="button" onClick={testBtn} value="asd" style={{display: "none"}}/>
            <div className="search-box">

                <div className="search-all-box">
                    <div className="search-all-border">
                        <input type="text" value={allKeyword} onChange={allKeywordChange} onKeyDown={submitHandle}
                               disabled={searchKind !== "전체"}/>
                        <FaSearch onClick={requestAllData} size={23}/>
                    </div>
                </div>

                <div className="search-header-center">
                    <div className="search-header-box">
                        <div onClick={kindChangeHandle}
                             className={(searchKind === "전체" ? ' search-header-box-check' : "")}>전체
                        </div>
                        <div onClick={kindChangeHandle}
                             className={(searchKind === "단어" ? ' search-header-box-check' : "")}>단어
                        </div>
                        <div onClick={kindChangeHandle}
                             className={(searchKind === "공지사항" ? ' search-header-box-check' : "")}>공지사항
                        </div>
                    </div>
                </div>

                {searchKind === "전체" ?
                    <div className="search-mainAll-box">

                        <WordComponent
                            wordKeyword={wordKeyword}
                            keywordChange={keywordChange}
                            submitHandle={submitHandle}
                            requestWordData={requestWordData}
                            wordList={wordList}
                            searchKind={searchKind}
                        />
                        <NoticeComponent
                            noticeKeyword={noticeKeyword}
                            noticeKeywordChange={noticeKeywordChange}
                            submitHandle={submitHandle}
                            requestNoticeData={requestNoticeData}
                            noticeList={noticeList}
                            searchKind={searchKind}
                        />
                    </div>
                    :
                    searchKind === "단어" ?
                        <WordComponent
                            wordKeyword={wordKeyword}
                            keywordChange={keywordChange}
                            submitHandle={submitHandle}
                            requestWordData={requestWordData}
                            wordList={wordList}
                            searchKind={searchKind}
                        />
                        : searchKind === "공지사항" &&
                        <NoticeComponent
                            noticeKeyword={noticeKeyword}
                            noticeKeywordChange={noticeKeywordChange}
                            submitHandle={submitHandle}
                            requestNoticeData={requestNoticeData}
                            noticeList={noticeList}
                            searchKind={searchKind}
                        />
                }

            </div>

        </div>
    );
}

export default Search;


const WordComponent = ({wordKeyword, keywordChange, submitHandle, requestWordData, wordList, searchKind}) => {
    return (
        <div style={{marginBottom: "15px"}}>
            {searchKind === "전체" ?
                <div>
                    <div className="search-box-mainPage-title">
                        <p>단어 검색({wordList.length})</p>
                    </div>

                    <div className="search-content-box">
                        {!!!wordList.length ?
                            <div className="search-notice-content-box">
                                <p>검색된 항목이 없습니다.</p>
                            </div> :
                            wordList.slice(0, 6).map((item, index) => (
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
                :
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
            }

        </div>
    )
}

const NoticeComponent = ({
                             noticeKeyword,
                             noticeKeywordChange,
                             submitHandle,
                             requestNoticeData,
                             noticeList,
                             searchKind
                         }) => {
    const [detailToggle, setDetailToggle] = useState(false);
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
        setDetailIndex(index);
        setDetailToggle((current) => !current);
    }

    // 상세 공지사항 닫기 핸들러
    const handleDetailOut = () => {
        setDetailToggle((current) => !current);
    }

    return (
        <div style={{marginBottom: "15px"}}>
            {searchKind === "전체" ?
                <div>
                    <div className="search-box-mainPage-title">
                        <p>공지사항 검색({noticeList.length})</p>
                    </div>

                    <div className="search-notice-content-box">
                        {!!!noticeList.length ? <p>검색된 항목이 없습니다.</p> :
                            noticeList.slice(0, 4).map((item, index) => (
                                <div className="user-notice-content-box" key={index}
                                     onClick={(e) => handleDetail({index})}>
                                    <p className="content-box-p-tag">
                                        {truncate(item._source.notice_title, 14)}
                                        {isWithinOneDay(item._source.notice_regdate)}
                                    </p>
                                    <p>{moment(item._source.notice_regdate).format('YYYY/MM/DD')}</p>
                                </div>
                            ))
                        }
                    </div>

                    {detailToggle &&
                        <NoticeDetail
                            setDetailToggle={setDetailToggle}
                            detailIndex={detailIndex}
                            notice={noticeList[detailIndex]._source}
                            handleDetailOut={handleDetailOut}
                            kind="searchPage"
                        />
                    }

                </div>
                :
                <div>
                    <div className="search-box-title">
                        <p>공지사항 검색</p>

                        <div className="search-input-box">
                            <input type="text" value={noticeKeyword} onChange={noticeKeywordChange}
                                   onKeyDown={submitHandle}/>
                            <FaSearch onClick={requestNoticeData}/>
                        </div>
                    </div>

                    <div className="search-notice-content-box">
                        {!!!noticeList.length ? <p>검색된 항목이 없습니다.</p> :
                            noticeList.map((item, index) => (
                                <div className="user-notice-content-box" key={index}
                                     onClick={(e) => handleDetail({index})}>
                                    <p className="content-box-p-tag">
                                        {truncate(item._source.notice_title, 14)}
                                        {isWithinOneDay(item._source.notice_regdate)}
                                    </p>
                                    <p>{moment(item._source.notice_regdate).format('YYYY/MM/DD')}</p>
                                </div>
                            ))
                        }
                    </div>

                    { detailToggle &&
                        <NoticeDetail
                            setDetailToggle={setDetailToggle}
                            notice={noticeList[detailIndex]._source}
                            handleDetailOut={handleDetailOut}
                            kind="searchPage"
                        />
                    }
                </div>
            }

        </div>
    )
}

