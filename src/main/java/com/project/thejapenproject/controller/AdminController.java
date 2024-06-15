package com.project.thejapenproject.controller;

import com.project.thejapenproject.admin.service.AdminService;
import com.project.thejapenproject.command.NoticeVO;
import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.command.exception.RequestParameterException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
public class AdminController {

    @Autowired
    @Qualifier("adminService")
    private AdminService adminService;

    @NoneCheckToken
    @PostMapping("/addWordList")
    public ResponseEntity<String> addWordList(@RequestBody Map<String, Object> map){
        if(Objects.isNull(map)){
            throw new RequestParameterException(ErrorCode.WRONG_PARAM);
        }
        ArrayList<Object> list = (ArrayList<Object>) map.get("list");
        ArrayList<WordVO> resultList = new ArrayList<>();
        try {
            for(Object x : list){
                String[] str =  String.valueOf(x).replace("{", "").replace("}", "").replaceAll("word=", "")
                        .replace("mean=", "").replaceAll("level=", "")
                        .split(", ");
                WordVO vo = WordVO.builder()
                        .word_content(str[0])
                        .word_meaning(str[1])
                        .word_level(Integer.valueOf(str[2]))
                        .build();
                resultList.add(vo);
            }
        } catch (NumberFormatException e) {
            throw new RuntimeException(e);
        }
        adminService.addWordList(resultList);
        return ResponseEntity.ok("성공");
    }
    @NoneCheckToken
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
}
