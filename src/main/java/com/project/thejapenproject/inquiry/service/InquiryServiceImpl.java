package com.project.thejapenproject.inquiry.service;

import com.project.thejapenproject.command.InquiryVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class InquiryServiceImpl implements InquiryService {

    @Autowired
    public InquiryMapper inquiryMapper;

    @Override
    public int insertData(InquiryVO vo) {
        return inquiryMapper.insertData(vo);
    }

    @Override
    public ArrayList<InquiryVO> getList() {
        return inquiryMapper.getList();
    }

    @Override
    public Boolean checkPassword(InquiryVO vo) {
        return inquiryMapper.checkPassword(vo);
    }

    @Override
    public InquiryVO getDetails(int inquiry_num) {
        return inquiryMapper.getDetails(inquiry_num);
    }

    @Override
    public int deleteData(int inquiry_num) {
        return inquiryMapper.deleteData(inquiry_num);
    }

    @Override
    public ArrayList<InquiryVO> searchInquiry(String word) {
        return inquiryMapper.searchInquiry(word);
    }

    @Override
    public int addComment(InquiryVO vo) {
        return inquiryMapper.addComment(vo);
    }
}
