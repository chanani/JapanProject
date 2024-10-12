import "../../styles/study/SoloAdd.css"
import {IoMdArrowDropright} from "react-icons/io";
import {useState} from "react";

const SoloAdd = () => {
    const [title, setTitle] = useState("");

    // 제목 변경 핸들러
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const data = [{
        wordContent: "dadad",
        wordMeaning: "한글로 해석합니다.",
        wordChinese: "중국어",
    }, {
        wordContent: "qwer",
        wordMeaning: "한글로 해석2합니다.",
        wordChinese: "중국어",
    },
        {
            wordContent: "zxcv",
            wordMeaning: "한글로 해석1합니다.",
            wordChinese: "중국어1",
        }, {
            wordContent: "asdf",
            wordMeaning: "한글로 해석3합니다.",
            wordChinese: "중국어2",
        }, {
            wordContent: "ggggg",
            wordMeaning: "한글로 해석4합니다.",
            wordChinese: "중국어3",
        }];

    return (
        <div className="solo-add-container">
            <div className="solo-add-all">

                <div className="solo-add-header-sub-title">
                    <p>내가 만드는 학습</p>
                </div>
                <div className="solo-add-header">
                    <p>학습 단어 추가</p>
                </div>

                <div className="solo-add-title-all">
                    {title !== "" &&
                        <p>제목</p>
                    }
                    <input
                        className={(title !== "" ? "solo-add-title-input-value" :
                            "solo-add-title-input-not-value")}
                        type="text"
                        placeholder="제목을 입력하세요"
                        onChange={handleTitleChange}
                        value={title}/>
                </div>

                <div className="solo-add-content-all">

                    <div className="solo-add-content-all-title">
                        <IoMdArrowDropright/>
                        <p>직접 단어 추가</p>
                    </div>

                    <div className="solo-add-word-all">
                        <div className="solo-add-word-box">
                            <div className="solo-add-word-header">
                                <p>1</p>
                                <p>T</p>
                            </div>

                            <div className="solo-add-word-content">
                                <div>
                                    <input type="text"/>
                                    <p>단어</p>
                                </div>
                                <div>
                                    <input type="text"/>
                                    <p>한자</p>
                                </div>
                                <div>
                                    <input type="text"/>
                                    <p>뜻</p>
                                </div>
                            </div>
                        </div>

                        <div className="solo-add-word-box">
                            <div className="solo-add-word-header">
                                <p>1</p>
                                <p>T</p>
                            </div>

                            <div className="solo-add-word-content">
                                <div>
                                    <input type="text"/>
                                    <p>단어</p>
                                </div>
                                <div>
                                    <input type="text"/>
                                    <p>한자</p>
                                </div>
                                <div>
                                    <input type="text"/>
                                    <p>뜻</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="solo-add-word-all">

                    <div className="solo-add-word-all-title">
                        <IoMdArrowDropright/>
                        <p>골라서 단어 추가</p>
                    </div>

                    <div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default SoloAdd;