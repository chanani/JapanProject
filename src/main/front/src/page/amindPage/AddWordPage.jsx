import {useContext, useEffect, useState} from "react";
import "../../styles/adminPage/AddWordPage.css";
import {FaPlus} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";
import {FaRegTrashAlt} from "react-icons/fa";

const AddWordPage = () => {
    const navigate = useNavigate();
    const {userRole} = useContext(tokenInfoContext);
    const [inputCount, setInputCount] = useState(1);
    const [list, setList] = useState([]);

    useEffect(() => {
        if (userRole !== 'role_admin') {
            toast.error('해당 페이지는 관리자 외에는 접근이 불가합니다.');
            navigate("/");
        }
    }, [userRole]);

    // 단어 입력 핸들러
    const handleChangeWord = (event, index) => {
        const {name, value} = event.target;
        const newList = [...list];
        newList[index] = {...newList[index], [name]: value};
        setList(newList);
    }

    // 단어 목록 추가 핸들러
    const handleAddWord = () => {
        setList(prevList => [...prevList, {
            wordContent: '',
            wordMeaning: '',
            wordLevel: '',
            wordChinese: '',
            wordWeek: '',
            exampleList: [] // 예문 배열 추가
        }]);
        setInputCount(prevCount => prevCount + 1);
    }

    // 단어 목록 삭제 핸들러
    const handleRemoveWord = (index) => {
        const newList = [...list];
        newList.splice(index, 1); // 해당 인덱스의 아이템 제거
        setList(newList);
        setInputCount(prevCount => prevCount - 1);
    }

    // 단어 등록 핸들러
    const handleSubmit = async () => {
        if (inputCount === 1) return toast.error("등록할 단어를 입력해주세요.");

        // 데이터 검증
        for (let i = 0; i < list.length; i++) {
            const word = list[i];

            // 단어 기본 정보 검증
            if (!word.wordContent.trim() || !word.wordMeaning.trim()) {
                return toast.error(`단어 ${i + 1}의 내용 또는 뜻이 비어있습니다.`);
            }

            // 예문 검증
            if (word.exampleList?.length > 0) {
                for (let j = 0; j < word.exampleList.length; j++) {
                    const example = word.exampleList[j];
                    if (!example.wordExampleContent.trim() || !example.wordExampleMeaning.trim()) {
                        return toast.error(`단어 ${i + 1}의 예문 ${j + 1}에 빈 값이 있습니다.`);
                    }
                }
            }
        }

        const payload = {list};
        try {
            const result = await axiosInstance.post('admin/addWordList', payload)
                .then((res) => {
                    if(res.status !== 200) return toast.error("등록 중 오류가 발생하였습니다.")
                    toast.success(`${list.length}건이 정상적으로 등록되었습니다.`);
                    setList([]);
                    setInputCount(1);
                })
                .catch(e => toast.error('등록 오류'));

        } catch (e) {
            toast.error("등록 중 오류가 발생하였습니다.");
            console.error(e); // 에러 정보를 로그로 남기기
        }

    }

    // 홈으로 가는 핸들러
    const handleHome = () => {
        navigate("/");
    }

    // 예문 추가 핸들러
    const handleAddExample = (index) => {
        setList(prevList => {
            const newList = JSON.parse(JSON.stringify(prevList)); // 깊은 복제
            if (!newList[index].exampleList) {
                newList[index].exampleList = []; // 예문 배열 초기화
            }
            newList[index].exampleList.push({wordExampleContent: '', wordExampleMeaning: ''}); // 기본 객체 추가
            return newList;
        });
    };

    // 예문 입력 핸들러
    const handleChangeExample = (event, wordIndex, exampleIndex, field) => {
        const {value} = event.target;
        setList(prevList => {
            const newList = JSON.parse(JSON.stringify(prevList)); // 깊은 복제
            newList[wordIndex].exampleList[exampleIndex][field] = value; // field에 따라 text 또는 meaning 업데이트
            return newList;
        });
    };

    // 예문 삭제 핸들러
    const handleRemoveExample = (wordIndex, exampleIndex) => {
        setList(prevList => {
            const newList = JSON.parse(JSON.stringify(prevList)); // 깊은 복제
            newList[wordIndex].exampleList.splice(exampleIndex, 1); // 해당 예문 제거
            return newList;
        });
    };

    useEffect(() => {
        console.log(list)
    }, [list])

    return (
        <div className="add-box-all">
            <div className="add-box">
                <div className="add-box-title">
                    <p>단어 등록</p>
                </div>

                <div className="add-box-info">
                    {list?.map((item, index) => (
                        <div key={index} className="add-box-input">
                            <div className="add-box-head-box">
                                <p>{index + 1}</p>
                                <FaRegTrashAlt onClick={() => handleRemoveWord(index)}/>

                            </div>
                            <div className="add-box-input-box">

                                <div className="word-content-input-box">
                                    <input type="text"
                                           className={`word_content${index}`}
                                           name="wordContent"
                                           id="word_content"
                                           value={item.wordContent}
                                           onChange={(e) => handleChangeWord(e, index)}
                                    />
                                    <p>단어</p>
                                </div>

                                <div className="word-chinese-input-box">
                                    <input type="text"
                                           className={`word_chinese${index}`}
                                           name="wordChinese"
                                           id="word_chinese"
                                           value={item.wordChinese}
                                           onChange={(e) => handleChangeWord(e, index)}
                                    />
                                    <p>한자</p>
                                </div>

                                <div className="word-meaning-input-box">
                                    <input type="text"
                                           className={`word_meaning${index}`}
                                           name="wordMeaning"
                                           id="word_meaning"
                                           value={item.wordMeaning}
                                           onChange={(e) => handleChangeWord(e, index)}
                                    />
                                    <p>뜻</p>
                                </div>
                                <div className="word-level-input-box">
                                    <input type="number"
                                           className={`word_level${index}`}
                                           name="wordLevel"
                                           id="word_level"
                                           value={item.wordLevel}
                                           min={1}
                                           onChange={(e) => handleChangeWord(e, index)}
                                    />
                                    <p>단계</p>
                                </div>

                                <div className="word-week-input-box">
                                    <input type="number"
                                           className={`word_week${index}`}
                                           name="wordWeek"
                                           id="word_week"
                                           value={item.wordWeek}
                                           onChange={(e) => handleChangeWord(e, index)}
                                    />
                                    <p>주차</p>
                                </div>
                            </div>
                            <div className="add-example-box">
                                {item.exampleList?.length > 0 && item.exampleList.map((example, exampleIndex) => (
                                    <div key={exampleIndex} className="example-input-box">
                                        <div className={"example-input-box-detail"}>
                                            <input
                                                type="text"
                                                value={example.wordExampleContent}
                                                onChange={(e) => handleChangeExample(e, index, exampleIndex, 'wordExampleContent')}
                                            />
                                            <p>예문</p>
                                        </div>

                                        <div className={"example-input-box-detail"}>
                                            <input
                                                type="text"
                                                value={example.wordExampleMeaning}
                                                onChange={(e) => handleChangeExample(e, index, exampleIndex, 'wordExampleMeaning')}
                                            />
                                            <p>예문 해석</p>
                                        </div>
                                        <FaRegTrashAlt onClick={() => handleRemoveExample(index, exampleIndex)}/>
                                    </div>
                                ))}
                            </div>
                            <div className="add-example-add-box"
                                 onClick={() => handleAddExample(index)}
                            >
                                <p>예문 추가 +</p>
                            </div>

                        </div>
                    ))}
                    <div className="plus-btn" onClick={handleAddWord}>
                        <FaPlus size={20}/>
                    </div>
                    <div className="add-box-btn">
                        <button
                            onClick={handleHome}
                            className="home-btn"
                        >홈으로
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="add-word-submit-btn"
                        >등록하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddWordPage;
