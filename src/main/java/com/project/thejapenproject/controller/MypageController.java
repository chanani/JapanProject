package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.RecordDetailsVO;
import com.project.thejapenproject.command.RecordVO;
import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.mypage.service.MypageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.Map;

@Controller
@RequestMapping("/mypage")
public class MypageController {

    @Autowired
    @Qualifier("mypageService")
    public MypageService mypageService;

    @NoneCheckToken
    @PostMapping("/favorite")
    public ResponseEntity<ArrayList<WordVO>> favoriteList(@RequestBody Map<String, String> map){
        return ResponseEntity.ok(mypageService.favoriteList(map.get("username")));
    }

    @NoneCheckToken
    @PostMapping("/record")
    public ResponseEntity<ArrayList<RecordVO>> recordList(@RequestBody Map<String, String> map){
        return ResponseEntity.ok(mypageService.recordList(map.get("username")));
    }

    @NoneCheckToken
    @PostMapping("/recordDetails")
    public ResponseEntity<ArrayList<RecordDetailsVO>> recordDetailList(@RequestBody Map<String, String> map){
        return ResponseEntity.ok(mypageService.recordDetails(map.get("username"), Integer.valueOf(map.get("record_num"))));
    }
}
