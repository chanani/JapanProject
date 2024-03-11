package com.project.thejapenproject.controller;


import com.project.thejapenproject.command.WordVO;
import com.project.thejapenproject.study.service.StudyService;
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
public class StudyController {

    @Autowired
    @Qualifier("studyService")
    public StudyService studyService;

    @GetMapping("/data/{level}/{num}/{username}")
    public ResponseEntity<ArrayList<WordVO>> getWord(@PathVariable Integer level,
                                                     @PathVariable Integer num, @PathVariable String username){
        ArrayList<WordVO> list = studyService.getWord(level, num, username);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/addFavorite/{word_num}/{favorite}/{username}")
    public ResponseEntity<String> changeFavorite(@PathVariable Integer word_num,
                                                 @PathVariable boolean favorite,
                                                 @PathVariable String username){
        System.out.println("word_num : " + word_num);
        System.out.println("favorite : " + favorite);
        System.out.println("username : " + username);
        if(favorite) studyService.addFavorite(word_num, username);
        else studyService.deleteFavorite(word_num, username);
        return ResponseEntity.ok("성공");
    }
}
