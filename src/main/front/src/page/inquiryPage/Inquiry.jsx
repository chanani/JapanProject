import "../../styles/inquiry/Inquiry.css";

const Inquiry = () => {
    return (
        <div className="inquiry-container">
            <div className="inquiry-box">

                <div className="inquiry-title-box">
                    <h2>문의하기</h2>
                </div>

                <div className="inquiry-content-box">

                    <div className="inquiry-content-title">
                        <p>번호</p>
                        <p>분류</p>
                        <p>제목</p>
                        <p>글쓴이</p>
                        <p>등록일</p>
                    </div>

                    <div className="inquiry-content-detail">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inquiry;