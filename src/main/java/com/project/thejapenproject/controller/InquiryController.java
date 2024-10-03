package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.InquiryVO;
import com.project.thejapenproject.command.ResponseData;
import com.project.thejapenproject.command.exception.RequestParameterException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.common.utils.PageResponse;
import com.project.thejapenproject.inquiry.service.InquiryService;
import com.project.thejapenproject.inquiry.vo.GetInquiryListReqVO;
import com.project.thejapenproject.inquiry.vo.InquiryGetDetailResVO;
import com.project.thejapenproject.inquiry.vo.InquiryGetListResVO;
import com.project.thejapenproject.inquiry.vo.InquiryRegisterReqVO;
import com.project.thejapenproject.inquiry.vo.param.AddCommentParamVO;
import com.project.thejapenproject.inquiry.vo.param.CheckPasswordParamVO;
import com.project.thejapenproject.inquiry.vo.param.GetInquiryNumberParamVO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Objects;


@RestController
@RequestMapping("/inquiry")
@RequiredArgsConstructor
public class InquiryController {

    public final InquiryService inquiryService;

    /**
     * 문의내역 추가 API
     * ＠Param InquiryVO : 입력한 모든 정보를 VO로 받아 insert
     **/
    @NoneAuth
    @PostMapping("/insertData")
    public ResponseEntity<String> insertDate(@Valid @RequestBody InquiryRegisterReqVO inquiryRegisterReqVO) {
        inquiryService.insertData(inquiryRegisterReqVO);
        return ResponseEntity.ok("성공");
    }

    /**
     * 전체 문의내역 조회 API
     **/
    @NoneAuth
    @GetMapping("/getList")
    public ResponseData getList(@Valid @ModelAttribute GetInquiryListReqVO getInquiryListReqVO) {
        if (getInquiryListReqVO.getPage() < 1 || getInquiryListReqVO.getSize() < 1) {
            throw new RequestParameterException(ErrorCode.WRONG_PARAM);
        }
        PageResponse<InquiryGetListResVO> inquiryList = inquiryService.getList(getInquiryListReqVO);
        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .data(inquiryList)
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }

    /**
     * 문의내역 접속 시 패드워드 확인 API
     *
     * @Param InquiryVO : 조회에 필요한 게시글의 NUMBER, PW를 VO로 받아 확인
     **/
    @NoneAuth
    @PostMapping("/checkPassword")
    public ResponseEntity<Boolean> checkPassword(@Valid @RequestBody CheckPasswordParamVO checkPasswordParamVO) {

        if (inquiryService.checkPassword(checkPasswordParamVO)) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }

    }

    /**
     * 문의내역 상세내역 조회 API
     *
     * @Param inquiry_num : 테이블의 PK를 통해 조회
     **/
    @NoneAuth
    @GetMapping("/getDetails")
    public ResponseEntity<Object> getDetails(@Valid @ModelAttribute GetInquiryNumberParamVO getInquiryNumberParamVO) {

        InquiryGetDetailResVO inquiryDetailData = inquiryService.getDetails(getInquiryNumberParamVO.getInquiryNum());
        return ResponseEntity.ok(inquiryDetailData);
    }

    /**
     * 문의내역 삭제 API
     *
     * @Param inquiry_num : 테이블의 PK를 통해 삭제
     **/
    @NoneAuth
    @GetMapping("/deleteData")
    public ResponseEntity<String> deleteData(@Valid @ModelAttribute GetInquiryNumberParamVO getInquiryNumberParamVO) throws Exception {
        inquiryService.deleteData(getInquiryNumberParamVO.getInquiryNum());
        return ResponseEntity.ok("성공");
    }

    /**
     * 문의 답글 등록 API
     */
    @NoneCheckToken
    @PostMapping("/addComment")
    public ResponseEntity<String> addComment(@Valid @RequestBody AddCommentParamVO addCommentParamVO) {

        inquiryService.addComment(addCommentParamVO);

        return ResponseEntity.ok("성공");
    }
}
