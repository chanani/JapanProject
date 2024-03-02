import { useContext, useEffect, useState } from "react";
import "../../styles/mypage/FavoritesList.css";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { tokenInfoContext } from "../../component/TokenInfoProvider";
const FavoritesList = () => {
  const {userRole, username} = useContext(tokenInfoContext);
  const navigate = useNavigate();

  useEffect(() =>{
    if(userRole === "none"){
      alert("로그인 후 이용해주세요.");
      navigate("/login");
    }
  });

  const [data, setData] = useState([['家族', '가족', true], ['ちた', '치타',true], ['しみ', '시미', true], ['たりの', '타리노', true], ['家族', '코키', true], ['ちた', '치타', true], ['しみ', '시미', true], ['たりの', '타리노', true], ['しみ', '시미', true], ['たりの', '타리노', true]]);
  
  const handleFavorite = (index) => {
    const newData = [...data];
    newData[index][2] = !newData[index][2]; 
    if (!newData[index][2]) {
      newData.splice(index, 1);
      setData(newData);
    }
  }

  const handleStudy = () => {
    navigate("/study/easy", { state: { arr: data } });
  }

  return (
    <div className="favorite-page-all">
      <div className="favorite-page-mid">
 
        <div className="favorite-info">
        {data.length === 0 ? 
        <p>목록이 존재하지 않습니다.</p>
        : 
        <p>{username}님의 즐겨찾기</p>
        }
        </div>
          <div className="favorite-data">
            {data.map((item, index) => (
              <div className="favorite-box" key={index}>
                <div className="favorite-data-star">
                  <FaStar size={13} onClick={() => handleFavorite(index)}/>
                </div>
                <div className="favorite-data-text">
                  <div className="level">{item[0]}</div>
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