import "../../styles/inquiry/InquiryWrite.css"
import EditorWrapper from "../../component/Editor/Editor";
import React, {useContext, useEffect, useState} from "react";

import {Grid} from '@mui/material';
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {axiosInstance} from "../../api";


const InquiryWrite = () => {
    const [inquiryTitle, setInquiryTitle] = useState("");
    const [inquiryWriter, setInquiryWriter] = useState("");
    const [inquiryEmail, setInquiryEmail] = useState("");
    const [inquiryPassword, setInquiryPassword] = useState("");
    const [inquiryPasswordCheck, setInquiryPasswordCheck] = useState("");
    const [infoCheck, setInfoCheck] = useState(false);
    const {userRole, username, accessToken, refreshToken} = useContext(tokenInfoContext);

    // 로그인한 유저가 접속하였을 경우 정보 가져오는 API
    const getUserAPI = () => {
        axiosInstance.get('mypage/data', {
            params : {
                username : username
            }
        })
            .then((res) => {
                setInquiryWriter(res.data.user_name);
                setInquiryEmail(res.data.user_email);
            })
            .catch((e) => console.log(e))
    }

    useEffect(() => {
        if(userRole !== 'none'){
            getUserAPI();
        }
    }, [userRole]);

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
                    <div className='inquiry-write-writer-detail' >
                        <p>글쓴이</p>
                        <input type="text"
                               placeholder="이름을 입력해주세요."
                               value={inquiryWriter}
                               onChange={(e) => setInquiryWriter(e.target.value)}
                               readOnly={userRole !== 'none' ? true : false}
                               className={userRole !== 'none' && "input-backGround"}
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