package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.*;
import com.project.thejapenproject.command.exception.RequestParameterException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.common.jwt.SHA512;
import com.project.thejapenproject.mypage.service.MypageService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Map;
import java.util.Objects;

@Controller
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class MypageController {

    public final MypageService mypageService;

    /**
     * @Param username : 아이디
     * mypage 개인정보 불러오기
     * 쿼리스트링으로 id 전달
     **/
    @NoneCheckToken
    @GetMapping("/data")
    public ResponseEntity<UserVO> myInfo(@RequestParam String username) {
        if (Objects.isNull(username)) {
            throw new RequestParameterException(ErrorCode.WRONG_PARAM1);
        }
        UserVO userVO = mypageService.myInfo(username);
        if (Objects.isNull(userVO)) {
            throw new RequestParameterException(ErrorCode.WRONG_PARAM);
        }

        return ResponseEntity.ok(userVO);
    }

    /**
     * @Param data : 변경 요청하는 데이터
     **/
    @NoneCheckToken
    @PostMapping("/update")
    public ResponseEntity<String> modifyInfo(@RequestBody Map<String, String> data) {
        if (Objects.isNull(data)) {
            throw new RequestParameterException(ErrorCode.WRONG_PARAM1);
        }
        try {
            UserVO userVO = UserVO.builder()
                    .username(data.get("username"))
                    .user_name(data.get("user_name"))
                    .user_email(data.get("user_email"))
                    .user_phone(data.get("user_phone"))
                    .build();
            int result = mypageService.modifyInfo(userVO);
            if (result < 0) {
                throw new RequestParameterException(ErrorCode.WRONG_PARAM);
            }
            return ResponseEntity.ok("성공");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 회원 탈퇴 컨트롤러
     */
    @NoneCheckToken
    @PostMapping("/withdrawal")
    public ResponseEntity<String> withdrawal(@RequestBody Map<String, String> data) {
        if (Objects.isNull(data)) {
            throw new RequestParameterException(ErrorCode.WRONG_PARAM1);
        }
        try {
            int result = mypageService.withdrawal(data.get("username"));
            if (result > 0) {
                return ResponseEntity.ok("정상적으로 탈퇴 되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("탈퇴 중 오류가 발생하였습니다.");
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 즐겨찾기 목록 API
     *
     * @Param map : username을 통해 목록 조회
     **/
    @NoneCheckToken
    @PostMapping("/favorite")
    public ResponseEntity<ArrayList<WordVO>> favoriteList(@RequestBody Map<String, String> map) throws Exception {
        if (Objects.isNull(map)) {
            throw new RequestParameterException(ErrorCode.WRONG_PARAM1);
        }
        ArrayList<WordVO> list = mypageService.favoriteList(map.get("username"));
        if (Objects.isNull(list)) {
            throw new RequestParameterException(ErrorCode.WRONG_PARAM);
        }
        return ResponseEntity.ok(list);
    }

    /**
     * 학습 기록 조회 API
     *
     * @Param username : username을 통해 목록 조회
     **/
    @NoneCheckToken
    @GetMapping("/record")
    public ResponseEntity<ArrayList<RecordVO>> recordList(@RequestParam String username) throws Exception {
        ArrayList<RecordVO> list = mypageService.recordList(username);
        if (Objects.isNull(list)) {
            throw new RequestParameterException(ErrorCode.WRONG_PARAM);
        }
        return ResponseEntity.ok(list);
    }

    /**
     * 학습 기록 상세 조회 API
     *
     * @Param map : username과 record 테이블의 PK를 통해 조회
     **/
    @NoneCheckToken
    @PostMapping("/recordDetails")
    public ResponseEntity<ArrayList<RecordDetailsVO>> recordDetailList(@RequestBody Map<String, String> map) {
        ArrayList<RecordDetailsVO> list = mypageService.recordDetails(map.get("username"), Integer.valueOf(map.get("record_num")));
        if (Objects.isNull(list)) {
            throw new RequestParameterException(ErrorCode.WRONG_PARAM);
        }
        return ResponseEntity.ok(list);
    }

    /**
     * 학습 기록 삭제 API
     *
     * @Param record_num : record 테이블의 PK를 통해 삭제
     **/
    @NoneCheckToken
    @GetMapping("/deleteRecord")
    public ResponseEntity<String> deleteRecord(@Param("record_num") int record_num) throws Exception {
        int result = mypageService.deleteRecord(record_num);
        if (result != 1) {
            throw new RequestParameterException(ErrorCode.WRONG_PARAM);
        }
        return ResponseEntity.ok("성공");
    }

    /**
     * 단계별 학습 API
     **/
    @NoneAuth
    @GetMapping("/getSchoolList")
    public ResponseEntity<ArrayList<SchoolVO>> getSchoolList(@Param("school_week") int school_week) throws
            Exception {
        ArrayList<SchoolVO> list = mypageService.getSchoolList(school_week);
        if (Objects.isNull(list)) {
            throw new RequestParameterException(ErrorCode.WRONG_PARAM);
        }
        return ResponseEntity.ok(list);
    }

    /**
     * 단계별 학습의 주차 조회 API
     **/
    @NoneAuth
    @GetMapping("/getWeekList")
    public ResponseEntity<Object> getWeekList() throws Exception {
        try {
            ArrayList<Integer> list = mypageService.getWeekList();
            if (Objects.isNull(list)) {
                throw new RequestParameterException(ErrorCode.WRONG_PARAM);
            }
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
