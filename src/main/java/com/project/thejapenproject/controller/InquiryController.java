package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.InquiryVO;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.inquiry.service.InquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


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
}
