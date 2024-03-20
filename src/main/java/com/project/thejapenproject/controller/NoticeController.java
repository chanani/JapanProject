package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.NoticeVO;
import com.project.thejapenproject.notice.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;

@Controller
@RequestMapping("/notice")
public class NoticeController {
    @Autowired
    @Qualifier("noticeService")
    private NoticeService noticeService;
    
    @GetMapping("/getList")
    public ResponseEntity<ArrayList<NoticeVO>> getList(){
        return ResponseEntity.ok(noticeService.getList());
    }
}
