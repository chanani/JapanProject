import {useContext, useEffect, useState} from "react";
import "../../styles/adminPage/AddWordPage.css";
import {FaPlus} from "react-icons/fa6";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";

const AddWordPage = () => {
    const navigate = useNavigate();
    const {userRole, username, accessToken, refreshToken} = useContext(tokenInfoContext);

    useEffect(() => {
        if (userRole !== 'role_admin') {
            toast.error('해당 페이지는 관리자 외에는 접근이 불가합니다.');
            navigate("/");
        }
    }, [userRole]);

    const [inputCount, setInputCount] = useState(1);
    const [list, setList] = useState([]);

    // 단어 입력 핸들러
    const handleChangeWord = (event, index) => {
        const {name, value} = event.target;
        const newList = [...list];
        newList[index] = {...newList[index], [name]: value};
        setList(newList);
    }

    // 단어 목록 추가 핸들러
    const handleAddWord = () => {
        setList(prevList => [...prevList, {word: '', mean: '', level: ''}]);
        setInputCount(prevCount => prevCount + 1);
    }

    // 공지사항 등록 핸들러
    const handleSubmit = async () => {
        if (inputCount === 1) return toast.error("등록할 단어를 입력해주세요.");
        try {
            const wordResponse = await axiosInstance.post('admin/addWordList', {list})
            toast.success(`${list.length}건이 정상적으로 등록되었습니다.`);
            setList([]);
            setInputCount(1);
        } catch (error) {
            if (error.response && error.response.status === 403) toast.error("등록에 실패하였습니다. 관리자에게 문의해주세요.");
            else toast.error("등록에 실패하였습니다. 관리자에게 문의해주세요.");
        }
    }

    return (
        <div className="add-box-all">
            <div className="add-box">
                <div className="add-box-title">
                    새로운 단어를 추가해보세요.
                </div>
                <div className="add-box-info">
                    {list.map((item, index) => (
                        <div key={index} className="add-box-input">
                            <input type="text" placeholder="단어"
                                   className={`word${index}`}
                                   name="word"
                                   id="word"
                                   value={item.word}
                                   onChange={(e) => handleChangeWord(e, index)}
                            />
                            <input type="text" placeholder="뜻"
                                   className={`mean${index}`}
                                   name="mean"
                                   id="mean"
                                   value={item.mean}
                                   onChange={(e) => handleChangeWord(e, index)}
                            />
                            <input type="number" placeholder="단계"
                                   className={`level${index}`}
                                   name="level"
                                   id="level"
                                   value={item.level}
                                   min={1}
                                   max={3}
                                   onChange={(e) => handleChangeWord(e, index)}
                            />
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
