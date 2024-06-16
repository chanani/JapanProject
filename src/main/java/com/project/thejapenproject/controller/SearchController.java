package com.project.thejapenproject.controller;


import com.project.thejapenproject.command.ResponseData;
import com.project.thejapenproject.command.exception.RequestParameterException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.common.elasticsearch.TestSearchService;
import com.project.thejapenproject.common.elasticsearch.TestVO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {

    private final TestSearchService testSearchService;

    @NoneAuth
    @GetMapping("/all")
    public Object searchAll(@PathParam("keyWord") String keyWord) {

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message("성공")
                .build();
    }

    @NoneAuth
    @PostMapping("/add")
    public Object searchAdd(@RequestBody Map<String, String> map) {
        if(Objects.isNull(map)){
            throw new RequestParameterException(ErrorCode.WRONG_PARAM);
        }
        testSearchService.save(TestVO.builder()
                .name(map.get("name"))
                .message(map.get("massage"))
                .build());
        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message("성공")
                .build();
    }
}
