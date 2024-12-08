import {useContext, useEffect, useState} from "react";
import "../../styles/search/SearchPage.css"
import {IoSearchOutline} from "react-icons/io5";
import {GrPowerReset} from "react-icons/gr";
import 'moment/locale/ko';
import {toast} from "react-toastify";
import {axiosInstance} from "../../api";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import Select from "react-select";
import usePagination from "../../hook/usePagination";
import PageNation from "../../component/PageNation";
import Audio from "../../component/Audio";

const Search = () => {
    const {username, userRole} = useContext(tokenInfoContext);

    // 단어검색 리스트, 검색 요청 단어
    const [wordList, setWordList] = useState([]);
    const [wordKeyword, setWordKeyword] = useState("");
    const [selectedValue, setSelectedValue] = useState("new"); // 정렬 값
    const [totalData, setTotalData] = useState(0);

    const dataPerPage = 10; // 보여줄 목록 수
    const pagesPerRange = 10; // 표시할 페이지 수


    // 검색 단어 변경 핸들러
    const keywordChange = (event) => {
        setWordKeyword(event.target.value);
    }

    // 검색된 단어 즐겨 찾기에 저장 핸들러
    const favoriteHandle = (wordNum) => {
        console.log(wordNum);
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
        getWordListAPI();
    }


    // elasticsearch로 word 데이터 요청
    /*const requestWordData = async () => {
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
*/
    // 검색 키워드 초기화 핸들러
    const wordResetHandle = () => {
        setWordKeyword("");
        getWordListAPI();
    }

    // 정렬 목록
    const selectOptions = [
        {value: "new", label: "최신순"},
        {value: "older", label: "오랜된순"},
        {value: "random", label: "랜덤"}
    ];


    // 정렬 변경 핸들러
    const changeSelect = (value) => {
        setCurrentPage(1);
        setSelectedValue(value);
    }

    // 페이지 네이션 hook 관리
    const {
        currentPage,
        totalPages,
        startPage,
        endPage,
        handlePageChange,
        setCurrentPage
    } = usePagination({
        totalItems: totalData,
        itemsPerPage: dataPerPage,
        pagesPerRange
    });

    // 단어 목록 조회 API
    const getWordListAPI = () => {
        axiosInstance.get('/mypage/word-list-search',
            {
                params: {
                    page: currentPage,
                    size: dataPerPage,
                    sort: selectedValue,
                    keyword: wordKeyword
                }
            })
            .then((res) => {
                console.log(res.data);
                setWordList(res.data.data.content);
                setTotalData(res.data.data.totalElements);
            })
            .catch(e => toast.error("조회 중 오류가 발생하였습니다."));
    }

    useEffect(() => {
        getWordListAPI();
    }, [currentPage, selectedValue]);
    return (
        <div className="search-box-all">
            <div className="search-box">

                <div className="search-box-title">
                    <div>
                        <p>단어 검색</p>
                    </div>

                </div>

                <div className="favorite-page-category-box">
                    <Select
                        className="selectItem"
                        onChange={(e) => changeSelect(e.value)}
                        options={selectOptions}
                        placeholder="정렬"
                        value={selectOptions.find(option => option.value === selectedValue)}
                    />

                    <div className="search-input-box">
                        <input type="text"
                               value={wordKeyword}
                               onChange={keywordChange}
                               onKeyDown={submitHandle}
                        />
                        <IoSearchOutline onClick={getWordListAPI} size={24}/>
                        <GrPowerReset size={20} onClick={wordResetHandle}/>
                    </div>

                </div>

                <div className="search-favorite-data">
                    {wordList.length !== 0 ?
                        wordList?.map((item, index) => (
                            <div className="search-favorite-box" key={index}>
                                <div className="search-favorite-data-top">
                                    <div className="search-favorite-data-top-content">
                                        <p onClick={() => favoriteHandle(item.wordNum)}>
                                            {item?.wordContent}{item?.wordChinese && `(${item?.wordChinese})`}
                                        </p>
                                    </div>
                                    <div className="search-favorite-data-top-audio-box">

                                        <Audio inputData={item.wordContent}/>
                                    </div>
                                </div>

                                <div className="search-favorite-data-middle">
                                    {item?.wordMeaning.split(",").map((meaning, i) => (
                                        <div key={i}>{i + 1}. {meaning}</div>
                                    ))}
                                </div>
                            </div>
                        ))
                        :
                        <div className={"search-not-word-list"}>
                            <p>검색된 결과가 없습니다.</p>
                        </div>
                    }
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
    );
}

export default Search;



