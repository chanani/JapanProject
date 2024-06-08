package com.project.thejapenproject.inquiry.service;

import com.project.thejapenproject.command.InquiryVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InquiryServiceImpl implements InquiryService {

    @Autowired
    public InquiryMapper inquiryMapper;

    @Override
    public int insertData(InquiryVO vo) {
        return inquiryMapper.insertData(vo);
    }
}
