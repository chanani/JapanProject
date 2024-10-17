import "../../styles/study/SoloAdd.css"
import {IoMdArrowDropright} from "react-icons/io";
import {useContext, useEffect, useRef, useState} from "react";
import {FaRegTrashAlt} from "react-icons/fa";
import {IoSearch} from "react-icons/io5";
import {useLocation, useNavigate} from "react-router-dom";
import {IoIosCloseCircleOutline} from "react-icons/io";
import {FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp} from "react-icons/fa";
import {toast} from "react-toastify";
import {axiosInstance} from "../../api";
import PageNation from "../../component/PageNation";
import usePagination from "../../hook/usePagination";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import { GrPowerReset } from "react-icons/gr";
import {debounce} from "lodash";


const SoloAdd = () => {
    const navigator = useNavigate();
    const location = useLocation();
    const {username} = useContext(tokenInfoContext);
    const {soloWord} = location.state || {}; // 넘겨받은 데이터
    const [pageState, setPageState] = useState("add");
    const [wsNum, setWsNum] = useState(0);
    const [title, setTitle] = useState(""); // 제목
    const [data, setData] = useState([]); // 단어 목록
    const [searchWordOn, setSearchWordOn] = useState(false); // 검색 모달 활성화 여부
    const titleInputRef = useRef(null); // 제목 입력 안했을 경우 focus

    // 제목 변경 핸들러
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    // 내용 변경 핸들러
    const handleDataChange = (event, index) => {
        const {name, value} = event.target;
        const newData = [...data];
        newData[index] = {...newData[index], [name]: value};
        setData(newData);
    }

    // 단어 목록 추가 핸들러
    const handleAddWord = () => {
        setData(prevList => [...prevList, {
            wordContent: '',
            wordMeaning: '',
            wordChinese: '',
        }]);
    }


    // 단어 목록 삭제 핸들러
    const handleRemoveWord = (index) => {
        const newData = [...data];
        newData.splice(index, 1); // 해당 인덱스의 아이템 제거
        setData(newData);
    }

    // 목록으로 핸들러
    const handleBack = () => {
        navigator("/solo-study");
    }
    // 등록하기 API
    const addAPI = () => {
        axiosInstance.post('study/solo-study-register',
            {
                username: username,
                wordList: data,
                setTitle: title
            })
            .then((res) => {
                navigator("/solo-study");
                toast.success('단어 세트가 생성되었습니다.')
            })
            .catch((e) => toast.error('등록 중 오류가 발생하였습니다.'));
    }
    // 수정하기 API
    const modifyAPI = () => {
        axiosInstance.post('study/solo-study-modify',
            {
                wsNum: wsNum,
                username: username,
                wordList: data,
                setTitle: title
            })
            .then((res) => {
                navigator("/solo-study");
                toast.success('단어 세트가 생성되었습니다.')
            })
            .catch((e) => toast.error('등록 중 오류가 발생하였습니다.'));
    }

    // 등록하기 핸들러
    const handleSubmit = () => {
        if (title === '') {
            if (title === '') {
                toast.error('제목을 입력해주세요.');
                titleInputRef.current.focus(); // 포커스 주기
                return;
            }
        }
        if (data.length === 0) return toast.error('단어를 추가해주세요.');
        // 단어 목록의 각 항목이 유효한지 확인
        for (let i = 0; i < data.length; i++) {
            if (data[i].wordContent.trim() === '' || data[i].wordMeaning.trim() === '') {
                toast.error(`단어와 뜻은 모두 입력해야 합니다. 항목 ${i + 1}을 확인하세요.`);
                return;
            }
        }
        if (pageState === 'add') addAPI();
        if (pageState === 'modify') modifyAPI();
    }

    // 단어 검색 모달 토큰 핸들러
    const handleSearchWord = () => {
        setSearchWordOn((current) => !current);
    }

    // 수정 페이지로 진입 시 데이터 저장
    useEffect(() => {
        if (soloWord) {
            setData(soloWord.wordList)
            setTitle(soloWord.wsTitle)
            setPageState("modify")
            setWsNum(soloWord.wsNum);
        }
    }, [soloWord]);


    // modal에서 사용하는 state
    const [wordSort, setWordSort] = useState("ASC"); // 글씨 정렬 관리
    const [timeSort, setTimeSort] = useState("ASC"); // 시간 정렬 관리
    const [choiceWord, setChoiceWord] = useState([]); // 검색 페이지에서 선택한 단어 관리
    const [keyword, setKeyword] = useState(""); // 검색 단어
    const [searchData, setSearchData] = useState([]); // 검색해서 추가한 데이터
    const [totalSearchData, setTotalSearchData] = useState(0);
    const [isSearching, setIsSearching] = useState(true); // 검색 초기화 시 사용

    const dataPerPage = 5; // 보여줄 목록 수
    const pagesPerRange = 5; // 표시할 페이지 수

    // 페이지 네이션 hook 관리
    const {
        currentPage,
        totalPages,
        startPage,
        endPage,
        handlePageChange,
        setCurrentPage
    } = usePagination({
        totalItems: totalSearchData,
        itemsPerPage: dataPerPage,
        pagesPerRange
    });

    // 검색 키워드 변경 핸들러
    const handleChangeKeyword = (e) => {
        setKeyword(e.target.value);
    }
    // 검색 인풋 엔터 핸들러
    const handleOnKeyDownKeyword = (e) => {
        if(e.keyCode !== 13) return;
        searchAPI();
    }
    // 검색 초기화 핸들러
    const handleSearchReset = () => {
        setKeyword("");
        setCurrentPage(1);
        setIsSearching(true)
    }
    // 정렬 핸들러
    const handleWordSort = (e) => {
        const sortType = e.currentTarget.getAttribute('data-sort-type');
        setIsSearching(true)
        if (sortType === 'Time') {
            setTimeSort(prev => prev === 'ASC' ? 'DESC' : 'ASC');
        } else if (sortType === 'Word') {
            setWordSort(prev => prev === 'ASC' ? 'DESC' : 'ASC');
        }

    }

    // 검색 버튼 핸들러
    const handleGetSearchData = () => {
        searchAPI();
    }

    // 검색 API
    const searchAPI = () => {
        axiosInstance.get('study/solo-study-search', {
            params: {
                keyword: keyword,
                page: currentPage,
                size: dataPerPage,
                timeSort: timeSort,
                wordSort: wordSort
            }
        })
            .then((res) => {
                setSearchData(res.data.data.content);
                setTotalSearchData(res.data.data.totalElements);
                setIsSearching(false); // API 호출 후 로딩 종료
            })
            .catch(e => {
                toast.error('검색중 오류가 발생하였습니다.');
                setIsSearching(false);
            });
    }

    // 검색 단어 추가 핸들러
    const handleChoice = (e, index) => {
        // 선택한 단어 데이터 가져오기
        const chosenWord = searchData[index];

        // 선택한 단어가 이미 searchData에 있는지 확인
        const isAlreadyChosen = choiceWord.some((word) => word.wordNum === chosenWord.wordNum);

        // 선택된 단어가 없을 경우에만 searchData에 추가
        if (isAlreadyChosen) return toast.error('이미 추가된 단어입니다.');

        setChoiceWord((prevData) => [...prevData, chosenWord]);
    }

    // 선택된 단어 삭제 핸들러
    const handleChoiceDelete = (index) => {
        const updatedChoiceWord = [...choiceWord];
        updatedChoiceWord.splice(index, 1); // 해당 인덱스의 아이템 제거
        setChoiceWord(updatedChoiceWord);
    }

    // 단어 검색 데이터 전체를 단어 목록에 추가
    const handleSearchWordSubmit = () => {
        setData((prevData) => {
            // 기존 단어 목록에 searchData 추가
            const newData = [...prevData];

            choiceWord.forEach(item => {
                // 중복된 단어를 추가하지 않도록 체크
                const isAlreadyAdded = newData.some(word => word.wordContent === item.wordContent);
                if (!isAlreadyAdded) {
                    newData.push({
                        wordContent: item.wordContent,
                        wordMeaning: item.wordMeaning,
                        wordChinese: item.wordChinese,
                    });
                }
            });

            return newData;
        });

        // 모달 닫기
        closeModal();
    }
    // 모달 닫쳤을 때
    const closeModal = () => {
        setSearchWordOn(false);
        setChoiceWord([]);
        setCurrentPage(1);
        setWordSort("ASC");
        setTimeSort("ASC");
        setKeyword("");
    }

    // 검색 페이지 데이터 조회
    useEffect(() => {
        if (isSearching && searchWordOn) {
            searchAPI();
            setIsSearching(false); // API 호출 후 플래그 리셋
        }
    }, [isSearching, wordSort, timeSort, currentPage, searchWordOn]);

    // 페이지 변경될 떄 searching state true로 변경
    useEffect(() => {
        setIsSearching(true)
    }, [currentPage]);

    return (
        <div className="solo-add-container">
            <div className="solo-add-all">

                <div className="solo-add-header-sub-title">
                    <p>내가 만드는 학습</p>
                </div>
                <div className="solo-add-header">
                    <p>학습 단어 추가</p>
                </div>

                <div className="solo-add-title-all">
                    {title !== "" &&
                        <p>제목({title.length}/20)</p>
                    }
                    <input
                        ref={titleInputRef} // 추가: ref 속성으로 제목 입력란에 ref 연결
                        className={(title !== "" ? "solo-add-title-input-value" :
                            "solo-add-title-input-not-value")}
                        type="text"
                        placeholder="제목을 입력하세요"
                        onChange={handleTitleChange}
                        value={title}
                        maxLength={20}
                    />
                </div>

                <div className="solo-add-content-all">


                    <div className="solo-add-content-all-title">
                        <div className="solo-add-content-all-title-box">
                            <IoMdArrowDropright/>
                            <p>직접 단어 추가({data.length})</p>
                        </div>
                        <div className="solo-add-word-search"
                             onClick={handleSearchWord}>
                            <IoSearch/>
                            <p>단어 검색</p>
                        </div>
                    </div>

                    <div className="solo-add-word-all">
                        {data?.map((item, index) => (
                            <div className="solo-add-word-box" key={index}>
                                <div className="solo-add-word-header">
                                    <p>{index + 1}</p>
                                    <FaRegTrashAlt
                                        size={16}
                                        onClick={() => handleRemoveWord(index)}/>
                                </div>

                                <div className="solo-add-word-content">
                                    <div>
                                        <input type="text"
                                               name="wordContent"
                                               value={item.wordContent}
                                               onChange={(e) => handleDataChange(e, index)}/>
                                        <p>단어</p>
                                    </div>
                                    <div>
                                        <input type="text"
                                               name="wordChinese"
                                               value={item.wordChinese}
                                               onChange={(e) => handleDataChange(e, index)}/>
                                        <p>한자</p>
                                    </div>
                                    <div>
                                        <input type="text"
                                               name="wordMeaning"
                                               value={item.wordMeaning}
                                               onChange={(e) => handleDataChange(e, index)}/>
                                        <p>뜻</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="solo-add-word-add-box"
                             onClick={handleAddWord}>
                            <p>+ 단어 추가</p>
                        </div>

                        <div className="solo-add-btn-box">
                            <button className="solo-add-btn-home"
                                    onClick={handleBack}>목록으로
                            </button>
                            <button className="solo-add-btn-submit"
                                    onClick={handleSubmit}>등록하기
                            </button>
                        </div>
                    </div>
                </div>

                {searchWordOn &&
                    <div className="solo-add-word-search-back-ground">
                        <div className="solo-add-word-search-modal">
                            <div className="solo-add-word-search-title-box">
                                {/*<p className="solo-add-word-search-title">단어 검색</p>*/}
                                <p className="solo-add-word-search-title-content">추가하고 싶은 단어를 선택해주세요!</p>
                            </div>

                            <div className="solo-add-word-search-search-box">
                                <input type="text"
                                       value={keyword}
                                       onChange={handleChangeKeyword}
                                       onKeyDown={handleOnKeyDownKeyword}/>
                                <IoSearch size={25}
                                          onClick={handleGetSearchData}/>
                                <GrPowerReset size={25}
                                onClick={handleSearchReset}/>
                            </div>

                            <div className="solo-add-word-search-choice-sub-title">
                                <p>선택된 단어({choiceWord.length})</p>
                            </div>

                            <div className="solo-add-word-search-choice-box">

                                {choiceWord?.map((item, index) => (
                                    <div className="add-word-search-choice-word" key={index}>
                                        <p>{item.wordContent}</p>
                                        <IoIosCloseCircleOutline onClick={() => handleChoiceDelete(index)}/>
                                    </div>
                                ))}
                                {choiceWord?.length === 0 &&
                                    <div className="add-word-search-not-choice-word">
                                        <p>선택된 단어가 없습니다.</p>
                                    </div>
                                }

                            </div>

                            <div className="solo-add-word-search-choice-sub-title2">
                                <p>단어 목록</p>
                                <div>
                                    {timeSort === 'ASC' ?
                                        <div data-sort-type="Time"
                                             className="solo-add-word-search-time"
                                             onClick={handleWordSort}>
                                            <FaSortNumericDown size={24}/>
                                        </div>
                                        :
                                        <div data-sort-type="Time"
                                             className="solo-add-word-search-time"
                                             onClick={handleWordSort}>
                                            <FaSortNumericUp size={24}/>
                                        </div>
                                    }
                                    {wordSort === 'ASC' ?
                                        <div data-sort-type="Word"
                                             className="solo-add-word-search-word"
                                             onClick={handleWordSort}>
                                            <FaSortAlphaDown size={24}/>
                                        </div>
                                        :
                                        <div data-sort-type="Word"
                                             className="solo-add-word-search-word"
                                             onClick={handleWordSort}>
                                            <FaSortAlphaUp size={24}/>
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className="solo-add-word-search-data-box">
                                {searchData?.map((item, index) => (
                                    <div className="solo-add-word-search-data-content-box" key={index}
                                         onClick={(e) => handleChoice(e, index)}>
                                        <p className="solo-add-word-search-data-content-meaning">{item.wordMeaning}</p>
                                        <p className="solo-add-word-search-data-content-content">{item.wordContent}{item.wordChinese && "(" + item.wordChinese + ")"}</p>
                                    </div>
                                ))}
                            </div>

                            <PageNation
                                currentPage={currentPage}
                                startPage={startPage}
                                endPage={endPage}
                                totalPages={totalPages}
                                handlePageChange={handlePageChange}
                                pagesPerRange={pagesPerRange}
                                divMargin={"10px 0"}
                            />

                            <div className="solo-add-btn-box solo-add-word-search-btn-box">
                                <button className="solo-add-btn-home"
                                        onClick={closeModal}>취소
                                </button>
                                <button className="solo-add-btn-submit"
                                        onClick={handleSearchWordSubmit}
                                >추가하기
                                </button>
                            </div>

                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default SoloAdd;