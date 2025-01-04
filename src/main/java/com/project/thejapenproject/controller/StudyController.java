package com.project.thejapenproject.controller;


import com.project.thejapenproject.command.ResponseData;
import com.project.thejapenproject.command.UsernameReqVO;
import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.common.utils.PageResponse;
import com.project.thejapenproject.study.service.StudyService;
import com.project.thejapenproject.study.vo.*;
import com.project.thejapenproject.study.vo.param.*;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;

@RestController
@RequestMapping("/study")
@RequiredArgsConstructor
public class StudyController {


    public final StudyService studyService;

    @Operation(summary = "학습 단어 목록 조회 API",
            description = ""
    )
    @NoneAuth
    @GetMapping("/data/{level}/{num}/{username}")
    public ResponseEntity<ArrayList<WordVO>> getWord(@PathVariable Integer level,
                                                     @PathVariable Integer num,
                                                     @PathVariable String username) {
        ArrayList<WordVO> list = studyService.getWord(level, num, username);
        return ResponseEntity.ok(list);
    }

    @Operation(summary = "즐겨 찾기 추가 API",
            description = ""
    )
    @NoneCheckToken
    @GetMapping("/addFavorite/{wordNum}/{favorite}/{username}")
    public ResponseEntity<String> changeFavorite(@PathVariable Integer wordNum,
                                                 @PathVariable boolean favorite,
                                                 @PathVariable String username) {
        if (favorite) {
            studyService.addFavorite(wordNum, username);
        } else {
            studyService.deleteFavorite(wordNum, username);
        }
        return ResponseEntity.ok("성공");
    }

