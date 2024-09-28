package com.project.thejapenproject.inquiry.service;

import com.project.thejapenproject.command.InquiryVO;
import com.project.thejapenproject.inquiry.vo.GetInquiryListReqVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface InquiryMapper {
    public int insertData(InquiryVO vo);

    // 문의사항 전체 목록 조회
    public ArrayList<InquiryVO> getList(GetInquiryListReqVO getInquiryListReqVO);
    public Boolean checkPassword(InquiryVO vo);
    public InquiryVO getDetails(int inquiry_num);
    public int deleteData(int inquiry_num);
    public ArrayList<InquiryVO> searchInquiry(String word);
    public int addComment(InquiryVO vo);

}
