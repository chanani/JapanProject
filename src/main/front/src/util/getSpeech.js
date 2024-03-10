export const getSpeech = (text: any) => {
  let voices: any[] = [];

  // 디바이스에 내장된 voice를 가져온다.
  const setVoiceList = () => {
    voices = window.speechSynthesis.getVoices();
  };

  setVoiceList();

  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    // voice list에 변경됐을 때, voice를 다시 가져온다.
    window.speechSynthesis.onvoiceschanged = setVoiceList;
  }

  const speech = (txt: string | undefined) => {
    const lang = "ja-JP"; // 일본어로 변경
    const utterThis = new SpeechSynthesisUtterance(txt);

    utterThis.lang = lang;
    utterThis.rate = 0.15;
    /* 
      일본어 voice 찾기
      디바이스 별로 일본어는 ja-JP 또는 ja_JP로 voice가 정의되어 있다.
    */
    const jap_voice = voices.find(
      (elem) => elem.lang === lang || elem.lang === lang.replace("-", "_")
    );

    // 일본어 voice가 있다면 ? utterance에 목소리를 설정한다 : 리턴하여 목소리가 나오지 않도록 한다.
    if (jap_voice) {
      utterThis.voice = jap_voice;
    } else {
      return;
    }

    // utterance를 재생(speak)한다.
    window.speechSynthesis.speak(utterThis);
  };

  speech(text);
};
