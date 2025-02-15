import './FavoriteNoteList.css';
import {useContext, useEffect, useState} from "react";
import {axiosInstance} from "../../../../api";
import {toast} from "react-toastify";
import {TiHeartFullOutline, TiHeartOutline} from "react-icons/ti";
import {tokenInfoContext} from "../../../../component/TokenInfoProvider";
import {useNavigate} from "react-router-dom";


const FavoriteNoteList = () => {

    const {userRole, username} = useContext(tokenInfoContext);
    const [favoriteNote, setFavoriteNote] = useState([]); // 단어장 목록
    const [choiceModal, setChoiceModal] = useState(false); // 선택창 모달 여부
    const [choiceSetNum, setChoiceSetNum] = useState(0);
    const navigator = useNavigate();

    // 모달 여는 핸들러
    const handleOnModal = (index) => {
        setChoiceModal(true);
        setChoiceSetNum(favoriteNote[index].wsNum);
    }

    // 좋아요 핸들러
    const likeHandle = (index) => {
        if (userRole === 'none') return toast.error('로그인 후 이용해주세요.');
        axiosInstance.post('study/modify-like', {
            username: username,
            wsNum: favoriteNote[index].wsNum
        })
            .then((res) => {
                getFavoriteNotesAPI();
            })
            .catch((e) => toast.error('좋아요 중 오류가 발생했습니다.'));
    }

    // 학습페이지로 이동하는 핸들러
    const handleStudyPage = () => {
        getDetailDataAPI(choiceSetNum)
    }

    // 학습 페이지로 가기 위해 단어 목록 조회 API
    const getDetailDataAPI = (wsNum) => {
        axiosInstance.post('study/get-set-detail-data', {
            wsNum: wsNum
        })
            .then((res) => {
                navigator('/study', {state: {soloWord: res.data.data}});
                window.scroll(0, 0)
            })
            .catch((err) => toast.error(err));
    }


    // 단어장 목록 조회 API
    const getFavoriteNotesAPI = () => {
        axiosInstance.get('/get-favorite-notes',{
            params :{
                username : username && `${username}`
            }
        })
            .then((res) => {
                setFavoriteNote(res.data.data);
            })
            .catch(e => {
                toast.error("단어장 목록을 불러오는 중 오류가 발생하였습니다.")
            })
    }

    // 목록 조회 useEffect
    useEffect(() => {
        getFavoriteNotesAPI();
    }, [])

    return (
        <div className={"main-favorite-note-list-container"}>
            <div className="main-favorite-note-content-all">
                {favoriteNote?.map((item, index) => (
                    <div className="main-favorite-note-content-box" key={index}
                         onClick={() => handleOnModal(index)}>
                        <div className="main-favorite-note-content-title">
                            <p>{item.wsTitle}</p>
                        </div>
                        <div className="main-favorite-note-count">
                            <p>{item.totalCount} 단어</p>
                        </div>
                        <div className="main-favorite-note-write">
                            <img
                                className="header-user-icon"
                                src={`https://lg.thejapan.today/icon-image/${item?.userIconPath}`}
                                alt="이미지"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/default_icon.svg";
                                }}
                            />
                            <p>{item.username}</p>

                        </div>
                        <div className="main-favorite-note-setting-box">
                            <p>{item.wsHits}</p>
                            {!!!item.favorite ?
                                <TiHeartOutline size={20}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    likeHandle(index);
                                                }}/>
                                :
                                <TiHeartFullOutline size={20}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        likeHandle(index);
                                                    }}
                                                    color={"red"}/>
                            }
                        </div>
                    </div>
                ))}

                {choiceModal &&
                    <div className="main-favorite-note-modal-back-ground">
                        <div className="main-favorite-note-modal-all">
                            <div onClick={handleStudyPage}
                                 className="main-favorite-note-modal-move">
                                <p>단어 학습</p>
                            </div>

                            <button onClick={() => setChoiceModal(false)}>닫기</button>
                        </div>


                    </div>
                }

            </div>
        </div>
    )
}

export default FavoriteNoteList;