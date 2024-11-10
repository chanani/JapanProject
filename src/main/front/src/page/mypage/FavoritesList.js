import {useContext, useEffect, useState} from "react";
import "../../styles/mypage/FavoritesList.css";
import {FaStar} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";
import Select from "react-select";
import {FaRegEyeSlash} from "react-icons/fa";
import {MdOutlineRemoveRedEye} from "react-icons/md";
import Audio from "../../component/Audio";


const FavoritesList = () => {
    const {userRole, username} = useContext(tokenInfoContext);
    const navigate = useNavigate();
    const [word, setWord] = useState([]); // 단어 목록
    const [contentHidden, setContentHidden] = useState(false); // 단어 숨기기
    const [meaningHidden, setMeaningHidden] = useState(false); // 뜻 숨기기
    const [selectedValue, setSelectedValue] = useState("new"); // 정렬 값

    // 정렬 셀러드 박스 내용
    const selectOptions = [
        {value: "new", label: "최신순"},
        {value: "older", label: "오랜된순"},
        {value: "random", label: "랜덤"}
    ];

    // 즐겨찾기 버튼 클릭 핸들러
    const handleFavorite = (index) => {
        const newData = [...word];
        newData[index].wordFavorite = !newData[index].wordFavorite;
        if (!newData[index].wordFavorite) {
            newData.splice(index, 1);
            setWord(newData);
        }
        deleteFavorite(index);
    };
    // 즐겨찾기 삭제 기능
    const deleteFavorite = (index) => {
        axiosInstance.get(`study/addFavorite/${word[index].wordNum}/${word[index].wordFavorite}/${username}`)
            .catch(err => toast.error("데이터 삭제 중 오류가 발생하였습니다. 관리자에게 문의해주세요."))
    };
    // 즐겨찾기 페이지에서 단어 공부 페이지로 이동
    const handleStudy = () => {
        navigate("/study", {state: {arr: word}});
    };

    // 단어 숨김 핸들러
    const contentHiddenHandle = () => {
        setContentHidden((prev) => !prev);
    }

    // 뜻 숨김 핸들러
    const meaningHiddenHandle = () => {
        setMeaningHidden((prev) => !prev);
    }


    // 페이지 권한 설정 및 데이터 불러오기
    useEffect(() => {
        if (userRole === "none") {
            toast.error("로그인 후 이용해주세요.");
            navigate("/login");
        } else {
            axiosInstance.post('mypage/favorite', {username})
                .then((res) => {
                    setWord(res.data);
                })
                .catch((e) => toast.error('조회 중 오류가 발생하였습니다.'));
        }
    }, []);


    return (
        <div className="favorite-page-all">
            <div className="favorite-page-mid">

                <div className="favorite-info">
                    <p>단어 즐겨찾기</p>
                </div>

                <div className="favorite-page-category-box">
                    <div>
                        <Select
                            className="selectItem"
                            onChange={(e) => setSelectedValue(e.value)}
                            options={selectOptions}
                            placeholder="정렬"
                            value={selectOptions.filter(function (option) {
                                return option.value === selectedValue;
                            })}
                        />
                    </div>
                    <div className="favorite-page-hidden-box">
                        <div
                            className={(contentHidden ? "favorite-box-hidden-box-hidden" : "favorite-box-hidden-box-show")}
                            onClick={contentHiddenHandle}>단어 숨기기<MdOutlineRemoveRedEye/></div>
                        <div
                            className={(meaningHidden ? "favorite-box-hidden-box-hidden" : "favorite-box-hidden-box-show")}
                            onClick={meaningHiddenHandle}>뜻 숨기기<MdOutlineRemoveRedEye/></div>
                    </div>
                </div>

                <div className="favorite-data">
                    {word?.map((item, index) => (
                        <div className="favorite-box" key={index}>
                            <div className="favorite-data-top">
                                <div className={"favorite-data-top-content"}>
                                    <p>{item.wordContent}{item.wordChinese && "(" + item.wordChinese + ")"}</p>
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
                            <div className="favorite-data-bottom">
                                <div>{item.createdAt}</div>
                                <div>
                                    <FaStar size={13} onClick={() => handleFavorite(index)}/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="study-play-btn">
                    <button onClick={handleStudy}>즐겨찾기 단어 공부하기</button>
                </div>
            </div>
        </div>
    );
}

export default FavoritesList;