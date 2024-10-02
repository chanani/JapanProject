package com.project.thejapenproject.inquiry.service;

import com.project.thejapenproject.command.InquiryVO;
import com.project.thejapenproject.inquiry.vo.GetInquiryListReqVO;
import com.project.thejapenproject.inquiry.vo.InquiryGetDetailResVO;
import com.project.thejapenproject.inquiry.vo.InquiryGetListResVO;
import com.project.thejapenproject.inquiry.vo.InquiryRegisterReqVO;
import com.project.thejapenproject.inquiry.vo.param.AddCommentParamVO;
import com.project.thejapenproject.inquiry.vo.param.CheckPasswordParamVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface InquiryMapper {

    // 문의사항 등
    public int insertData(InquiryRegisterReqVO inquiryRegisterReqVO);

    // 문의사항 전체 목록 조회
    public ArrayList<InquiryGetListResVO> getList(GetInquiryListReqVO getInquiryListReqVO);

    // 문의 사항 비밀번호 확인
    public Boolean checkPassword(CheckPasswordParamVO checkPasswordParamVO);

    // 문의 사항 상세 정보 조회
    public InquiryGetDetailResVO getDetails(int i록quiryNum);

    // 문의 사항 삭제
    public int deleteData(int inquiryNum);

    // 문의사항 키워드 검색
    public ArrayList<InquiryVO> searchInquiry(String word);

    // 문의사항 답글 등록
    public int addComment(AddCommentParamVO addCommentParamVO);

}
