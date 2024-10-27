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

    @NoneAuth
    @GetMapping("/data/{level}/{num}/{username}")
    public ResponseEntity<ArrayList<WordVO>> getWord(@PathVariable Integer level,
                                                     @PathVariable Integer num,
                                                     @PathVariable String username) {
        ArrayList<WordVO> list = studyService.getWord(level, num, username);
        return ResponseEntity.ok(list);
    }

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
    @PostMapping("/solo-study-modify")
    public ResponseData modifySoloStudy(@Valid @RequestBody SoloStudyModifyReqVO requestVO) {
        studyService.modifySoloStudy(requestVO);
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
     * @param usernameReqVO
     * @return
     */
    @PostMapping("/get-set-data")
    public ResponseData getWordSetData(@Valid @RequestBody UsernameReqVO usernameReqVO) {

        ArrayList<SoloStudyGetUserListResVO> setList = studyService.getSetList(usernameReqVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .data(setList)
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }

    /**
     * 단어 셋트 전체 목록 조회 API
     */
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
    @PostMapping("/get-modify-data")
    public ResponseData getModifyDataList(@Valid @RequestBody GetWordSetDetailListReqVO requestVO) {

        GetModifyDataResVO setList = studyService.getModifyDataList(requestVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .data(setList)
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }


}