import '../../styles/MainPage.css';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import MainSwiper from "./conponent/swiper/MainSwiper";
import Category from "./conponent/category/Category";
import FavoriteNote from "./conponent/favoriteNote/FavoriteNote";
import {useDialog} from "../../hook/UseDialog.jsx";


function MainPage() {
    const {openConfirm} = useDialog();

    const check = async () => {
        const isConfirmed = await openConfirm("안녕하세요~~");
        if(!isConfirmed) return;
        console.log("ggggggggggggg");
    }
    return (
        <div className={"main-page"}>
            <div className="main-image-container">
                <MainSwiper/>
            </div>
            <Category/>
            <FavoriteNote/>
            <button onClick={check}>ggg</button>
        </div>

    );
}

export default MainPage;
