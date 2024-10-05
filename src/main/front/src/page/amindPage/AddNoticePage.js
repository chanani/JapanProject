import React, {useContext, useEffect, useState} from "react";
import "../../styles/adminPage/AddNoticePage.css";
import {tokenInfoContext} from "../../component/TokenInfoProvider";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {Grid} from "@mui/material";
import EditorWrapper from "../../component/Editor/Editor";


const AddNoticePage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const {userRole} = useContext(tokenInfoContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (userRole !== 'role_admin') {
            toast.error('해당 페이지는 관리자 외에는 접근이 불가합니다.');
            navigate("/");
        }
    }, [userRole]);


    // 제목 수정 핸들러
    const handleTitle = (event) => {
        let input_value = event.target.value;
        setTitle(input_value);
    }

    // 공지사항 등록 핸들러
    const handleSubmit = async () => {
        try {
            // 공지사항 등록
            const noticeResponse = await axiosInstance.post('admin/addNotice', {
                noticeTitle: title,
                noticeContent: content
            })
                .then(res => toast.success('공지사항이 등록되었습니다.'))
                .catch("공지사항 등록에 실패하였습니다.")
            // 카프카 Topic 등록
            // await axiosInstance.post('kafka/send', {message: content})
            // toast.success("정상적으로 등록되었습니다.");
            navigate("/");
        } catch (error) {
            if (error.response && error.response.status === 403) toast.error("등록에 실패하였습니다. 관리자에게 문의해주세요.");
            else toast.error("등록에 실패하였습니다. 관리자에게 문의해주세요.");
        }
    }

    return (
        <div className="notice-box-all">
            <div className="notice-box">
                <div className="noticePage-title-box">
                    <p>공지사항 작성</p>
                </div>
                <div className="notice-title-box">
                    <p>제목</p>
                    <input type="text"
                           id="notice-title"
                           value={title}
                           onChange={handleTitle}
                           placeholder="제목을 입력해주세요."
                    />
                </div>
                <div className="notice-content-box">

                    <Grid container sx={{minHeight: "100%", marginTop: "10px"}}
                          justifyContent="center"
                          flexDirection="column">
                        <Grid item xs={12} sx={{width: "100%"}}>
                            <EditorWrapper
                                setEditorContent={setContent}
                                submitHandler={handleSubmit}
                                historyPath="/notice"
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default AddNoticePage;