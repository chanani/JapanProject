import '../../styles/MainPage.css'
import mainImage1 from '../../image/mainImage1.png'
import mainImage2 from '../../image/mainImage2.png'
import mainImage3 from '../../image/mainImage3.png'
import { useEffect } from 'react'
function MainPage(){

  useEffect(() => {
  }, [])

  return (
    <div>
      <img src={mainImage1} alt="이미지1" className='image1'/>
      <img src={mainImage2} alt="이미지2" />
      <img src={mainImage3} alt="이미지3" />
    </div>
  );
}

export default MainPage;