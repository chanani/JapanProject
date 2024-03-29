import { useContext, useEffect, useState } from "react";
import "../../styles/adminPage/AddWordPage.css";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { tokenInfoContext } from "../../component/TokenInfoProvider";

const AddWordPage = () => {
  const navigate = useNavigate();
  const { userRole } = useContext(tokenInfoContext);

  useEffect(() => {
    if(userRole !== 'role_admin'){
      alert('해당 페이지는 관리자 외에는 접근이 불가합니다.');
      navigate("/");
    }
  }, [userRole]);
  const token = localStorage.getItem("token");

  const [inputCount, setInputCount] = useState(1);
  const [list, setList] = useState([]);

  const handleChangeWord = (event, index) => {
    const { name, value } = event.target;
    const newList = [...list];
    newList[index] = { ...newList[index], [name]: value };
    setList(newList);
  }

  const handleAddWord = () => {
    setList(prevList => [...prevList, { word: '', mean: '', level: '' }]);
    setInputCount(prevCount => prevCount + 1);
  }

  const handleSubmit = () => {
    axios({
      url : "/admin/addWordList",
      method : "POST",
      data : {
        list : list
      },
      headers : {
        authorization : token
      }
    })
    .then((res) => {
      alert(`${list.length}건이 정상적으로 등록되었습니다.`);
      setList([]);
      setInputCount(1);
    })
    .catch((e) => {
      alert("등록중 오류가 발생하였습니다.");
    });
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
            <FaPlus size={20} onClick={handleAddWord} />
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
