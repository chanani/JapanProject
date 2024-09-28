import '../../styles/MainPage.css';
import mainImage1 from '../../image/mainImage1.png';
import { useEffect, useState } from 'react';

function MainPage() {

    return (
        <div className="main-image-container">
            <img
                src={mainImage1}
                alt="이미지1"
            />
        </div>
    );
}

export default MainPage;
