import "../../styles/study/SoloAdd.css"
import {IoMdArrowDropright} from "react-icons/io";
import {useState} from "react";
import {FaRegTrashAlt} from "react-icons/fa";
import {IoSearch} from "react-icons/io5";
import {useNavigate} from "react-router-dom";

const SoloAdd = () => {
    const navigator = useNavigate();
    const [title, setTitle] = useState(""); // 제목
    const [data, setData] = useState([]); // 단어 목록
    const [searchWordOn, setSearchWordOn] = useState(false); // 검색 모달 활성화 여부

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

    // 등록하기 핸들러
    const handleSubmit = () => {

    }

    // 단어 검색 모달 토큰 핸들러
    const handleSearchWord = () => {
        setSearchWordOn((current) => !current);
    }

    const data1 = [{
        wordContent: "dadad",
        wordMeaning: "한글로 해석합니다.",
        wordChinese: "중국어",
    }, {
        wordContent: "qwer",
        wordMeaning: "한글로 해석2합니다.",
        wordChinese: "중국어",
    }, {
        wordContent: "zxcv",
        wordMeaning: "한글로 해석1합니다.",
        wordChinese: "중국어1",
    }];


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
                            <p>직접 단어 추가</p>
                        </div>
                        <div className="solo-add-word-search"
                             onClick={handleSearchWord}>
                            <IoSearch/>
                            <p>단어 검색</p>
                        </div>
                    </div>

                    <div className="solo-add-word-all">
                        {data.map((item, index) => (
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
                                <p className="solo-add-word-search-title">단어 검색</p>
                                <p className="solo-add-word-search-title-content">추가하고 싶은 단어를 선택해주세요!</p>
                            </div>

                            <div className="solo-add-word-search-search-box">
                                <input type="text"/>
                                <IoSearch size={25} />
                            </div>

                            <div className="solo-add-word-search-choice-box">
                                aaa
                            </div>

                            <div className="solo-add-word-search-data-box">

                            </div>

                            <div className="solo-add-btn-box solo-add-word-search-btn-box">
                                <button className="solo-add-btn-home"
                                        onClick={handleSearchWord}>취소
                                </button>
                                <button className="solo-add-btn-submit"
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