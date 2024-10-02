import "../../styles/adminPage/AddInquiryCommentWrite.css";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";
import {BiMessageRounded} from "react-icons/bi";
import moment from "moment/moment";
import {Grid} from "@mui/material";
import EditorWrapper from "../../component/Editor/Editor";

const AddInquiryCommentWrite = () => {
    const [data, setData] = useState([]);
    const [inquiryComment, setInquiryComment] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const inquiryNum = queryParams.get('inquiry_num');
    const navigator = useNavigate();

    // 답글 submit 핸들러
    const submitHandler = () => {
        if (!inquiryComment) return toast.error('답글을 남겨주세요.');
        addCommentAPI();
    }

    // 답글 추가 핸들러
    const addCommentAPI = () => {
        axiosInstance.post('inquiry/addComment', {
            inquiry_num: inquiryNum,
            inquiry_comment: inquiryComment,
        })
            .then((res) => {
                if (res.status !== 200) return toast.error("답글 작성중 오류가 발생하였습니다. 관리자에게 문의해주세요.");
                toast.success('정상적으로 답글이 등록되었습니다.');
                getDetails();
            })
    }

    // 문의내역 조회 API
    const getDetails = () => {
        axiosInstance.get('inquiry/getDetails', {
            params: {
                inquiry_num: inquiryNum
            }
        })
            .then((res) => {
                setData(res.data);
                setInquiryComment(res.data.inquiry_comment);
            })
    }

    // 목록으로
    const listHandle = () => {
        navigator("/addInquiryComment");
    }

    // 문의내역 조회
    useEffect(() => {
        getDetails();
    }, [inquiryNum]);

    return (
        <div className="inquiry-container">
            <div className="inquiry-box">
                <div className="inquiry-title-box">
                    <p>문의내역</p>
                </div>
                <div className="inquiry-detail-content-container">
                    <div className="inquiry-detail-info">
                        <div className="inquiry-detail-info-title">
                            {!data.inquiry_comment ?
                                <p className="comment-result comment-result-n">답변대기</p> :
                                <p className="comment-result comment-result-y">답변완료</p>
                            }
                            <p className="inquiry-title">{data.inquiry_title}</p>
                        </div>
                        <div className="inquiry-detail-info-title2">
                            <p>{data.inquiry_writer} / {moment(data.inquiry_regdate).format('YYYY.MM.DD HH:mm')}</p>
                        </div>
                    </div>
                    <div>
                        <div className="inquiry-detail-content-box">
                            <div dangerouslySetInnerHTML={{__html: data.inquiry_content}}/>
                        </div>
                    </div>
                </div>


                {data.inquiry_comment ?
                    <div className="inquiry-detail-comment-box detail-box-margin-bottom">
                        <BiMessageRounded size={23}/>
                        <div dangerouslySetInnerHTML={{__html: data.inquiry_comment}}/>
                    </div>
                    :
                    <div className="inquiry-detail-comment-box detail-box-margin-bottom not-comment">

                        <div className="inquiry-write-content-box">
                            <Grid container sx={{minHeight: "100%", marginTop: "10px"}}
                                  justifyContent="center"
                                  flexDirection="column">
                                <Grid item xs={12} sx={{width: "100%"}}>
                                    <EditorWrapper
                                        setEditorContent={setInquiryComment}
                                        submitHandler={submitHandler}
                                        historyPath="/addInquiryComment"
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                }

                {data.inquiry_comment &&
                    <div className="inquiry-detail-button-box">
                        <button onClick={listHandle}>목록으로</button>
                    </div>
                }
            </div>
        </div>
    );
}

export default AddInquiryCommentWrite;