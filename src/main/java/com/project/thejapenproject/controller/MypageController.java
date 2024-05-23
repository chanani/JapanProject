package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.RecordDetailsVO;
import com.project.thejapenproject.command.RecordVO;
import com.project.thejapenproject.command.UserVO;
import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.common.jwt.SHA512;
import com.project.thejapenproject.mypage.service.MypageService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Map;

@Controller
@RequestMapping("/mypage")
public class MypageController {

    @Autowired
    @Qualifier("mypageService")
    public MypageService mypageService;

    /**
     * @Param username : 아이디
     * mypage 개인정보 불러오기
     * 쿼리스트링으로 id 전달
     **/
    @NoneCheckToken
    @GetMapping("/data")
    public ResponseEntity<UserVO> myInfo(@RequestParam String username) {
        try {
            UserVO userVO = mypageService.myInfo(username);
            if (userVO == null) {
                throw new Exception();
            }
            return ResponseEntity.ok(userVO);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * @Param data : 변경 요청하는 데이터
     **/
    @NoneCheckToken
    @PostMapping("/update")
    public ResponseEntity<String> modifyInfo(@RequestBody Map<String, String> data) throws NoSuchAlgorithmException {
        try {

            UserVO userVO = UserVO.builder()
                    .username(data.get("username"))
                    .user_name(data.get("user_name"))
                    .user_email(data.get("user_email"))
                    .user_phone(data.get("user_phone"))
                    .build();
            int result = mypageService.modifyInfo(userVO);
            if (result < 0) {
                throw new Exception();
            }
            return ResponseEntity.ok("성공");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @NoneCheckToken
    @PostMapping("/favorite")
    public ResponseEntity<ArrayList<WordVO>> favoriteList(@RequestBody Map<String, String> map) {
        return ResponseEntity.ok(mypageService.favoriteList(map.get("username")));
    }

    @NoneCheckToken
    @GetMapping("/record")
    public ResponseEntity<ArrayList<RecordVO>> recordList(@RequestParam String username) {
        return ResponseEntity.ok(mypageService.recordList(username));
    }

    @NoneCheckToken
    @PostMapping("/recordDetails")
    public ResponseEntity<ArrayList<RecordDetailsVO>> recordDetailList(@RequestBody Map<String, String> map) {
        return ResponseEntity.ok(mypageService.recordDetails(map.get("username"), Integer.valueOf(map.get("record_num"))));
    }

}
