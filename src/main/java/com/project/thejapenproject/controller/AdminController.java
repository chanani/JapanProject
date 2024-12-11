package com.project.thejapenproject.controller;

import com.project.thejapenproject.admin.service.AdminService;
import com.project.thejapenproject.admin.vo.AddNoticeReqVO;
import com.project.thejapenproject.admin.vo.AddWordReqVO;
import com.project.thejapenproject.command.NoticeVO;
import com.project.thejapenproject.command.SchoolVO;
import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.command.exception.OperationErrorException;
import com.project.thejapenproject.command.exception.RequestParameterException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import reactor.util.StringUtils;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    /**
     * 단어 등록 API
     * @param addWordReqVO : 단어, 뜻, 단계, 한자, 주차까지 등록
     */
    @PostMapping("/addWordList")
    public ResponseEntity<String> addWordList(@Valid @RequestBody AddWordReqVO addWordReqVO){
        // 단어 등록
        adminService.addWordList(addWordReqVO);

        return ResponseEntity.ok("성공");
    }
    @PostMapping("/addNotice")
    public ResponseEntity<String> addNotice(@Valid @RequestBody AddNoticeReqVO addNoticeReqVO){

        adminService.addNotice(addNoticeReqVO);
        return ResponseEntity.ok("성공");
    }

    @PostMapping("/addWeekWord")
    public ResponseEntity<String> addWeekWord(@RequestBody ArrayList<SchoolVO> wordList){
        adminService.addWeekWord(wordList);
        return ResponseEntity.ok("성공");
    }
}
