import "../../styles/inquiry/InquiryWrite.css"
import EditorWrapper from "../../component/Editor/Editor";
import React, {useContext, useEffect, useState} from "react";

import {Grid} from '@mui/material';
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";
import {Overlap} from "../../hook/Overlap";
import {useNavigate} from "react-router-dom";


const InquiryWrite = () => {
    const [inquiryTitle, setInquiryTitle] = useState("");
    const [inquiryWriter, setInquiryWriter] = useState("");
    const [inquiryEmail, setInquiryEmail] = useState("");
    const [inquiryPassword, setInquiryPassword] = useState("");
    const [inquiryPasswordCheck, setInquiryPasswordCheck] = useState("");
    const [infoCheck, setInfoCheck] = useState(false);
    const {userRole, username, accessToken, refreshToken} = useContext(tokenInfoContext);
    const [editorContent, setEditorContent] = useState("");
    const navigator = useNavigate();

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

    // 목록으로 가기
    const listHandle = () => {
        navigator("/inquiry");
        window.scroll(0, 0);
    }
    // 글 등록하기 API
    const inquirySaveAPI = () => {
        axiosInstance.post("inquiry/insertData", {
            inquiry_title: inquiryTitle,
            inquiry_content: editorContent,
            inquiry_writer: inquiryWriter,
            inquiry_email: inquiryEmail,
            inquiry_password: inquiryPassword,
        })
            .then((res) => {
                toast.success("정상적으로 글이 등록되었습니다.");
                navigator("/inquiry");
            })
            .catch(e => toast.error("글 등록 중 에러가 발생하였습니다."))
    }

    // 글쓰기 핸들러
    const submitHandler = () => {
        if (!inquiryTitle) return toast.error("제목을 입력해주세요.");
        if (!inquiryWriter) return toast.error("작성자를 입력해주세요.");
        if (!inquiryEmail) return toast.error("이메일을 입력해주세요.");
        if (!inquiryPassword) return toast.error("비밀번호를 입력해주세요.");
        if (!inquiryPasswordCheck) return toast.error("비밀번호 확인란을 입력해주세요.");
        if (!infoCheck) return toast.error("개인정보 수집 및 이용에 동의해주세요.");
        if (!Overlap("email", inquiryEmail)) return;
        if (inquiryPassword.length !== 4) return toast.error("비밀번호는 4자리에 맞춰 입력해주세요.");
        if (inquiryPassword !== inquiryPasswordCheck) return toast.error("비밀번호가 일치하지 않습니다.");
        inquirySaveAPI();
    }

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
                                setEditorContent={setEditorContent}
                                submitHandler={submitHandler}
                                historyPath="/inquiry"
                            />
                        </Grid>
                    </Grid>
                </div>

            </div>
        </div>
    )
}

export default InquiryWrite