import './FavoriteNote.css';
import { IoIosArrowForward } from "react-icons/io";


const FavoriteNote = () => {


    return (
        <div className={"main-favorite-note-container"}>
            <div className={"main-favorite-note-title-box"}>
                <h2 className={"main-favorite-note-title"}>오늘의 인기 단어장</h2>
                <div className={"main-favorite-note-more"}>
                    <p>더보기</p>
                    <IoIosArrowForward />
                </div>
            </div>
        </div>
    )
}

export default FavoriteNote;