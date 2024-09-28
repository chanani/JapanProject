package com.project.thejapenproject.controller;

import com.project.thejapenproject.admin.service.AdminService;
import com.project.thejapenproject.command.NoticeVO;
import com.project.thejapenproject.command.SchoolVO;
import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.command.exception.RequestParameterException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import reactor.util.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import java.util.Objects;

@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @ExceptionHandler
    @PostMapping("/addWordList")
    public ResponseEntity<String> addWordList(@RequestBody ArrayList<WordVO> wordList){
        if(Objects.isNull(wordList)){
            throw new RequestParameterException(ErrorCode.WRONG_PARAM);
        }
        adminService.addWordList(wordList);
        return ResponseEntity.ok("성공");
    }
    @PostMapping("/addNotice")
    public ResponseEntity<String> addNotice(@RequestBody Map<String, String> map){
        if(Objects.isNull(map)){
            throw new RequestParameterException(ErrorCode.WRONG_PARAM);
        }
        adminService.addNotice(NoticeVO.builder()
                .notice_content(map.get("content"))
                .notice_title(map.get("title"))
                .build());
        return ResponseEntity.ok("성공");
    }

    @PostMapping("/addWeekWord")
    public ResponseEntity<String> addWeekWord(@RequestBody ArrayList<SchoolVO> wordList){
        adminService.addWeekWord(wordList);
        return ResponseEntity.ok("성공");
    }
}
