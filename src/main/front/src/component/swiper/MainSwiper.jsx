import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import '../../styles/component/swiper/MainSwiper.css';

import mainImage1 from '../../image/main/swiper_image1.jpg';
import mainImage2 from '../../image/main/swiper_image2.jpg';


// import required modules
import { Navigation } from 'swiper/modules';

export default function MainSwiper() {
    return (
        <>
            <Swiper
                rewind={true}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >

                <SwiperSlide><img src={mainImage1}/></SwiperSlide>
                <SwiperSlide><img src={mainImage2}/></SwiperSlide>
            </Swiper>
        </>
    );
}
