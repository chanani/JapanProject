package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.InquiryVO;
import com.project.thejapenproject.common.annotation.NoneAuth;
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

    @NoneAuth
    @PostMapping("/insertData")
    public ResponseEntity<String> insertDate (@RequestBody InquiryVO vo){
        int result = inquiryService.insertData(vo);
        if(result == 1) return ResponseEntity.ok("성공");
        else return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("실패");

    }

    @NoneAuth
    @GetMapping("/getList")
    public ResponseEntity<ArrayList<InquiryVO>> getList (){
        ArrayList<InquiryVO> list = inquiryService.getList();
        return ResponseEntity.ok(list);
    }

    @NoneAuth
    @PostMapping("/checkPassword")
    public ResponseEntity<Boolean> checkPassword(@RequestBody InquiryVO vo){
        try {
            if(inquiryService.checkPassword(vo)) return ResponseEntity.ok(true);
            else return ResponseEntity.ok(false);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @NoneAuth
    @GetMapping("/getDetails")
    public ResponseEntity<Object> getDetails(@Param("inquiry_num") int inquiry_num){
        InquiryVO inquiryVO = inquiryService.getDetails(inquiry_num);
        if(inquiryVO == null) return ResponseEntity.ok(HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(inquiryVO);
    }
}
