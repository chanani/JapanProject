package com.project.thejapenproject.inquiry.service;

import com.project.thejapenproject.command.InquiryVO;

import java.util.ArrayList;

public interface InquiryService {
    public int insertData(InquiryVO vo);
    public ArrayList<InquiryVO> getList();
    public Boolean checkPassword(InquiryVO vo);
    public InquiryVO getDetails(int inquiry_num);
}
