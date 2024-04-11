import '../styles/Footer.css';

function Footer(){
  return(
    <footer>
        <div className='footer-box'>
          <div className='footer-title'>
            <h3>The Japan</h3>
          </div>
          <div className='footer-content-box'>
            <p>문의하기</p>
            <p>브랜드 스토리</p>
            <p>서비스 이용약관</p>
            <p>개인정보 처리 방침</p>
            <p>사용자 후기</p>
            <p>언론보도</p>
          </div>
          <div className='footer-info-box'>
            <p>차나니코리아 주식회사 | 대표 : 이찬한</p>
            <p>전화번호 : 010-0000-0000</p>
            <p>이메일 : theholidaynight@gmail.com</p>
          </div>
        </div>

    </footer>
  );
}

export default Footer;