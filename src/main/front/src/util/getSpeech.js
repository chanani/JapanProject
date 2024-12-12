export const getSpeech = (text: string) => {
  let voices: any[] = [];

  const setVoiceList = () => {
    voices = window.speechSynthesis.getVoices();
  };

  setVoiceList();

  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = setVoiceList;
  }

  const speech = (txt: string | undefined) => {
    const lang = "ja-JP"; // 일본어로 설정
    const utterThis = new SpeechSynthesisUtterance(txt);

    utterThis.lang = lang;
    utterThis.rate = 0.5; // 자연스러운 속도 설정

    // 특정 목소리 선택 (이름 기반 필터링)
    const jap_voice = voices.find(
        (voice) =>
            (voice.lang === lang || voice.lang === lang.replace("-", "_")) &&
            voice.name.includes("Hattori") // "Google"을 포함한 목소리를 예시로 사용
    );


    if (jap_voice) {
      utterThis.voice = jap_voice;
    } else {
      console.warn("No Japanese voice found with the specified criteria.");
      return;
    }

    window.speechSynthesis.speak(utterThis);
  };

  speech(text);
};