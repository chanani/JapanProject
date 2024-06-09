import React from "react";
import {useEffect, useState} from "react";
import {axiosInstance} from "../../api";
import moment from "moment";
import {useLocation} from "react-router-dom";
import "../../styles/inquiry/InquiryDetail.css";
import {TbSquareRoundedLetterAFilled} from "react-icons/tb";
import { TbSquareRoundedLetterQ } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";

const InquiryDetail = () => {
    const [data, setData] = useState([]);
    // inquiry_num 가져오기
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const inquiryNum = queryParams.get('inquiry_num');
    const [textareaHeight, setTextareaHeight] = useState('auto');

    const handleChange = (event) => {
        setTextareaHeight(`${event.target.scrollHeight}px`);
    };
    // 공지사항 상세정보 불러오는 API
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

    useEffect(() => {
        getDetails();
    }, []);

    return (
        <div className="inquiry-detail-container">
            <div className="inquiry-detail-box">
                <div className="inquiry-detail-title">
                    <p>문의내역</p>
                </div>
                <div className="inquiry-detail-info">
                    <div className="inquiry-detail-info-title">
                        <TbSquareRoundedLetterQ size={35}/>
                        {!data.inquiry_comment ?
                            <p className="comment-result">답변대기</p> :
                            <p className="comment-result">답변완료</p>
                        }
                        <p className="inquiry-title">{data.inquiry_title}</p>
                    </div>
                    <div className="inquiry-detail-info-title2">
                        <p>{data.inquiry_writer} / {moment(data.inquiry_regdate).format('YYYY.MM.DD HH:mm')}</p>
                        <FaRegTrashAlt size={18}/>

                    </div>

                </div>
                <div>
                <div className="inquiry-detail-content-box">
                        <div dangerouslySetInnerHTML={{__html: data.inquiry_content}}/>
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
                            value="asdkajdasd
                            asdasdlhasld
                            asdasdasd"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InquiryDetail;
