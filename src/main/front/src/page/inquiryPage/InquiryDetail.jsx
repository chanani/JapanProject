import React from "react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { LexicalEditor } from "lexical";
import {Grid} from "@mui/material";
import EditorWrapper from "../../component/Editor/Editor";

const InquiryDetail = () => {
    const [data, setData] = useState([]);
    const [content, setContent] = useState("");
    // inquiry_num 가져오기
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const inquiryNum = queryParams.get('inquiry_num');

    // 공지사항 상세정보 불러오는 API
    const getDetails = () => {
        axiosInstance.get('inquiry/getDetails', {
            params: {
                inquiry_num: inquiryNum
            }
        })
            .then((res) => {
                console.log(res.data.inquiry_content);
                setData(res.data);
                setContent(res.data.inquiry_content); // 에디터에 표시할 내용 설정
            })
    }

    useEffect(() => {
        getDetails();
    }, []);

    return (
        <div className="inquiry-detail-container">
            <div className="inquiry-detail-box">
                <div className="inquiry-detail-title">
                    <p>{data.inquiry_title}</p>
                </div>
                <div className="inquiry-detail-info">
                    <p>{data.inquiry_writer} / {moment(data.inquiry_regdate).format('YYYY.MM.DD')}</p>
                </div>
                <div>
                    <div className="inquiry-detail-content-box">


                    </div>
                </div>

                <div className="inquiry-detail-comment-box">
                    {/* 댓글 등의 내용을 표시할 부분 */}
                </div>
            </div>
        </div>
    );
}

export default InquiryDetail;
