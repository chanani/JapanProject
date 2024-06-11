import "../../styles/adminPage/AddInquiryCommentWrite.css";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {axiosInstance} from "../../api";
import {toast} from "react-toastify";
import {TbSquareRoundedLetterAFilled, TbSquareRoundedLetterQ} from "react-icons/tb";
import moment from "moment/moment";
import {PiChatCircleTextBold} from "react-icons/pi";

const AddInquiryCommentWrite = () => {
    const [data, setData] = useState([]);
    const [inquiryComment, setInquiryComment] = useState("");
    const [textareaHeight, setTextareaHeight] = useState('auto');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const inquiryNum = queryParams.get('inquiry_num');
    const navigator = useNavigate();
    const handleChange = (event) => {
        setInquiryComment(event.target.value);
        setTextareaHeight(`${event.target.scrollHeight}px`);
    };


    // 목록으로 가는 핸들러
    const listHandle = () => {
        navigator('/addInquiryComment');
    }
    // 답글 submit 핸들러
    const submitHandle = () => {
        if(!inquiryComment) return toast.error('답글을 남겨주세요.');
        addCommentAPI();
    }
    // 답글 추가 핸들러
    const addCommentAPI = () => {
        axiosInstance.post('inquiry/addComment', {
            inquiry_num: inquiryNum,
            inquiry_comment: inquiryComment,
        })
            .then((res) => {
                if(res.status !== 200) return toast.error("답글 작성중 오류가 발생하였습니다. 관리자에게 문의해주세요.");
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
    // 문의내역 조회
    useEffect(() => {
        getDetails();
    }, [inquiryNum]);

    // textarea 크기 조절
    useEffect(() => {
        if (data.inquiry_comment) {
            const textarea = document.querySelector('.inquiry-detail-comment-text > textarea');
            if (textarea) {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
            }
        }
    }, [data.inquiry_comment]);

    return (
        <div className="inquiry-detail-container">
            <div className="inquiry-detail-box">
                <div className="inquiry-detail-title">
                    <p>문의내역</p>
                </div>
                <div className="inquiry-detail-content-container">
                    <div className="inquiry-detail-info">
                        <div className="inquiry-detail-info-title">
                            <TbSquareRoundedLetterQ size={35}/>
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

                <div className="inquiry-detail-comment-box">
                    <div className="inquiry-detail-comment-image">
                        <TbSquareRoundedLetterAFilled size={35}/>
                    </div>
                    <div className="inquiry-detail-comment-text">
                            <textarea
                                onChange={handleChange}
                                style={{height: textareaHeight}}
                                value={inquiryComment ? inquiryComment : ""}
                            />
                    </div>
                </div>

                <div className="inquiry-detail-button-box">
                    <button onClick={listHandle}>목록으로 가기</button>
                    <button onClick={submitHandle} className="comment-button">답글 작성하기</button>
                </div>
            </div>
        </div>
    );
}

export default AddInquiryCommentWrite;