import '../styles/Footer.css';
import {useNavigate} from "react-router-dom";
import Inquiry from "./inquiryPage/Inquiry";
import {axiosInstance} from "../api";
import {toast} from "react-toastify";

function Footer() {
    const navigator = useNavigate();

    const navHandle = (event) => {
        let navName = "/"
        navName += event.target.className;
        navigator(navName);
        window.scrollTo(0, 0);
    }

    const jenkinsTest = () => {
        axiosInstance.get("/admin/jenkins-test")
            .then((res) => {
                console.log(res)
                toast.success(res.data.message)
            })
            .catch(e => {
                console.log(e)
                toast.error("호출 에러")
            });
    }

    return (
        <footer>
            <div className='footer-box'>
                <div className='footer-title'>
                    <h3>The Japan</h3>
                </div>
                <div className='footer-content-box'>
                    <p onClick={navHandle} className="inquiry">문의하기</p>
                    <p onClick={navHandle} className="policy">서비스 이용약관</p>
                    <p>브랜드 스토리</p>
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
            <button onClick={jenkinsTest}>jenkins test</button>
        </footer>
    );
}

export default Footer;