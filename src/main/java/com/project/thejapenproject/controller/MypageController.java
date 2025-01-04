package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.*;
import com.project.thejapenproject.command.exception.OperationErrorException;
import com.project.thejapenproject.command.exception.RequestParameterException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.utils.PageResponse;
import com.project.thejapenproject.mypage.service.MypageService;
import com.project.thejapenproject.mypage.vo.*;
import com.project.thejapenproject.mypage.vo.param.*;
import io.swagger.v3.oas.annotations.Operation;
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
     *
     * @param usernameParamVO
     */
    @Operation(summary = "마이페이지 유저 정보 조회 API",
            description = ""
    )
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
     *
     * @param userInfoModifyReqVO
     */
    @Operation(summary = "유저 정보 변경 API",
            description = ""
    )
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
    @Operation(summary = "회원 탈퇴 API",
            description = ""
    )
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
    @Operation(summary = "즐겨찾기 목록 API",
            description = ""
    )
    @PostMapping("/favorite")
    public ResponseEntity<PageResponse<FavoriteListResVO>> favoriteList(@Valid @RequestBody FavoriteListVO favoriteListVO) {

        PageResponse<FavoriteListResVO> favoriteList = mypageService.favoriteList(favoriteListVO);

        return ResponseEntity.ok(favoriteList);
    }

    /**
     * 단답형 학습 기록 조회 API
     *
     * @Param username : username을 통해 목록 조회
     * @since : 2024-11-04 오후 03:29 repactor 진행
     * @author : chanhan
     **/
    @Operation(summary = "단답형 학습 기록 조회 API",
            description = ""
    )
    @GetMapping("/short-record")
    public ResponseData recordList(@Valid @ModelAttribute GetRecordListParamVO getRecordListParamVO) {
        PageResponse<ShortRecordListResVO> shortTestList = mypageService.shortTestList(getRecordListParamVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .data(shortTestList)
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }

    /**
     * 단답형 학습 기록 상세 조회 API
     *
     * @Param map : username과 record 테이블의 PK를 통해 조회
     **/
    @Operation(summary = "단단답형 학습 기록 상세 조회 API",
            description = ""
    )
    @PostMapping("/recordDetails")
    public ResponseEntity<ArrayList<RecordDetailsVO>> recordDetailList(@Valid @RequestBody GetRecordDetailsReqVO getRecordDetailsReqVO) {
        ArrayList<RecordDetailsVO> list = mypageService.recordDetails(getRecordDetailsReqVO);

        return ResponseEntity.ok(list);
    }


    /**
     * 단답형 학습 기록 삭제 API
     *
     * @Param record_num : record 테이블의 PK를 통해 삭제
     **/
    @Operation(summary = "단답형 학습 기록 삭제 API",
            description = ""
    )
    @PostMapping("/short-record-delete")
    public ResponseEntity<String> deleteRecord(@Valid @RequestBody RecordNumParamVO recordNumParamVO) throws Exception {
        mypageService.deleteShortRecord(recordNumParamVO.getStrNum());
        return ResponseEntity.ok("성공");
    }


    /**
     * 단어 선택 학습 기록 조회 API
     *
     * @Param username : username을 통해 목록 조회
     **/
    @Operation(summary = "단어 선택 학습 기록 조회 API",
            description = ""
    )
    @GetMapping("/choice-record")
    public ResponseData choiceRecordList(@Valid @ModelAttribute GetRecordListParamVO getRecordListParamVO) {
        PageResponse<ChoiceRecordListResVO> recordList = mypageService.choiceRecordList(getRecordListParamVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .data(recordList)
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }


    /**
     * 단어 선택 학습 기록 상세 조회 API
     *
     * @Param username : username을 통해 목록 조회
     **/
    @Operation(summary = "단어 선택 학습 기록 상세 조회 API",
            description = ""
    )
    @GetMapping("/choice-record-detail")
    public ResponseData choiceRecordDetailList(@Valid @ModelAttribute ChoiceRecordDetailParamVO choiceRecordDetailParamVO) {
        ArrayList<ChoiceRecordListDetailResVO> list = mypageService.choiceRecordDetailList(choiceRecordDetailParamVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .data(list)
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }


    /**
     * 단계별 학습 목록 조회 API
     **/
    @Operation(summary = "단계별 학습 목록 조회 API",
            description = ""
    )
    @NoneAuth
    @GetMapping("/getSchoolList")
    public ResponseEntity<ArrayList<WordVO>> getSchoolList(@Valid @ModelAttribute GetSchoolListParamVO getSchoolListParamVO) {
        ArrayList<WordVO> list = mypageService.getSchoolList(getSchoolListParamVO.getWordWeek());

        return ResponseEntity.ok(list);
    }

    /**
     * 단계별 학습의 주차 조회 API
     **/
    @Operation(summary = "단계별 학습의 주차 조회 API",
            description = ""
    )
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
     * 회원 이미지 변경 API
     *
     * @param imageChangeParamVO
     */
    @Operation(summary = "회원 이미지 변경 API",
            description = ""
    )
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

    /**
     * 단어 선택 학습 내역 삭제 API
     *
     * @param choiceRecordDeleteReqVO
     * @return : ResponseData.class
     * @author : chanhan
     * @since 2024-10-30 오후 07:30
     */
    @Operation(summary = "단어 선택 학습 내역 삭제 API",
            description = ""
    )
    @PostMapping("/choice-record-delete")
    public ResponseData choiceRecordDelete(@Valid @RequestBody ChoiceRecordDeleteReqVO choiceRecordDeleteReqVO) {

        mypageService.deleteChoiceRecord(choiceRecordDeleteReqVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message("정상적으로 삭제되었습니다.")
                .build();
    }

    /**
     * 검색 페이지에서 즐겨찾기 추가 API
     *
     * @param userFavoriteRegisterReqVO
     * @return : ResponseData.class
     * @author : chanhan
     * @since 2024-10-30 오후 08:31
     */
    @Operation(summary = "검색 페이지에서 즐겨찾기 추가 API",
            description = ""
    )
    @PostMapping("/search-register-word")
    public ResponseData choiceRecordDelete(@Valid @RequestBody UserFavoriteRegisterReqVO userFavoriteRegisterReqVO) {

        // 이미 등록되어있을 경우
        if(mypageService.checkFavoriteWord(userFavoriteRegisterReqVO) > 0){
            throw new OperationErrorException(ErrorCode.FAIL_TO_REGISTER_FAVORITE);
        }
        mypageService.registerFavoriteWord(userFavoriteRegisterReqVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message("정상적으로 삭제되었습니다.")
                .build();
    }


    /**
     * 단답형 단어 학습 기록 상세 조회 API
     *
     * @param shortRecordDetailParamVO
     * @return : ResponseData.class
     * @author : chanhan
     * @since 2024-11-06 오후 08:42
     */
    @Operation(summary = "단답형 단어 학습 기록 상세 조회 API",
            description = ""
    )
    @GetMapping("/short-record-detail")
    public ResponseData shortRecordDetailList(@Valid @ModelAttribute ShortRecordDetailParamVO shortRecordDetailParamVO) {

        ArrayList<ShortRecordListDetailResVO> recordDetailList = mypageService.shortRecordDetailList(shortRecordDetailParamVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .data(recordDetailList)
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }

    /**
     * 즐겨 찾기 단어 메모 등록 API
     *
     * @param updateFavoriteMemoReqVO
     * @return : ResponseData.class
     * @author : chanhan
     * @since 2024-11-12 오후 08:40
     */
    @Operation(summary = "즐겨 찾기 단어 메모 등록 API",
            description = ""
    )
    @PostMapping("/update-favorite-memo")
    public ResponseData updateFavoriteMemo(@Valid @RequestBody updateFavoriteMemoReqVO updateFavoriteMemoReqVO) {

        mypageService.updateFavoriteMemo(updateFavoriteMemoReqVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }

    /**
     * 단어 목록 조회 API
     *
     * @param wordListSearchParamVO : 단어 목록 요청 VO
     * @return : ResponseData.class
     * @author : chanhan
     * @since 2024-12-06 오후 09:53
     */
    @Operation(summary = "단어 목록 조회 API",
            description = "페이지 네이션 된 목록이 반환되며, keyword에 검색 데이터를 넣을 수 있습니다."
    )
    @GetMapping("/word-list-search")
    @NoneAuth
    public ResponseData wordListSearch(@Valid @ModelAttribute WordListSearchParamVO wordListSearchParamVO) {

        PageResponse<WordSearchListResVO> wordList = mypageService.getWordSearchList(wordListSearchParamVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .data(wordList)
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }

}
