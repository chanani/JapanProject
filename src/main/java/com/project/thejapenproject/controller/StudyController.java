package com.project.thejapenproject.controller;


import com.project.thejapenproject.command.ResponseData;
import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.study.service.StudyService;
import com.project.thejapenproject.study.vo.ResultFavoriteCheckResVO;
import com.project.thejapenproject.study.vo.StudyChoiceResVO;
import com.project.thejapenproject.study.vo.param.ResultAddFavoriteParamVO;
import com.project.thejapenproject.study.vo.param.ResultFavoriteCheckParamVO;
import com.project.thejapenproject.study.vo.param.StudyChoiceParamVO;
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

    @GetMapping("/choice-result-addFavorite")
    public ResponseData resultAddFavorite(@Valid @ModelAttribute ResultAddFavoriteParamVO favoriteVO) {
        studyService.resultAddFavorite(favoriteVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }


}