    /**
     * 선택 학습 단어 조회 API
     *
     * @param studyChoiceParamVO
     * @return
     */
    @Operation(summary = "선택 학습 단어 조회 API",
            description = ""
    )
    @NoneAuth
    @GetMapping("/choice")
    public ResponseData choiceGetList(@Valid @ModelAttribute StudyChoiceParamVO studyChoiceParamVO) {

        ArrayList<StudyChoiceResVO> choiceList = studyService.getChoiceList(studyChoiceParamVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .data(choiceList)
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }

    /**
     * 선택 학습 결과 페이지 즐겨찾기 목록 조회 API
     *
     * @param favoriteVO : 결과 페이지에 있는 단어 목록
     * @return
     */
    @Operation(summary = "선택 학습 결과 페이지 즐겨찾기 목록 조회 API",
            description = ""
    )
    @PostMapping("/choice-result/favoriteCheck")
    public ResponseData resultFavoriteCheck(@Valid @RequestBody ResultFavoriteCheckParamVO favoriteVO) {
        ArrayList<Integer> choiceList = studyService.getFavoriteCheckList(favoriteVO);

        boolean[] responseData = new boolean[favoriteVO.getWordNum().size()];
        ArrayList<Integer> wordList = favoriteVO.getWordNum();

        for (int i = 0; i < favoriteVO.getWordNum().size(); i++) {
            Integer word = wordList.get(i);
            boolean check = choiceList.contains(word);
            responseData[i] = check;
        }

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .data(responseData)
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }

    /**
     * 선택 학습 페이지 즐겨찾기 추가, 삭제 API
     * @param favoriteVO
     * @return
     */
    @Operation(summary = "선택 학습 페이지 즐겨찾기 추가, 삭제 API",
            description = ""
    )
    @GetMapping("/choice-result-addFavorite")
    public ResponseData resultAddFavorite(@Valid @ModelAttribute ResultAddFavoriteParamVO favoriteVO) {
        studyService.resultAddFavorite(favoriteVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }

    /**
     * 셋트 단어 등록 시 단어 조회 API
     * @param searchVO
     * @return
     */
    @Operation(summary = "셋트 단어 등록 시 단어 조회 API",
            description = ""
    )
    @GetMapping("/solo-study-search")
    public ResponseData getSoloStudySearch(@Valid @ModelAttribute SoloStudyGetSearchDataParamVO searchVO) {

        PageResponse<SoloStudyGetSearchDataResVO> wordList = studyService.getSoleStudySearchData(searchVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .data(wordList)
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }

    /**
     * 단어 셋트 등록 API
     * @param requestVO
     * @return
     */
    @Operation(summary = "단어 셋트 등록 API",
            description = ""
    )
    @PostMapping("/solo-study-register")
    public ResponseData registerSoloStudy(@Valid @RequestBody SoloStudyRegisterReqVO requestVO) {

        studyService.registerSoloStudy(requestVO);


        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }

    /**
     * 단어 셋트 수정 API
     * @param requestVO
     * @return
     */
    @Operation(summary = "단어 셋트 수정 API",
            description = ""
    )
    @PostMapping("/solo-study-modify")
    public ResponseData modifySoloStudy(@Valid @RequestBody SoloStudyModifyReqVO requestVO) {
        studyService.modifySoloStudy(requestVO);
        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }

    /**
     * 단어 셋트 삭제 API
     * @param requestVO
     * @return
     */
    @Operation(summary = "단어 셋트 삭제 API",
            description = ""
    )
    @PostMapping("/solo-study-remove")
    public ResponseData removeSoloStudy(@Valid @RequestBody SoloStudyRemoveReqVO requestVO) {
        studyService.removeSoloStudy(requestVO);
        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }

    /**
     * 단어 셋트 목록 조회 API
     * @param getSetDataReqVO
     * @return
     */
    @Operation(summary = "단어 셋트 목록 조회 API",
            description = ""
    )
    @GetMapping("/get-set-data")
    public ResponseData getWordSetData(@Valid @ModelAttribute GetSetDataReqVO getSetDataReqVO) {

        PageResponse<SoloStudyGetUserListResVO> setList = studyService.getSetList(getSetDataReqVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .data(setList)
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }

    /**
     * 단어 셋트 전체 목록 조회 API
     */
    @Operation(summary = "단어 셋트 전체 목록 조회 API",
            description = ""
    )
    @NoneAuth
    @GetMapping("/get-set-data-all")
    public ResponseData getWordSetDataAll(@Valid @ModelAttribute GetSetStudyDataListParamVO requestVO) {
        PageResponse<SoloStudyGetUserListResVO> setList = studyService.getSetListAll(requestVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .data(setList)
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }

    /**
     * 단어 세트 상세 목록 조회 API
     * @param requestVO
     * @return
     */
    @Operation(summary = "단어 세트 상세 목록 조회 API",
            description = ""
    )
    @NoneAuth
    @PostMapping("/get-set-detail-data")
    public ResponseData getWordSetDetailData(@Valid @RequestBody GetWordSetDetailListReqVO requestVO) {

        ArrayList<GetWordSetDetailListResVO> setList = studyService.getSetDetailList(requestVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .data(setList)
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }

    /**
     * 수정 페이지로 진입 시 데이터 조회 API
     * @param requestVO
     * @return
     */
    @Operation(summary = "수정 페이지로 진입 시 데이터 조회 API",
            description = ""
    )
    @PostMapping("/get-modify-data")
    public ResponseData getModifyDataList(@Valid @RequestBody GetWordSetDetailListReqVO requestVO) {

        GetModifyDataResVO setList = studyService.getModifyDataList(requestVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .data(setList)
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }

    /**
     * 즐겨찾기 목록 조회 API
     *
     * @param requestVO
     * @return : ResponseData.class(페이지 네이션)
     * @author : chanhan
     * @since 2024-10-30 오후 09:16
     */
    @Operation(summary = "즐겨찾기 목록 조회 API",
            description = ""
    )
    @PostMapping("/get-favorite-list")
    public ResponseData getFavoriteList(@Valid @RequestBody GetFavoriteListReqVO requestVO) {

        PageResponse<GetFavoriteListResVO> favoriteList = studyService.getFavoriteList(requestVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .data(favoriteList)
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }

    /**
     * 단어 세트 학습 좋아요 API
     *
     * @param requestVO
     * @return : ResponseData.class
     * @author : chanhan
     * @since 2024-11-15 오후 11:27
     */
    @Operation(summary = "단어 세트 학습 좋아요 API",
            description = ""
    )
    @PostMapping("/modify-like")
    public ResponseData modifyLike(@Valid @RequestBody SetStudyModifyLikeReqVO requestVO) {

         studyService.setStudyModifyLike(requestVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message("좋아요 수정이 정상적으로 반영되었습니다.")
                .build();
    }


}