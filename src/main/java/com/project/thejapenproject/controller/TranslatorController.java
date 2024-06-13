package com.project.thejapenproject.controller;

import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.utils.Translator;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;

@Controller
@RequiredArgsConstructor
@RequestMapping("/translator")
public class TranslatorController {

    private final Translator translator;

    @NoneAuth
    @GetMapping("/changeWord")
    public ResponseEntity<String> changeWord(@Param("word") String word,
                                             @Param("from") String from,
                                             @Param("to") String to) throws IOException {

        try {
            String response = translator.prettify(translator.Post(word, from, to));
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}

