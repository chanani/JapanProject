import "../../styles/inquiry/InquiryWrite.css"
import EditorWrapper, {Editor} from "../../component/Editor/Editor";
import React, {useState} from "react";

import {ThemeProvider, CssBaseline, Grid, Typography, createTheme} from '@mui/material';


const InquiryWrite = () => {
    const [inquiryTitle, setInquiryTitle] = useState("");
    const [inquiryWriter, setInquiryWriter] = useState("");
    const [inquiryEmail, setInquiryEmail] = useState("");
    const [inquiryPassword, setInquiryPassword] = useState("");
    const [inquiryPasswordCheck, setInquiryPasswordCheck] = useState("");
    const [infoCheck, setInfoCheck] = useState(false);
    return (
        <div className="inquiry-write-container">
            <div className="inquiry-write-box">
                <div>
                    <h1>글쓰기</h1>
                </div>
                <div className="inquiry-write-title-box">

                    <div className="inquiry-write-title-detail">
                        <p>제목</p>
                        <input type="text"
                               placeholder="제목을 입력해주세요."
                               value={inquiryTitle}
                               onChange={(e) => setInquiryTitle(e.target.value)}
                        />
                    </div>
                </div>
                <div className="inquiry-write-writer-box">
                    <div className="inquiry-write-writer-detail">
                        <p>글쓴이</p>
                        <input type="text"
                               placeholder="이름을 입력해주세요."
                               value={inquiryWriter}
                               onChange={(e) => setInquiryWriter(e.target.value)}
                        />
                    </div>
                    <div className="inquiry-write-email-detail">
                        <p>이메일</p>
                        <input type="email"
                               placeholder="이메일을 입력해주세요."
                               value={inquiryEmail}
                               onChange={(e) => setInquiryEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="inquiry-write-password-box">
                    <div className="inquiry-write-password-detail">
                        <p>비밀번호</p>
                        <input type="password"
                               placeholder="비밀번호를 입력해주세요."
                               value={inquiryPassword}
                               onChange={(e) => setInquiryPassword(e.target.value)}
                        />
                    </div>
                    <div className="inquiry-write-password-check-detail">
                        <p>비밀번호 확인</p>
                        <input type="password"
                               placeholder="비밀번호를 확인해주세요."
                               value={inquiryPasswordCheck}
                               onChange={(e) => setInquiryPasswordCheck(e.target.value)}
                        />
                    </div>
                </div>

                <div className='inquiry-checkbox'>
                    <label htmlFor="inquiry-check">
                        <input type="checkbox" id="inquiry-check"
                               checked={infoCheck}
                               onChange={(e) => setInfoCheck(currState => !currState)}
                        />
                        <span><strong>개인정보 수집 및 이용</strong>에 동의합니다.</span>
                    </label>
                </div>

                <div className="inquiry-write-content-box">
                    <Grid container sx={{minHeight: "100%", marginTop: "10px"}}
                          justifyContent="center"
                          flexDirection="column">
                        <Grid item xs={12} sx={{width: "100%"}}>
                            <EditorWrapper
                                inquiryTitle={inquiryTitle}
                                inquiryWriter={inquiryWriter}
                                inquiryEmail={inquiryEmail}
                                inquiryPassword={inquiryPassword}
                                inquiryPasswordCheck={inquiryPasswordCheck}
                                infoCheck={infoCheck}

                            />
                        </Grid>
                    </Grid>
                </div>

            </div>
        </div>
    )
}

export default InquiryWrite