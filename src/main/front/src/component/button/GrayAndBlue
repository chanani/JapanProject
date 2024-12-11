import {useState} from "react";
import {useNavigate} from "react-router-dom";

const GrayAndBlue = ({width, text1, text2, homePath, movePath}) => {

    const navigate = useNavigate();
    const [homeHover, setHomeHover] = useState(false);
    const [submitHover, setSubmitHover] = useState(false);

    // 홈 또는 목록으로 가는 핸들러
    const handleHome = () => {
        navigate(homePath)
    }

    const handleMove = () => {
        //homePath()
        movePath();
    }

    const grayAndBlueBtn = () => {
        return (
            <div className="btn-box"
                 style={{
                     width: width,
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "space-between",
                     marginBottom: "30px"
                 }}>
                <button className="btn-home"
                        style={{
                            width: "47%",
                            padding: "12px",
                            fontSize: "16px",
                            fontWeight: 600,
                            transition: "all .12s cubic-bezier(.47, 0, .745, .715)",
                            border: "2px solid #d9dde8",
                            color: "56607c",
                            backgroundColor: homeHover ? "#e4e5e587" : "white",
                            borderRadius : "8px"
                        }}
                        onMouseEnter={() => setHomeHover(true)}
                        onMouseLeave={() => setHomeHover(false)}
                        onClick={handleHome}
                >
                    {text1}
                </button>
                <button className="btn-submit"
                        style={{
                            width: "47%",
                            padding: "12px",
                            fontSize: "16px",
                            fontWeight: 600,
                            transition: "all .12s cubic-bezier(.47, 0, .745, .715)",
                            border: "2px solid #4255ff",
                            backgroundColor: submitHover ? "#4c16f9" : "#4255ff",
                            color: "white",
                            borderRadius : "8px"
                        }}
                        onMouseEnter={() => setSubmitHover(true)}
                        onMouseLeave={() => setSubmitHover(false)}
                        onClick={handleMove}
                >
                    {text2}
                </button>
            </div>
        );
    };

    return grayAndBlueBtn();
}

export default GrayAndBlue;