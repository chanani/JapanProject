import '../../styles/MainPage.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MainSwiper from "../../component/swiper/MainSwiper";


function MainPage() {

    return (
        <div className="main-image-container">
            <MainSwiper />
        </div>
    );
}

export default MainPage;
