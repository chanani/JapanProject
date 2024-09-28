import React from "react";
import {useEffect, useState} from "react";
import {axiosInstance} from "../../api";
import moment from "moment";
import {useLocation, useNavigate} from "react-router-dom";
import "../../styles/inquiry/InquiryDetail.css";
import {TbSquareRoundedLetterAFilled} from "react-icons/tb";
import {TbSquareRoundedLetterQ} from "react-icons/tb";
import {FaRegTrashAlt} from "react-icons/fa";
import { PiChatCircleTextBold } from "react-icons/pi";
import {toast} from "react-toastify";
import {BiMessageRounded} from "react-icons/bi";

const InquiryDetail = () => {
    const [data, setData] = useState([]);
    const [textareaHeight, setTextareaHeight] = useState('auto');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const inquiryNum = queryParams.get('inquiry_num');
    const navigator = useNavigate();
    const handleChange = (event) => {
        setTextareaHeight(`${event.target.scrollHeight}px`);
    };

    // 문의 삭제 핸들러
    const deleteHandle = () => {
        if(window.confirm("문의내역을 삭제하시겠습니까?")){
            deleteAPI();
        }
    }

    // 문의 삭제 API
    const deleteAPI = () => {
        axiosInstance.get("inquiry/deleteData",{
            params : {
                inquiry_num : inquiryNum
            }
        })
            .then((res) => {
                if(res.status === 200) {
                    toast.success("문의내역에 삭제되었습니다.");
                    navigator("/inquiry");
                }
            })
            .catch(e => toast.error('문의내역 삭제중 오류가 발생하였습니다. 관리자에게 문의해주세요.'));
    }

    // 목록으로 가는 핸들러
    const listHandle = () => {
        navigator('/inquiry');
    }

    useEffect(() => {
        const getDetails = () => {
            axiosInstance.get('inquiry/getDetails', {
                params: {
                    inquiry_num: inquiryNum
                }
            })
                .then((res) => {
                    setData(res.data);
                })
        }

        getDetails();
    }, [inquiryNum]);

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
                            <FaRegTrashAlt size={16} onClick={deleteHandle}/>
                        </div>
                    </div>

                    <div>
                        <div className="inquiry-detail-content-box">
                            <div dangerouslySetInnerHTML={{__html: data.inquiry_content}}/>
                        </div>
                    </div>

                </div>

                {!data.inquiry_comment ?
                    <div className="inquiry-detail-comment-box">
                        <BiMessageRounded size={23}/>
                        <p>순차적으로 답변 중 입니다.</p>
                    </div>
                    :
                    <div className="inquiry-detail-comment-box">
                        <BiMessageRounded size={23}/>
                        <div dangerouslySetInnerHTML={{__html: data.inquiry_comment}}/>

                    </div>

                }

                <div className="inquiry-detail-button-box">
                    <button onClick={listHandle}>목록으로</button>
                </div>

            </div>
        </div>
    );
}

export default InquiryDetail;
