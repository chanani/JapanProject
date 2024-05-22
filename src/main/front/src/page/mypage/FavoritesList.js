import {useContext, useEffect, useState} from "react";
import "../../styles/mypage/FavoritesList.css";
import {FaStar} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import axios from "axios";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";

const FavoritesList = () => {
    const {userRole, username, accessToken, refreshToken} = useContext(tokenInfoContext);
    const navigate = useNavigate();
    const [word, setWord] = useState([]);




    // 즐겨찾기 버튼 클릭 핸들러
    const handleFavorite = (index) => {
        const newData = [...word];
        newData[index].word_favorite = !newData[index].word_favorite;
        if (!newData[index].word_favorite) {
            newData.splice(index, 1);
            setWord(newData);
        }
        ;
        deleteFavorite(index);
    };
    // 즐겨찾기 삭제 기능
    const deleteFavorite = (index) => {
        axiosInstance.get(`study/addFavorite/${word[index].word_num}/${word[index].word_favorite}/${username}`)
            .catch(err => toast.error("데이터 삭제 중 오류가 발생하였습니다. 관리자에게 문의해주세요."))
    };

    // 즐겨찾기 페이지에서 단어 공부 페이지로 이동
    const handleStudy = () => {
        navigate("/study/easy", {state: {arr: word}});
    };

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
                .catch((e) => console.log(e));
        }
    }, []);

    return (
        <div className="favorite-page-all">
            <div className="favorite-page-mid">

                <div className="favorite-info">
                    {word.length === 0 ?
                        <p>목록이 존재하지 않습니다.</p>
                        :
                        <p>{username}님의 즐겨찾기</p>
                    }
                </div>
                <div className="favorite-data">
                    {word.map((item, index) => (
                        <div className="favorite-box" key={index}>
                            <div className="favorite-data-star">
                                <FaStar size={13} onClick={() => handleFavorite(index)}/>
                            </div>
                            <div className="favorite-data-text">
                                <div className="level">{item.word_content}</div>
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