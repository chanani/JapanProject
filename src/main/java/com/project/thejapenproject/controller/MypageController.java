package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.*;
import com.project.thejapenproject.command.exception.RequestParameterException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.common.utils.PageResponse;
import com.project.thejapenproject.mypage.service.MypageService;
import com.project.thejapenproject.mypage.vo.GetRecordDetailsReqVO;
import com.project.thejapenproject.mypage.vo.UserMypageResVO;
import com.project.thejapenproject.mypage.vo.UserInfoModifyReqVO;
import com.project.thejapenproject.mypage.vo.UserWithdrawalReqVO;
import com.project.thejapenproject.mypage.vo.param.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Objects;

@RestController
@RequestMapping(value = "/mypage", produces = "application/json")
@RequiredArgsConstructor
public class MypageController {

    public final MypageService mypageService;

    /**
     * 마이페이지 유저 정보 조회 API
     * @param usernameParamVO
     */
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
     * 유저 정보 변경 API
     * @param userInfoModifyReqVO
     */
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
     */
    @NoneCheckToken
    @PostMapping("/withdrawal")
    public ResponseEntity<String> withdrawal(@Valid @RequestBody UserWithdrawalReqVO userWithdrawalReqVO) {

        mypageService.withdrawal(userWithdrawalReqVO.getUsername());

        return ResponseEntity.ok("정상적으로 탈퇴 되었습니다.");
    }

    /**
     * 즐겨찾기 목록 API
     *
     * @Param map : username을 통해 목록 조회
     **/
    @NoneCheckToken
    @PostMapping("/favorite")
    public ResponseEntity<ArrayList<WordVO>> favoriteList(@Valid @RequestBody UsernameParamVO usernameParamVO) {

        ArrayList<WordVO> list = mypageService.favoriteList(usernameParamVO.getUsername());

        return ResponseEntity.ok(list);
    }

    /**
     * 학습 기록 조회 API
     *
     * @Param username : username을 통해 목록 조회
     **/
    @NoneCheckToken
    @GetMapping("/record")
    public ResponseData recordList(@Valid @ModelAttribute GetRecordListParamVO getRecordListParamVO) {
        PageResponse<RecordVO> list = mypageService.recordList(getRecordListParamVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .data(list)
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }

    /**
     * 학습 기록 상세 조회 API
     *
     * @Param map : username과 record 테이블의 PK를 통해 조회
     **/
    @NoneCheckToken
    @PostMapping("/recordDetails")
    public ResponseEntity<ArrayList<RecordDetailsVO>> recordDetailList(@Valid @RequestBody GetRecordDetailsReqVO getRecordDetailsReqVO) {
        ArrayList<RecordDetailsVO> list = mypageService.recordDetails(getRecordDetailsReqVO);

        return ResponseEntity.ok(list);
    }

    /**
     * 학습 기록 삭제 API
     *
     * @Param record_num : record 테이블의 PK를 통해 삭제
     **/
    @NoneCheckToken
    @PostMapping("/deleteRecord")
    public ResponseEntity<String> deleteRecord(@Valid @RequestBody RecordNumParamVO recordNumParamVO) throws Exception {
        mypageService.deleteRecord(recordNumParamVO.getRecordNum());
        return ResponseEntity.ok("성공");
    }

    /**
     * 단계별 학습 API
     **/
    @NoneAuth
    @GetMapping("/getSchoolList")
    public ResponseEntity<ArrayList<WordVO>> getSchoolList(@Valid @ModelAttribute GetSchoolListParamVO getSchoolListParamVO) {
        ArrayList<WordVO> list = mypageService.getSchoolList(getSchoolListParamVO.getWordWeek());

        return ResponseEntity.ok(list);
    }

    /**
     * 단계별 학습의 주차 조회 API
     **/
    @NoneAuth
    @GetMapping("/getWeekList")
    public ResponseEntity<Object> getWeekList() {

        ArrayList<Integer> list = mypageService.getWeekList();
        if (Objects.isNull(list)) {
            throw new RequestParameterException(ErrorCode.WRONG_PARAM);
        }
        return ResponseEntity.ok(list);

    }

    /**
     * 이미지 변경 API
     * @param imageChangeParamVO
     */
    @NoneAuth
    @PostMapping("/image-change")
    public ResponseData userImageChange(@Valid @ModelAttribute ImageChangeParamVO imageChangeParamVO) {
        String fileName = imageChangeParamVO.getFile().getOriginalFilename();
        String filePath = "/opt/thejapan/user/icon/" + fileName;

        try {
            File dest = new File(filePath);
            imageChangeParamVO.getFile().transferTo(dest);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        mypageService.userImageChange(fileName, imageChangeParamVO.getUsername());

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message(ErrorCode.SUCCESS.getMessage())
                .data(fileName)
                .build();
    }

}
