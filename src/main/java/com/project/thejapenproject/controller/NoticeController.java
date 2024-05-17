package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.NoticeVO;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.notice.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@Controller
@RequestMapping("/notice")
public class NoticeController {
    @Autowired
    @Qualifier("noticeService")
    private NoticeService noticeService;

    @NoneAuth
    @GetMapping("/getList")
    public ResponseEntity<ArrayList<NoticeVO>> getList(){
        return ResponseEntity.ok(noticeService.getList());
    }

    @NoneCheckToken
    @GetMapping("/alarmList/{username}")
    public ResponseEntity<ArrayList<NoticeVO>> alarmList(@PathVariable("username") String username){
        return ResponseEntity.ok(noticeService.alarmList(username));
    }

    @NoneAuth
    @GetMapping("/noticeCheck/{notice_num}/{username}")
    public ResponseEntity<String> noticeCheck(@PathVariable("notice_num") Integer notice_num,
                                              @PathVariable("username") String username){
        System.out.println(notice_num);
        if(!username.equals("undefined")){
            noticeService.noticeCheck(notice_num, username);
        }
        return ResponseEntity.ok("성공");
    }
}
