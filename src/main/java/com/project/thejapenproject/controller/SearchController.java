package com.project.thejapenproject.controller;


import com.project.thejapenproject.command.ResponseData;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.util.Map;

@RestController
@RequestMapping("/search")
public class SearchController {

    @NoneAuth
    @GetMapping("/all")
    public Object searchAll(@PathParam("keyWord") String keyWord){
        System.out.println(keyWord);
        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message("성공")
                .build();
    }
}
