import {useContext, useEffect, useState} from "react";
import "../../styles/adminPage/AddWordPage.css";
import {FaPlus} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";

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
        setList(prevList => [...prevList, {wordContent: '', wordMeaning: '', wordLevel: '', wordChinese: '', wordWeek: '' }]);
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
        const payload = { list };
        try {
            const result = await axiosInstance.post('admin/addWordList', payload)
                .then((res) => {
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

    return (
        <div className="add-box-all">
            <div className="add-box">
                <div className="add-box-title">
                    새로운 단어를 추가해보세요.
                </div>
                <div className="add-box-info">
                    {list?.map((item, index) => (
                        <div key={index} className="add-box-input">
                            <input type="text" placeholder="단어"
                                   className={`word_content${index}`}
                                   name="wordContent"
                                   id="word_content"
                                   value={item.wordContent}
                                   onChange={(e) => handleChangeWord(e, index)}
                            />
                            <input type="text" placeholder="뜻"
                                   className={`word_meaning${index}`}
                                   name="wordMeaning"
                                   id="word_meaning"
                                   value={item.wordMeaning}
                                   onChange={(e) => handleChangeWord(e, index)}
                            />
                            <input type="number" placeholder="단계"
                                   className={`word_level${index}`}
                                   name="wordLevel"
                                   id="word_level"
                                   value={item.wordLevel}
                                   min={1}
                                   onChange={(e) => handleChangeWord(e, index)}
                            />
                            <input type="text" placeholder="한자"
                                   className={`word_chinese${index}`}
                                   name="wordChinese"
                                   id="word_chinese"
                                   value={item.wordChinese}
                                   onChange={(e) => handleChangeWord(e, index)}
                            />
                            <input type="number" placeholder="주차"
                                   className={`word_week${index}`}
                                   name="wordWeek"
                                   id="word_week"
                                   value={item.wordWeek}
                                   onChange={(e) => handleChangeWord(e, index)}
                            />
                            <button onClick={() => handleRemoveWord(index)}>-</button>
                        </div>
                    ))}
                    <div className="plus-btn">
                        <FaPlus size={20} onClick={handleAddWord}/>
                    </div>
                    <div className="add-box-btn">
                        <button onClick={handleSubmit}>추가하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddWordPage;
