import { useContext, useEffect, useState } from "react";
import "../../styles/search/Search.css"
import { tokenInfoContext } from "../../component/TokenInfoProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../api";

const Search = () => {
  const {userRole} = useContext(tokenInfoContext);
  const navigate = useNavigate();
  useEffect(() =>{
    if(userRole === "none"){
      alert("로그인 후 이용해주세요.");
      navigate("/login");
    }
  });

  const [keyWord, setKeyWord] = useState("");
  const [data, setData] = useState([]);
  const keyWordChange = (event) => {
    setKeyWord(event.target.value);
  }

  const searchHandle = () => {
    axiosInstance.get('search/all', { params : {keyWord} })
    .then((res) => {
        console.log(res.data)
        setData(res.data);
    })
    .catch((e) => console.log(e));

  }

  

  return (
    <div>

      <div>
        <input type="text" value={keyWord} onChange={keyWordChange}/>
        <input type="button" onClick={searchHandle} value="검색"></input>
      </div>    
     

    </div>
  );
}

export default Search;