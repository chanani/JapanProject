import "../../styles/study/SoloStudy.css"
import {FaPlus} from "react-icons/fa6";
import {IoSettingsOutline} from "react-icons/io5";
import {useNavigate} from "react-router-dom";

const SoloStudy = () => {
    const navigator = useNavigate();

    const handleAddPage = () => {
        navigator("/solo-study/add-word");
        window.scrollTo(0, 0);
    }

    const data = [
        {
        title: "안녕하세요 저는 한국인입",
        content: "내용입니다.",
        count: 10,
        writer: "chanhan12"
    },
        {
            title: "타이틀 2입니다.",
            content: "내용 2입니다.",
            count: 200,
            writer: "chanhan12"
        }, {
            title: "타이틀 2입니다.",
            content: "내용 2입니다.",
            count: 20,
            writer: "chanhan12"
        }, {
            title: "타이틀 2입니다.",
            content: "내용 2입니다.",
            count: 20,
            writer: "chanhan12"
        }];

    return (
        <div className="solo-study-container">
            <div className="solo-study-all">

                <div className="solo-study-header-sub-title">
                    <p>학습</p>
                </div>
                <div className="solo-study-header">
                    <p>내가 만드는 학습</p>
                </div>

                <div className="solo-study-content-all">
                    {data?.map((item, index) => (
                        <div className="solo-study-content-box" key={index}>
                            <div className="solo-study-title">
                                <p>{item.title}</p>
                            </div>
                            <div className="solo-study-count">
                                <p>{item.count} 단어</p>
                            </div>
                            <div className="solo-study-write">
                                <img
                                    className="header-user-icon"
                                    src={`https://lg.thejapan.today/icon-image/스크린샷 2024-08-29 오후 4.48.30.png`}
                                    alt="이미지"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/default_icon.svg";
                                    }}
                                />
                                <p>{item.writer}</p>

                            </div>
                            <div className="solo-study-setting-box">
                                <IoSettingsOutline size={20}/>
                            </div>
                        </div>
                    ))}
                    <div className="solo-study-content-add-box"
                         onClick={handleAddPage}>
                        <FaPlus size={28} color="rgb(130 129 129)"/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SoloStudy;