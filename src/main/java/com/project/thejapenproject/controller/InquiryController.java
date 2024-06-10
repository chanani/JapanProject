package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.InquiryVO;
import com.project.thejapenproject.command.UserVO;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.inquiry.service.InquiryService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.apache.ibatis.annotations.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import reactor.util.ObjectUtils;

import java.util.ArrayList;
import java.util.Objects;


@Controller
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
    public ResponseEntity<String> insertDate(@RequestBody InquiryVO vo) {
        int result = inquiryService.insertData(vo);
        if (result == 1) return ResponseEntity.ok("성공");
        else return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("실패");

    }

    /**
     * 전체 문의내역 조회 API
     **/
    @NoneAuth
    @GetMapping("/getList")
    public ResponseEntity<ArrayList<InquiryVO>> getList() {
        ArrayList<InquiryVO> list = inquiryService.getList();
        return ResponseEntity.ok(list);
    }

    /**
     * 문의내역 접속 시 패드워드 확인 API
     *
     * @Param InquiryVO : 조회에 필요한 게시글의 NUMBER, PW를 VO로 받아 확인
     **/
    @NoneAuth
    @PostMapping("/checkPassword")
    public ResponseEntity<Boolean> checkPassword(@RequestBody InquiryVO vo) {
        try {
            if (inquiryService.checkPassword(vo)) return ResponseEntity.ok(true);
            else return ResponseEntity.ok(false);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 문의내역 상세내역 조회 API
     *
     * @Param inquiry_num : 테이블의 PK를 통해 조회
     **/
    @NoneAuth
    @GetMapping("/getDetails")
    public ResponseEntity<Object> getDetails(@Param("inquiry_num") int inquiry_num) {
        InquiryVO inquiryVO = inquiryService.getDetails(inquiry_num);
        if (inquiryVO == null) return ResponseEntity.ok(HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(inquiryVO);
    }

    /**
     * 문의내역 삭제 API
     *
     * @Param inquiry_num : 테이블의 PK를 통해 삭제
     **/
    @NoneAuth
    @GetMapping("/deleteData")
    public ResponseEntity<String> deleteData(@Param("inquiry_num") int inquiry_num) throws Exception {
        int result = inquiryService.deleteData(inquiry_num);
        if (result != 1) {
            throw new Exception();
        }
        return ResponseEntity.ok("성공");
    }

    /**
     * 문의내역 검색 API
     *
     * @Param word : 검색 키워드를 통해 조회
     **/
    @NoneAuth
    @GetMapping("/searchInquiry")
    public ResponseEntity<Object> searchInquiry(@Param("word") String word) {
        ArrayList<InquiryVO> inquiryList = inquiryService.searchInquiry(word);
        if (inquiryList.size() == 0) return ResponseEntity.ok(HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(inquiryList);
    }
    /**
     * 문의내역 comment 작성 API
     * @Param InquiryVO : 검색 키워드를 통해 조회
     * **/
    @NoneCheckToken
    @PostMapping("/addComment")
    public ResponseEntity<String> addComment(@RequestBody InquiryVO vo) throws Exception {
        try {
            int result = inquiryService.addComment(vo);
            if(result != 1 ) throw new Exception();
            return ResponseEntity.ok("성공");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
