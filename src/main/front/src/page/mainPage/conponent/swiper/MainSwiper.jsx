import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import './MainSwiper.css';

import mainImage1 from '../../../../image/main/swiper_image1.jpg';
import mainImage2 from '../../../../image/main/swiper_image2.jpg';

// import required modules
import { Navigation, Autoplay } from 'swiper/modules';

export default function MainSwiper() {

    // 슬라이드 시간
    const [slideTime, setSlideTime] = useState(6000);

    // 배너 리스트
    const bannerLists = [
        <SwiperSlide key={1}><img src={mainImage2} alt="banner1" /></SwiperSlide>,
        <SwiperSlide key={2}><img src={mainImage1} alt="banner2" /></SwiperSlide>
    ];

    // 셋타임아웃 시작
    useEffect(() => {
        const autoTimer = setTimeout(() => setSlideTime(6000), 1000);
        return () => clearTimeout(autoTimer);
    }, []);

    return (
        <>
            <Swiper
                rewind={true}
                navigation={true}
                modules={[Navigation, Autoplay]} // Autoplay 모듈 추가
                className="mySwiper"
                autoplay={{
                    delay: slideTime,
                    disableOnInteraction: false, // 사용자가 슬라이드를 수동으로 넘겨도 자동 슬라이드 계속 유지
                    pauseOnMouseEnter: true, // 마우스 hover 시 일시정지
                }}
            >
                {bannerLists}
            </Swiper>
        </>
    );
}