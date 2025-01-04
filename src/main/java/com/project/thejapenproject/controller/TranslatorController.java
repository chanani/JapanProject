package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.exception.RequestParameterException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.utils.Translator;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.apache.http.impl.execchain.RequestAbortedException;
import org.apache.ibatis.annotations.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.util.Objects;

@Controller
@RequiredArgsConstructor
@RequestMapping("/translator")
public class TranslatorController {

    private final Translator translator;

    @Operation(summary = "번역 API",
            description = "word = 변경하고 싶은 단어\n\n" +
                    "from = 기존 언어(국적)\n\n" +
                    "to = 변경하고 싶은 언어(국적)"
    )
    @NoneAuth
    @GetMapping("/changeWord")
    public ResponseEntity<String> changeWord(@Param("word") String word,
                                             @Param("from") String from,
                                             @Param("to") String to) throws IOException {
        if (Objects.isNull(word) || Objects.isNull(from) || Objects.isNull(to)) {
            throw new RequestParameterException(ErrorCode.WRONG_PARAM);
        }
        try {
            String response = translator.prettify(translator.Post(word, from, to));
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}

