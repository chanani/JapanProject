import '../../styles/MainPage.css';
import mainImage1 from '../../image/mainImage1.png';
import { useEffect, useState } from 'react';

function MainPage() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true); // 페이지가 로드되면 애니메이션 실행
    }, []);

    return (
        <div className="main-image-container">
            <img
                src={mainImage1}
                alt="이미지1"
                className={`main-image ${isLoaded ? 'loaded' : ''}`} // 이미지 로드 시 클래스 추가
            />
        </div>
    );
}

export default MainPage;
