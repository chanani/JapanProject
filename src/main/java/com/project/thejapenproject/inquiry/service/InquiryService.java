package com.project.thejapenproject.inquiry.service;

import com.project.thejapenproject.command.InquiryVO;
import com.project.thejapenproject.common.utils.PageResponse;
import com.project.thejapenproject.inquiry.vo.GetInquiryListReqVO;
import com.project.thejapenproject.inquiry.vo.InquiryGetDetailResVO;
import com.project.thejapenproject.inquiry.vo.InquiryGetListResVO;
import com.project.thejapenproject.inquiry.vo.InquiryRegisterReqVO;
import com.project.thejapenproject.inquiry.vo.param.AddCommentParamVO;
import com.project.thejapenproject.inquiry.vo.param.CheckPasswordParamVO;

import java.util.ArrayList;

public interface InquiryService {
    public void insertData(InquiryRegisterReqVO inquiryRegisterReqVO);
    public PageResponse<InquiryGetListResVO> getList(GetInquiryListReqVO getInquiryListReqVO);
    public Boolean checkPassword(CheckPasswordParamVO checkPasswordParamVO);
    public InquiryGetDetailResVO getDetails(int inquiry_num);
    public void deleteData(int inquiry_num);
    public void addComment(AddCommentParamVO addCommentParamVO);
}
