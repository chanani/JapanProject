import '../../styles/MainPage.css';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import MainSwiper from "./conponent/swiper/MainSwiper";
import Category from "./conponent/category/Category";
import FavoriteNote from "./conponent/favoriteNote/FavoriteNote";


function MainPage() {

    return (
        <div className={"main-page"}>
            <div className="main-image-container">
                <MainSwiper/>
            </div>
            <Category/>
            <FavoriteNote/>
        </div>

    );
}

export default MainPage;
