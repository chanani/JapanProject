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

  const [esId, setEsId] = useState("");
  const [name, setName] = useState("");
  const [keyWord, setKeyWord] = useState("");
  const [modifyEsId, setModifyEsId] = useState("");
  const [modifyName, setModifyName] = useState("");
  const [modifyKeyWord, setModifyKeyWord] = useState("");
  const [deleteEsId, setDeleteEsId] = useState("");
  const [esData, setEsData] = useState([]);
  const nameChange = (event) => {
    setName(event.target.value);
  }
  const keyWordChange = (event) => {
    setKeyWord(event.target.value);
  }
  const esIdChange = (event) => {
    setEsId(event.target.value);
  }
  
  const modifyNameChange = (event) => {
    setModifyName(event.target.value);
  }
  const modifyKeyWordChange = (event) => {
    setModifyKeyWord(event.target.value);
  }
  const modifyEsIdChange = (event) => {
    setModifyEsId(event.target.value);
  }
  const deleteEsIdChange = (event) => {
    setDeleteEsId(event.target.value);
  }

  // POST
  const addDataHandle = () => {
    if(esId === "" || keyWord === "" || esData === "") return
    // axiosInstance.get('search/all', { params : {keyWord} })
    // .then((res) => {
    //     console.log(res.data)
    //     setData(res.data);
    // })
    // .catch((e) => console.log(e));
    
    axios({
      url : `http://localhost:9200/test_index/_doc/${esId}`,
      method : "POST",
      data : {
        name : name,
        message : keyWord
      }
    })
    .then((res) => {
      setEsId("");
      setKeyWord("");
      setKeyWord("");
      console.log(res.data)
    })
    .catch((e) => console.log(e))
  }

  // GET
  const searchHandle = () => {
    
    axios({
      url : "http://localhost:9200/test_index/_search",
      method : "GET",
      data : {
        "query" : {
          "match_all" : {}
        }
      }
    })
    .then((res) => {
      console.log(res);
      setEsData(res.data.hits.hits);
    })
    .catch((e) => console.log(e))
  }

  // PUT
  const modifyHandle = () => {

      if (!!!esData.length) return alert('데이터를 조회 후 수정해주세요.');
      if (!esData.some(data => data._id === modifyEsId)) return alert("아이디가 없을 경우 수정이 안됩니다.");
    
      axios({
        url : `http://localhost:9200/test_index/_doc/${modifyEsId}`,
        method : "PUT",
        data : {
          name : modifyName,
          message : modifyKeyWord
        }
      })
      .then((res) => {
        console.log(res.data);
        setModifyEsId("");
        setModifyName("");
        setModifyKeyWord("");
        alert("정상적으로 수정되었습니다.");
      });
  }
  
  // DELETE
  const deleteHandle = () => {
    if (!!!esData.length) return alert('데이터를 조회 후 수정해주세요.');
    if (!esData.some(data => data._id === deleteEsId)) return alert("아이디가 없을 경우 삭제가 안됩니다.");

    axios({
      url : `http://localhost:9200/test_index/_doc/${deleteEsId}`,
      method : 'DELETE'
    })
    .then((res) => {
      console.log(res.data);
      setDeleteEsId("");
    })
    .catch((e) => console.log(e))
  }
  

  return (
    <div>
      <h3>elasticsearch 데이터 추가하기</h3>
      <div style={{marginBottom : "20px"}}>
        <input type="text" value={esId} onChange={esIdChange} placeholder="id"/>
        <input type="text" value={name} onChange={nameChange} placeholder="name"/>
        <input type="text" value={keyWord} onChange={keyWordChange} placeholder="message"/>
        <input type="button" onClick={addDataHandle} value="등록"></input>
      </div>    
      
      <h3>elasticsearch 데이터 가져오기</h3>

      <div >
        <input type="button" onClick={searchHandle} value="데이터 가져오기"/>
      </div>
     
      {esData.length === 0 ? "" : 
        esData.map((item, index) => (
          <div key={index}>
            {item._id} / {item._source.name} / {item._source.message}
          </div>
        ))
      }

    <h3 style={{marginTop : "20px"}}>elasticsearch 데이터 수정하기</h3>

    <div style={{marginBottom : "20px"}}>
      <p>데이터를 가져온 뒤 수정할 것</p>
      <input type="text" value={modifyEsId} onChange={modifyEsIdChange} placeholder="id"/>
      <input type="text" value={modifyName} onChange={modifyNameChange} placeholder="name"/>
      <input type="text" value={modifyKeyWord} onChange={modifyKeyWordChange} placeholder="message"/>
      <input type="button" onClick={modifyHandle} value="수정"></input>
    </div>    

    <h3 style={{marginTop : "20px"}}>elasticsearch 데이터 삭제하기</h3>

    <div style={{marginBottom : "20px"}}>
      <p>데이터를 가져온 뒤 삭제할 것</p>
      <input type="text" value={deleteEsId} onChange={deleteEsIdChange} placeholder="id"/>
      <input type="button" onClick={deleteHandle} value="삭제"></input>
    </div>    
  </div>
  );
}

export default Search;