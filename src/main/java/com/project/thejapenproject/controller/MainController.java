package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.UserVO;
import com.project.thejapenproject.common.jwt.SHA512;
import com.project.thejapenproject.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.NoSuchAlgorithmException;
import java.util.Map;

@Controller
@RequestMapping("/")
public class MainController {

    @Autowired
    @Qualifier("userService")
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(UserVO userVO) throws Exception {
        UserVO userData = userService.login(userVO);
        if(userData == null){
            throw new Exception();
        }


        return ResponseEntity.ok("로그인 성공");
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
