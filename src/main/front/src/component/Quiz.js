import { useContext, useEffect, useState } from 'react';
import '../styles/component/Quiz.css';
import { FaPlay } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import { MdOutlineSensorDoor } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaStopCircle } from "react-icons/fa";
import Audio from './Audio';
import { tokenInfoContext } from './TokenInfoProvider';
import axios from 'axios';

const Quiz = ({ level, num, arr }) => {
  let [word, setWord] = useState([]);
  const [current, setCurrent] = useState(0);
  const [meaning, setMeaning] = useState(false);
  const [play, setPlay] = useState(false);
  const { userRole, username, accessToken, refreshTokne } = useContext(tokenInfoContext);

  const handleMeaning = () => {
    setMeaning((meaning) => !meaning);
    setTimeout(() => {
      const box = document.querySelector('.study-on-box');
      box.classList.toggle('fade-out');
    }, 100);
  };
  
  // 즐겨찾기 핸들러
  const handleStar = () => {
    if(userRole !== "none"){
      setWord(prevWord => {
        const newWord = [...prevWord];
        newWord[current].word_favorite = !newWord[current].word_favorite;
        return newWord;
      });
      changeFavorite();
      
    } else {
      alert("로그인 후 이용해주세요.");
    }
    
  }
  // 즐겨 찾기 백엔드로 전달
  const changeFavorite = () => {
    axios({
      url : "/study/addFavorite/" + word[current].word_num + "/" + !word[current].word_favorite + "/" + username,
      method : "GET",
      headers : {
        Authorization : accessToken
      }
    })
    .then((res) => {
    })

  }
  // +1 핸들러
  const handleNext = () => {
    setCurrent((current) => current + 1);
  }
  // -1 핸들러
  const handleBack = () => {
    setCurrent((current) => current - 1);
  }
  // 자동 넘기기 핸들러
  const handlePlay = () => {
    setPlay((play) => !play);
  }
  // 자동 넘기기 기능
  useEffect(() => {
    let autoPlayInterval;
  
    if (play) {
      autoPlayInterval = setInterval(() => {
        setCurrent((prevCurrent) => {
          if (prevCurrent < word.length - 1) {
            return prevCurrent + 1;
          } else {
            clearInterval(autoPlayInterval);
            setPlay(false);
            return prevCurrent;
          }
        });
      }, 3000);
    } else {
      clearInterval(autoPlayInterval); 
    }
    
    return () => {
      clearInterval(autoPlayInterval);
    };
  }, [play, word.length]);
  
  // 단어 및 즐겨찾기 가져오기
  useEffect(() => {
    if(arr.length !== 0){
      setWord(arr);
    } else {
      axios({
        url : "/study/data/" + level + "/" + num + "/" + username,
        method : "GET",
      })
      .then((res) => {
        setWord(res.data);
      });
    }
  }, [arr, level, num, username]);
  

  return (
    <div className='study-on-box'>
      <div className='on-header-box'>
        
        {word.length > 0 && current >= 0 && word[current].word_favorite === false? 
        <FaRegStar size={21} onClick={handleStar}/>
         : 
         <FaStar size={21} onClick={handleStar}/>}
        
        {meaning ? "" : <Audio inputData={word[current]?.word_content} />}


      </div>
      <div className='on-word-box' onClick={handleMeaning}>
          {meaning ? word[current]?.word_meaning : word[current]?.word_content}
      </div>
      <div className='on-click-box'>
          <div className='click-left'>
            {play ? 
              <FaStopCircle size={23} onClick={handlePlay} />
            :
              <FaPlay size={17} onClick={handlePlay}/>
            }
           
           
          </div>
          <div className='click-mid'>
            {current === 0 ? 
            <GoArrowLeft size={25} color='gray'/> 
            : 
            <GoArrowLeft size={25} onClick={handleBack}/>}
           
            <p>{current + 1} / {word.length}</p>
            {current === word.length - 1 ? 
            <GoArrowRight size={25} color='gray'/>
            :
            <GoArrowRight size={25} onClick={handleNext}/>
            }
          </div>
          <div className='click-right'>
          <Link to={"/"}><MdOutlineSensorDoor size={25}/></Link>

          </div>
      </div>
    </div>
  );
}

export default Quiz;