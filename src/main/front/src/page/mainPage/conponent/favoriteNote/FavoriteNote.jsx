import './FavoriteNote.css';
import { IoIosArrowForward } from "react-icons/io";
import FavoriteNoteList from "./FavoriteNoteList";

const FavoriteNote = () => {

    return (
        <div className={"main-favorite-note-container"}>
            <div className={"main-favorite-note-title-box"}>
                <h2 className={"main-favorite-note-title"}>오늘의 인기 단어장</h2>
                <div className={"main-favorite-note-more"}>
                    <p>더 보기</p>
                    <IoIosArrowForward />
                </div>
            </div>

            <FavoriteNoteList />


        </div>
    )
}

export default FavoriteNote;