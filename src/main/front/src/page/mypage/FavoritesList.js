import {useContext, useEffect, useState} from "react";
import "../../styles/mypage/FavoritesList.css";
import {FaRegTrashAlt} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";
import Select from "react-select";
import {BsPencilSquare} from "react-icons/bs";
import Audio from "../../component/Audio";
import moment from "moment/moment";
import {IoClose} from "react-icons/io5";
import {BiSave} from "react-icons/bi";
import PageNation from "../../component/PageNation";
import usePagination from "../../hook/usePagination";

const FavoritesList = () => {
    const {userRole, username} = useContext(tokenInfoContext);
    const navigate = useNavigate();
    const [word, setWord] = useState([]); // 단어 목록
    const [selectedValue, setSelectedValue] = useState("new"); // 정렬 값
    const [editingIndex, setEditingIndex] = useState(null); // 메모 편집 중인 단어 인덱스
    const [memoInput, setMemoInput] = useState(""); // 메모 입력값

    const [totalData, setTotalData] = useState(0);
    const [perPage, setPerPage] = useState(10); // 보여줄 목록 수
    const pagesPerRange = 5; // 표시할 페이지 수

    // 페이지 네이션 hook 관리
    const {
        currentPage,
        totalPages,
        startPage,
        endPage,
        handlePageChange,
        setCurrentPage
    } = usePagination({
        totalItems: totalData,
        itemsPerPage: perPage,
        pagesPerRange
    });


    // 정렬 목록
    const selectOptions = [
        {value: "new", label: "최신순"},
        {value: "older", label: "오랜된순"},
        {value: "random", label: "랜덤"}
    ];

    // 정렬 변경 핸들러
    const changeSelect = (value) => {
        setCurrentPage(1);
        setSelectedValue(value);
    }

    // 즐겨찾기 단어 삭제 핸들러
    const handleFavorite = (index) => {
        if (!window.confirm('즐겨찾기에서 삭제하시겠습니까?')) return;
        const newData = [...word];
        newData[index].wordFavorite = !newData[index].wordFavorite;
        if (!newData[index].wordFavorite) {
            newData.splice(index, 1);
            setWord(newData);
        }
        deleteFavorite(index);
    };

    // 즐겨찾기 삭제 API
    const deleteFavorite = (index) => {
        axiosInstance.get(`study/addFavorite/${word[index].wordNum}/${word[index].wordFavorite}/${username}`)
            .catch(err => toast.error("데이터 삭제 중 오류가 발생하였습니다. 관리자에게 문의해주세요."));
    };

    // 단어 학습 페이지로 이동
    const handleStudy = () => {
        getFavoriteList(1000000).then((updatedWord) => {
            navigate("/study", { state: { arr: updatedWord } });
        });
    };


    // 단어 작성 핸들러
    const handleMemoEdit = (index) => {
        setEditingIndex(index);
        setMemoInput(word[index].favoriteMemo || ""); // 기존 메모 값 불러오기
    };

    // 메모 저장하기
    const saveMemo = (index) => {
        if (!!!memoInput) return toast.error("메모를 입력해주세요.");
        const updatedWord = [...word];
        updatedWord[index].favoriteMemo = memoInput; // 메모 내용
        setWord(updatedWord);
        setEditingIndex(null);
        let favoriteNum = updatedWord[index].favoriteNum; // 즐겨찾기 항목 번호
        axiosInstance.post('/mypage/update-favorite-memo', {
            favoriteNum: favoriteNum,
            favoriteMemo: memoInput
        })
            .then(() => {
                toast.success("메모가 저장되었습니다.");
            })
            .catch(() => toast.error("메모 저장 중 오류가 발생했습니다."));
    };

    // 즐겨찾기 목록 조회  API
    // 즐겨찾기 목록 조회 API
    const getFavoriteList = (toStudySize = perPage) => {
        return axiosInstance.post('mypage/favorite', {
            username: username,
            page: currentPage,
            size: toStudySize,
            sort: selectedValue,
        })
            .then((res) => {
                setWord(res.data.content);
                setTotalData(res.data.totalElements); // 전체 데이터 수
                return res.data.content; // 업데이트된 데이터를 반환
            })
            .catch((e) => {
                toast.error('조회 중 오류가 발생하였습니다.');
                return []; // 오류 발생 시 빈 배열 반환
            });
    };

    // 페이지 진입 시 조회
    useEffect(() => {
        if (userRole === "none") {
            toast.error("로그인 후 이용해주세요.");
            navigate("/login");
        } else {
            getFavoriteList();
            window.scroll(0, 0);
        }
    }, [currentPage, selectedValue]);



    return (
        <div className="favorite-page-all">
            <div className="favorite-page-mid">
                <div className="favorite-info">
                    <p>단어 즐겨찾기</p>
                </div>

                <div className="favorite-page-category-box">
                    <Select
                        className="selectItem"
                        onChange={(e) => changeSelect(e.value)}
                        options={selectOptions}
                        placeholder="정렬"
                        value={selectOptions.find(option => option.value === selectedValue)}
                    />
                    <div className="favorite-page-study-box" onClick={handleStudy}>
                        <div>즐겨찾기 단어 학습</div>
                    </div>
                </div>

                <div className="favorite-data">
                    {word?.map((item, index) => (
                        <div className="favorite-box" key={index}>
                            <div className="favorite-data-top">
                                <div className="favorite-data-top-content">
                                    <p>{item?.wordContent}{item?.wordChinese && `(${item?.wordChinese})`}</p>
                                </div>
                                <div className="favorite-data-top-audio-box">
                                    <Audio inputData={item.wordContent}/>
                                </div>
                            </div>

                            <div className="favorite-data-middle">
                                {item?.wordMeaning.split(",").map((meaning, i) => (
                                    <div key={i}>{i + 1}. {meaning}</div>
                                ))}
                            </div>

                            {editingIndex === index ? (
                                <div className="favorite-data-memo">
                                    <div>
                                        <span>메모</span>
                                        <div>
                                            <BiSave onClick={() => saveMemo(index)}/>
                                            <IoClose onClick={() => setEditingIndex(null)}/>
                                        </div>
                                    </div>

                                    <input
                                        type="text"
                                        value={memoInput}
                                        onChange={(e) => setMemoInput(e.target.value)}
                                        maxLength={20}
                                        className="favorite-data-memo-input"
                                    />
                                    <hr/>
                                </div>
                            ) : (
                                item?.favoriteMemo && (
                                    <div className="favorite-data-memo">
                                        <div>
                                            <span>메모</span>

                                        </div>
                                        <input type="text"
                                               value={item?.favoriteMemo}
                                               readOnly={true}
                                               className="favorite-data-memo-input-value"
                                               maxLength={30}/>
                                    </div>
                                )
                            )}

                            <div className="favorite-data-bottom">
                                <div className="favorite-data-bottom-creat-time">
                                    <p>{moment(item?.favoriteRegdate).format('YYYY.MM.DD')} 저장</p>
                                </div>
                                <div className="favorite-data-bottom-icon-box">
                                    {editingIndex !== index && (
                                        <BsPencilSquare size={18} onClick={() => handleMemoEdit(index)}/>
                                    )}
                                    <FaRegTrashAlt size={17} onClick={() => handleFavorite(index)}/>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                <PageNation
                    currentPage={currentPage}
                    startPage={startPage}
                    endPage={endPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                    pagesPerRange={pagesPerRange}
                    divMargin={"30px 0"}
                />

            </div>

        </div>
    );
};

export default FavoritesList;
