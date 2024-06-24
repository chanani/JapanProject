import {useContext, useEffect, useState} from "react";
import "../../styles/adminPage/AddWordPage.css";
import {FaPlus} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";

const AddWeekWordPage = () => {
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
        setList(prevList => [...prevList, {school_content: '', school_meaning: '', school_chinese: '', school_week: ''}]);
        setInputCount(prevCount => prevCount + 1);
    }

    // 공지사항 등록 핸들러
    const handleSubmit = async () => {
        if (inputCount === 1) return toast.error("등록할 단어를 입력해주세요.");
        try {
            await axiosInstance.post('admin/addWeekWord', list)
                .then((res) => {
                    toast.success(`${list.length}건이 정상적으로 등록되었습니다.`);
                    setList([]);
                    setInputCount(1);
                })
                .catch((e => toast.error('데이터 저장 중 오류가 발생하였습니다. 관리자에게 문의해주세요.')))
        } catch (error) {
            if (error.response && error.response.status === 403) toast.error("등록에 실패하였습니다. 관리자에게 문의해주세요.");
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
                                   className={`school_content${index}`}
                                   name="school_content"
                                   id="school_content"
                                   value={item.school_content}
                                   onChange={(e) => handleChangeWord(e, index)}
                            />
                            <input type="text" placeholder="뜻"
                                   className={`school_meaning${index}`}
                                   name="school_meaning"
                                   id="school_meaning"
                                   value={item.school_meaning}
                                   onChange={(e) => handleChangeWord(e, index)}
                            />
                            <input type="text" placeholder="한자"
                                   className={`school_chinese${index}`}
                                   name="school_chinese"
                                   id="school_chinese"
                                   value={item.school_chinese}
                                   onChange={(e) => handleChangeWord(e, index)}
                            />

                            <input type="number" placeholder="주차"
                                   className={`school_week${index}`}
                                   name="school_week"
                                   id="school_week"
                                   value={item.school_week}
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

export default AddWeekWordPage;
