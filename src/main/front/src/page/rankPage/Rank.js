import { useContext, useEffect } from "react";
import "../../styles/rank/Rank.css"
import { tokenInfoContext } from "../../component/TokenInfoProvider";
import { useNavigate } from "react-router-dom";

const Rank = () => {
  const {userRole} = useContext(tokenInfoContext);
  const navigate = useNavigate();

  useEffect(() =>{
    if(userRole === "none"){
      alert("로그인 후 이용해주세요.");
      navigate("/login");
    }
  });
  
  return (
    <div>공사중이에요ㅠㅠ</div>
  );
}

export default Rank;