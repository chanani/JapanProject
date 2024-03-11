import { useContext, useEffect, useState } from "react";
import "../../styles/mypage/RecordPage.css";
import { tokenInfoContext } from "../../component/TokenInfoProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RecordPage = () => {

  const {userRole, username} = useContext(tokenInfoContext);
  const navigate = useNavigate();

  useEffect(() =>{
    if(userRole === "none"){
      alert("로그인 후 이용해주세요.");
      navigate("/login");
    }
  });

  const [data, setData] = useState([]);
  // 상세페이지로 이동하는 핸들러
  const handleContent = async(index) => {
    try{
      let num = data[index].record_num;
      let kind = data[index].record_kind;
      let level = data[index].record_kind;
      let point = data[index].record_point;
      const response = await axios({
        url : "/mypage/recordDetails",
        method : "POST",
        data : {
          username : username,
          record_num : num
        }
      });
      const answer = response.data;
      navigate("/recordDetails", {state : { kind, level, answer, point } });
      window.scrollTo(0, 0);
    } catch(e) {
      alert("데이터 조회에 실패하였습니다. 관리자에게 문의해주세요.");
      console.error(e);
    }
  };

  // 데이터 가져오기
  useEffect(() => {
     axios({
      url : "/mypage/record",
      method : "POST",
      data : {
        username : username
      }
     })
     .then((res) => {
      console.log(res.data);
      setData(res.data);
     })
     .catch((error) => {
        alert("데이터 조회에 실패하였습니다. 관리자에게 문의해주세요.");
     });
  }, [username]);

  return(
    
    <div className="recordPage-page-all">
      <div className="recordPage-page-mid">

        <div className="recordPage-info">
        {data.length === 0 ? 
        <p>학습 기록이 존재하지 않습니다.</p>
        : 
        <p>{username}님의 기록</p>
        }
        </div>
        
          {data.map((item, index) => (
            <div className="recordPage-score" key={index} onClick={(event) =>handleContent(index)}>
              <div className="score-header">
                <div className="level">{item.record_level}단계</div>
                <div style={{fontSize : "13px"}}>⏐</div>
                <div>{username}</div>
              </div>
              <div className="score-content">
                <div className="point">{item.record_point}점</div>
                <div className="save-date">{item.record_date}</div>
              </div>
              
            </div>
          ))}

      </div>
    </div>
   
  );
}

export default RecordPage;