package com.project.thejapenproject.controller;


import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;

@Controller
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
}