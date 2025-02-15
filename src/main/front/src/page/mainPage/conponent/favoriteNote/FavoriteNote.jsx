import './FavoriteNote.css';
import { IoIosArrowForward } from "react-icons/io";
import {useEffect, useState} from "react";
import {axiosInstance} from "../../../../api";
import {toast} from "react-toastify";


const FavoriteNote = () => {

    // 단어장 목록
    const [favoriteNote, setFavoriteNote] = useState([]);

    // 단어장 목록 조회 API
    const getFavoriteNotesAPI = () => {
        axiosInstance.get("/get-favorite-notes")
            .then((res) => {
                console.log(res);
            })
            .catch(e => {
                toast.error("단어장 목록을 불러오는 중 오류가 발생하였습니다.")
            })
    }


    useEffect(() => {
        getFavoriteNotesAPI();
    }, [])

    return (
        <div className={"main-favorite-note-container"}>
            <div className={"main-favorite-note-title-box"}>
                <h2 className={"main-favorite-note-title"}>오늘의 인기 단어장</h2>
                <div className={"main-favorite-note-more"}>
                    <p>더 보기</p>
                    <IoIosArrowForward />
                </div>
            </div>
        </div>
    )
}

export default FavoriteNote;