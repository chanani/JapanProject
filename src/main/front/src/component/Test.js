import "../styles/component/Test.css";

const Test = (kind) => {
  // kind가 true일 때 뜻 풀이, false일 때 단어 풀이
  let word = [['家族', '코키'], ['ちた', '치타'], ['しみ', '시미'], ['たりの', '타리노']];

  return (
    <div className="test-on-box">
      <div className="test-on-header-box">
        <p>단어 테스트</p>
      </div>
      <div className="test-box">
        {word.map((item, index) => (
          <p>
            {item[0][0]}
          </p>
        ))}
      </div>
      <div className="submit-box">
          <button>결과 확인하기</button>
      </div>
    </div>
  );
}

export default Test;