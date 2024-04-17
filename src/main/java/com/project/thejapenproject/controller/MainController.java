package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.ResponseData;
import com.project.thejapenproject.command.UserAccessToken;
import com.project.thejapenproject.command.UserVO;
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
import reactor.util.StringUtils;

import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.Objects;

@Controller
@RequestMapping("/")
@RequiredArgsConstructor
public class MainController {

    private final UserService userService;
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(UserVO userVO) throws Exception {

        if(Objects.isNull(userVO)){
            throw new Exception();
        }
        if (!StringUtils.hasText(userVO.getUsername()) || !StringUtils.hasText(userVO.getPassword())){
            throw new Exception();
        }
        System.out.println("controller");
        UserAccessToken userAccessToken = authService.token(userVO);

        return ResponseEntity.ok(ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message("성공")
                .data(userAccessToken)
                .build());
    }
    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody Map<String, Object> map) throws NoSuchAlgorithmException {
        UserVO userVO = UserVO.builder()
                .user_name((String) map.get("user_name"))
                .username((String) map.get("username"))
                .password(SHA512.encrypt((String) map.get("password")))
                .user_email((String) map.get("user_email"))
                .user_phone((String) map.get("user_phone"))
                .role("role_user")
                .build();
        userService.join(userVO);
        return ResponseEntity.ok("성공");
    }

}
