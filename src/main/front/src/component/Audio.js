import { useEffect } from "react";
import { AiOutlineSound } from "react-icons/ai";
import {getSpeech} from "../util/getSpeech";
const Audio = (inputData) => {

  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  const handleButton = () => {
    getSpeech(inputData.inputData);
  };

  return(
    <AiOutlineSound size={23} onClick={handleButton}/>
  );
}

export default Audio;