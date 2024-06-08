package com.project.thejapenproject.inquiry.service;

import com.project.thejapenproject.command.InquiryVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface InquiryMapper {
    public int insertData(InquiryVO vo);
}
