package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.ResponseData;
import com.project.thejapenproject.command.UserAccessToken;
import com.project.thejapenproject.command.UserVO;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.common.jwt.SHA512;
import com.project.thejapenproject.common.jwt.service.AuthService;
import com.project.thejapenproject.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.util.StringUtils;

import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class MainController {

    private final UserService userService;
    private final AuthService authService;

    @NoneAuth
    @PostMapping("/login")
    public Object login(UserVO userVO) throws Exception {

        if(Objects.isNull(userVO)){
            throw new Exception();
        }
        if (!StringUtils.hasText(userVO.getUsername()) || !StringUtils.hasText(userVO.getPassword())){
            throw new Exception();
        }
        UserAccessToken userAccessToken = authService.token(userVO);

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message("성공")
                .data(userAccessToken)
                .build();
    }

    @NoneCheckToken
    @PostMapping("/logout")
    public Object logout(@RequestBody Map<String, String> map) throws Exception {
        if(!StringUtils.hasText(map.get("username"))){
            throw new Exception();
        }
        authService.logout(map.get("username"));
        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message("성공")
                .build();
    }

    @NoneAuth
    @PostMapping("/join")
    public Object join(@RequestBody Map<String, String> map) throws Exception {

        if (Objects.isNull(map)) {
            throw new Exception();
        }

        UserVO userVO = UserVO.builder()
                .user_name(map.get("user_name"))
                .username(map.get("username"))
                .password(SHA512.encrypt( map.get("password")))
                .user_email(map.get("user_email"))
                .user_phone(map.get("user_phone"))
                .role("role_user")
                .build();
        int success = userService.join(userVO);
        if (success <= 0){
            throw new Exception();
        }
        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message("성공")
                .build();
    }

}
