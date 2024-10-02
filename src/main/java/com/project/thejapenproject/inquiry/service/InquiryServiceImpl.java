package com.project.thejapenproject.inquiry.service;

import com.project.thejapenproject.command.InquiryVO;
import com.project.thejapenproject.command.NoticeVO;
import com.project.thejapenproject.command.exception.OperationErrorException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.utils.PageResponse;
import com.project.thejapenproject.inquiry.vo.GetInquiryListReqVO;
import com.project.thejapenproject.inquiry.vo.InquiryGetDetailResVO;
import com.project.thejapenproject.inquiry.vo.InquiryGetListResVO;
import com.project.thejapenproject.inquiry.vo.InquiryRegisterReqVO;
import com.project.thejapenproject.inquiry.vo.param.AddCommentParamVO;
import com.project.thejapenproject.inquiry.vo.param.CheckPasswordParamVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class InquiryServiceImpl implements InquiryService {

    @Autowired
    public InquiryMapper inquiryMapper;

    @Override
    public void insertData(InquiryRegisterReqVO inquiryRegisterReqVO) {
        if(inquiryMapper.insertData(inquiryRegisterReqVO) < 1){
            throw new OperationErrorException(ErrorCode.FAIL_TO_REGISTER_INQUIRY);
        }
    }

    // 문의하기 전체 목록 조회
    @Override
    public PageResponse<InquiryGetListResVO> getList(GetInquiryListReqVO getInquiryListReqVO) {
        Integer page = getInquiryListReqVO.getPage();
        Integer size = getInquiryListReqVO.getSize();
        getInquiryListReqVO.setOffset((page - 1) * size);

        // 목록 조회
        ArrayList<InquiryGetListResVO> inquiryList = inquiryMapper.getList(getInquiryListReqVO);

        // 총 데이터 수 계산
        int totalElements = inquiryList.size() != 0 ? inquiryList.get(0).getTotalElements() : 0;
        // 총 페이지 수 계산
        int totalPages = (int) Math.ceil((double) totalElements / size);

        PageResponse<InquiryGetListResVO> responseData = PageResponse.<InquiryGetListResVO>builder()
                .content(inquiryList)
                .page(page)
                .size(size)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .build();
        return responseData;
    }

    // 문의사항 비밀번호 확인
    @Override
    public Boolean checkPassword(CheckPasswordParamVO checkPasswordParamVO) {
        return inquiryMapper.checkPassword(checkPasswordParamVO);
    }

    @Override
    public InquiryGetDetailResVO getDetails(int inquiry_num) {
        return inquiryMapper.getDetails(inquiry_num);
    }

    // 문의 사항 삭제
    @Override
    public void deleteData(int inquiryNum) {
        if(inquiryMapper.deleteData(inquiryNum) < 1){
            throw new OperationErrorException(ErrorCode.FAIL_TO_REMOVE_INQUIRY);
        }
    }

    // 문의사항 키워드 검색
    @Override
    public ArrayList<InquiryVO> searchInquiry(String word) {
        return inquiryMapper.searchInquiry(word);
    }

    // 문의사항 답글 등록
    @Override
    public void addComment(AddCommentParamVO addCommentParamVO) {
        if(inquiryMapper.addComment(addCommentParamVO) < 1){
            throw new OperationErrorException(ErrorCode.FAIL_TO_ADD_COMMENT);
        }
    }
}
