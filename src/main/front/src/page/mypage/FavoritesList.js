import {useContext, useEffect, useState} from "react";
import "../../styles/mypage/FavoritesList.css";
import {FaRegTrashAlt} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";
import Select from "react-select";
import {BsPencilSquare} from "react-icons/bs";
import Audio from "../../component/Audio";
import moment from "moment/moment";
import {IoClose} from "react-icons/io5";
import {BiSave} from "react-icons/bi";

const FavoritesList = () => {
    const {userRole, username} = useContext(tokenInfoContext);
    const navigate = useNavigate();
    const [word, setWord] = useState([]); // 단어 목록
    const [selectedValue, setSelectedValue] = useState("new"); // 정렬 값
    const [editingIndex, setEditingIndex] = useState(null); // 메모 편집 중인 단어 인덱스
    const [memoInput, setMemoInput] = useState(""); // 메모 입력값

    // 정렬 목록
    const selectOptions = [
        {value: "new", label: "최신순"},
        {value: "older", label: "오랜된순"},
        {value: "random", label: "랜덤"}
    ];

    // 즐겨찾기 단어 삭제 핸들러
    const handleFavorite = (index) => {
        if (!window.confirm('즐겨찾기에서 삭제하시겠습니까?')) return;
        const newData = [...word];
        newData[index].wordFavorite = !newData[index].wordFavorite;
        if (!newData[index].wordFavorite) {
            newData.splice(index, 1);
            setWord(newData);
        }
        deleteFavorite(index);
    };

    // 즐겨찾기 삭제 API
    const deleteFavorite = (index) => {
        axiosInstance.get(`study/addFavorite/${word[index].wordNum}/${word[index].wordFavorite}/${username}`)
            .catch(err => toast.error("데이터 삭제 중 오류가 발생하였습니다. 관리자에게 문의해주세요."));
    };

    // 단어 학습 페이지로 이동
    const handleStudy = () => {
        navigate("/study", {state: {arr: word}});
    };

    // 단어 작성 핸들러
    const handleMemoEdit = (index) => {
        setEditingIndex(index);
        setMemoInput(word[index].favoriteMemo || ""); // 기존 메모 값 불러오기
    };

    // 메모 저장하기
    const saveMemo = (index) => {
        const updatedWord = [...word];
        updatedWord[index].favoriteMemo = memoInput;
        setWord(updatedWord);
        setEditingIndex(null);
        axiosInstance.post('/mypage/updateMemo', {
            wordNum: word[index].wordNum,
            memo: memoInput
        })
            .then(() => {
                toast.success("메모가 저장되었습니다.");
            })
            .catch(() => toast.error("메모 저장 중 오류가 발생했습니다."));
    };

    // 즐겨찾기 목록 조회  API
    const getFavoriteList = () => {
        axiosInstance.post('mypage/favorite', {username})
            .then((res) => {
                setWord(res.data);
            })
            .catch((e) => toast.error('조회 중 오류가 발생하였습니다.'));
    }

    useEffect(() => {
        if (userRole === "none") {
            toast.error("로그인 후 이용해주세요.");
            navigate("/login");
        } else {
            getFavoriteList();
        }
    }, []);

    return (
        <div className="favorite-page-all">
            <div className="favorite-page-mid">
                <div className="favorite-info">
                    <p>단어 즐겨찾기</p>
                </div>

                <div className="favorite-page-category-box">
                    <Select
                        className="selectItem"
                        onChange={(e) => setSelectedValue(e.value)}
                        options={selectOptions}
                        placeholder="정렬"
                        value={selectOptions.find(option => option.value === selectedValue)}
                    />
                    <div className="favorite-page-study-box" onClick={handleStudy}>
                        <div>즐겨찾기 단어 학습</div>
                    </div>
                </div>

                <div className="favorite-data">
                    {word.map((item, index) => (
                        <div className="favorite-box" key={index}>
                            <div className="favorite-data-top">
                                <div className="favorite-data-top-content">
                                    <p>{item.wordContent}{item.wordChinese && `(${item.wordChinese})`}</p>
                                </div>
                                <div className="favorite-data-top-audio-box">
                                    <Audio inputData={item.wordContent}/>
                                </div>
                            </div>

                            <div className="favorite-data-middle">
                                {item.wordMeaning.split(",").map((meaning, i) => (
                                    <div key={i}>{i + 1}. {meaning}</div>
                                ))}
                            </div>

                            {editingIndex === index ? (
                                <div className="favorite-data-memo">
                                    <div>
                                        <span>메모</span>
                                        <div>
                                            <BiSave onClick={() => saveMemo(index)}/>
                                            <IoClose onClick={() => setEditingIndex(null)}/>
                                        </div>
                                    </div>

                                    <input
                                        type="text"
                                        value={memoInput}
                                        onChange={(e) => setMemoInput(e.target.value)}
                                        maxLength={20}
                                        className="favorite-data-memo-input"
                                    />
                                    <hr/>
                                </div>
                            ) : (
                                item.favoriteMemo && (
                                    <div className="favorite-data-memo">
                                        <div>
                                            <span>메모</span>

                                        </div>
                                        <input type="text"
                                               value={item.favoriteMemo}
                                               readOnly={true}
                                               className="favorite-data-memo-input-value"
                                               maxLength={30}/>
                                    </div>
                                )
                            )}

                            <div className="favorite-data-bottom">
                                <div className="favorite-data-bottom-creat-time">
                                    <p>{moment(item.favoriteRegdate).format('YYYY.MM.DD')} 저장</p>
                                </div>
                                <div className="favorite-data-bottom-icon-box">
                                    {editingIndex !== index && (
                                        <BsPencilSquare size={18} onClick={() => handleMemoEdit(index)}/>
                                    )}
                                    <FaRegTrashAlt size={17} onClick={() => handleFavorite(index)}/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FavoritesList;
