import "../../styles/inquiry/InquiryWrite.css"

const InquiryWrite = () => {
    return (
        <div className="inquiry-write-container">
            <div className="inquiry-write-box">
                <div>
                    <h1>글쓰기</h1>
                </div>
                <div className="inquiry-write-title-box">
                    <div className="inquiry-write-kind-detail">
                        <p>분류</p>
                        <select name="" id="">
                            <option value="기타">기타</option>
                            <option value="광고">광고</option>
                        </select>
                    </div>
                    <div className="inquiry-write-title-detail">
                        <p>제목</p>
                        <input type="text" placeholder="제목을 입력해주세요."/>
                    </div>
                </div>
                <div className="inquiry-write-writer-box">
                    <div className="inquiry-write-writer-detail">
                        <p>글쓴이</p>
                        <input type="text" placeholder="이름을 입력해주세요."/>
                    </div>
                    <div className="inquiry-write-email-detail">
                        <p>이메일</p>
                        <input type="email" placeholder="이메일을 입력해주세요."/>
                    </div>
                </div>
                <div className="inquiry-write-password-box">
                    <div className="inquiry-write-password-detail">
                        <p>비밀번호</p>
                        <input type="password" placeholder="비밀번호를 입력해주세요."/>
                    </div>
                    <div className="inquiry-write-password-check-detail">
                        <p>비밀번호 확인</p>
                        <input type="password" placeholder="비밀번호를 확인해주세요."/>
                    </div>
                </div>
                <div>
                    <input type="checkbox"/>
                    
                </div>

            </div>
        </div>
    )
}

export default InquiryWrite