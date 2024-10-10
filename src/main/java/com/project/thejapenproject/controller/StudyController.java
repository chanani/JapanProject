package com.project.thejapenproject.controller;


import com.project.thejapenproject.command.ResponseData;
import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.study.service.StudyService;
import com.project.thejapenproject.study.vo.StudyChoiceResVO;
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

    @NoneAuth
    @GetMapping("/choice")
    public ResponseData changeFavorite(@Valid @ModelAttribute StudyChoiceParamVO studyChoiceParamVO) {

        ArrayList<StudyChoiceResVO> choiceList = studyService.getChoiceList(studyChoiceParamVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .data(choiceList)
                .message(ErrorCode.SUCCESS.getMessage())
                .build();
    }
}