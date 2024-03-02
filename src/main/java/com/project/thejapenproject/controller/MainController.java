package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.UserVO;
import com.project.thejapenproject.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
@RequestMapping("/")
public class MainController {

    @Autowired
    @Qualifier("userService")
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody Map<String, Object> map){
        UserVO userVO = UserVO.builder()
                .user_name((String) map.get("user_name"))
                .username((String) map.get("username"))
                .password(passwordEncoder.encode((String) map.get("password")))
                .user_email((String) map.get("user_email"))
                .user_phone((String) map.get("user_phone"))
                .role("role_user")
                .build();
        userService.join(userVO);
        return ResponseEntity.ok("성공");
    }



}
