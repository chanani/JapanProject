package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.*;
import com.project.thejapenproject.command.exception.RequestParameterException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.mypage.service.MypageService;
import com.project.thejapenproject.mypage.vo.UserMypageResVO;
import com.project.thejapenproject.mypage.vo.UserInfoModifyReqVO;
import com.project.thejapenproject.mypage.vo.param.UsernameParamVO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping(value = "/mypage", produces = "application/json")
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
    public ResponseEntity<UserMypageResVO> myInfo(@Valid @ModelAttribute UsernameParamVO usernameParamVO) {

        UserMypageResVO userMypageResVO = mypageService.myInfo(usernameParamVO.getUsername());
        if (Objects.isNull(userMypageResVO)) {
            throw new RequestParameterException(ErrorCode.WRONG_PARAM);
        }

        return ResponseEntity.ok(userMypageResVO);
    }

    /**
     * @Param data : 변경 요청하는 데이터
     **/
    @NoneCheckToken
    @PostMapping("/update")
    public ResponseEntity<String> modifyInfo(@Valid @RequestBody UserInfoModifyReqVO userInfoModifyReqVO) {

        if (mypageService.modifyInfo(userInfoModifyReqVO) < 0) {
            throw new RequestParameterException(ErrorCode.WRONG_PARAM);
        }
        return ResponseEntity.ok("성공");
    }

    /**
     * 회원 탈퇴 API
     * ＠todo 여기부터 수정해야됨
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
    public ResponseEntity<ArrayList<WordVO>> getSchoolList(@Param("word_week") int word_week) throws
            Exception {
        ArrayList<WordVO> list = mypageService.getSchoolList(word_week);
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

    @NoneAuth
    @PostMapping("/image-change")
    public ResponseData userImageChange(@RequestParam("file") MultipartFile file,
                                        @RequestParam("username") String username) throws IOException {
        String fileName = file.getOriginalFilename();
        String filePath = "/opt/thejapan/user/icon/" + fileName;

        try {
            File dest = new File(filePath);
            file.transferTo(dest);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        mypageService.userImageChange(fileName, username);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message(ErrorCode.SUCCESS.getMessage())
                .data(fileName)
                .build();
    }

}
