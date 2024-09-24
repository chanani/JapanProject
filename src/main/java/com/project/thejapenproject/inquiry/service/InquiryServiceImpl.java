package com.project.thejapenproject.inquiry.service;

import com.project.thejapenproject.command.InquiryVO;
import com.project.thejapenproject.command.NoticeVO;
import com.project.thejapenproject.common.utils.PageResponse;
import com.project.thejapenproject.inquiry.vo.GetInquiryListReqVO;
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

    // 문의하기 전체 목록 조회
    @Override
    public PageResponse<InquiryVO> getList(GetInquiryListReqVO getInquiryListReqVO) {
        Integer page = getInquiryListReqVO.getPage();
        Integer size = getInquiryListReqVO.getSize();
        getInquiryListReqVO.setOffset((page - 1) * size);

        // 목록 조회
        ArrayList<InquiryVO> inquiryList = inquiryMapper.getList(getInquiryListReqVO);

        // 총 데이터 수 계산
        int totalElements = inquiryList.size() != 0 ? inquiryList.get(0).getTotalElements() : 0;
        // 총 페이지 수 계산
        int totalPages = (int) Math.ceil((double) totalElements / size);

        PageResponse<InquiryVO> responseData = PageResponse.<InquiryVO>builder()
                .content(inquiryList)
                .page(page)
                .size(size)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .build();
        return responseData;
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
