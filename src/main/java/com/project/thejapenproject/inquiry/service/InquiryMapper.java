package com.project.thejapenproject.inquiry.service;

import com.project.thejapenproject.command.InquiryVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface InquiryMapper {
    public int insertData(InquiryVO vo);
    public ArrayList<InquiryVO> getList();
    public Boolean checkPassword(InquiryVO vo);
    public InquiryVO getDetails(int inquiry_num);
}
