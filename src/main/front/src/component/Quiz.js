import { useEffect, useState } from 'react';
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



function Quiz({currentPath, num}){
  let word = [['家族', '코키'], ['ちた', '치타'], ['しみ', '시미'], ['たりの', '타리노']];
  const [current, setCurrent] = useState(0);
  const [meaning, setMeaning] = useState(false);
  const [play, setPlay] = useState(false);
  const [star, setStart] = useState(false);
  const handleMeaning = () => {
    setMeaning((meaning) => !meaning);
    setTimeout(() => {
      const box = document.querySelector('.study-on-box');
      box.classList.toggle('fade-out');
    }, 100);
  }
  const handleStar = () => {
    setStart((star) => !star);
  }
  const handleNext = () => {
    setCurrent((current) => current + 1);
  }

  const handleBack = () => {
    setCurrent((current) => current - 1);
  }
  const handlePlay = () => {
    setPlay((play) => !play);
  }
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
  
  
  

  return (
    <div className='study-on-box'>
      <div className='on-header-box'>
        
        {star ? <FaRegStar size={21} onClick={handleStar}/>
         : 
         <FaStar size={21} onClick={handleStar}/>}
        
        {meaning ? "" : <Audio inputData={word[current][0]}/>}

      </div>
      <div className='on-word-box' onClick={handleMeaning}>
          {meaning ? word[current][1] : word[current][0]}
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