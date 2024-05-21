package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.ResponseData;
import com.project.thejapenproject.command.UserAccessToken;
import com.project.thejapenproject.command.UserVO;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.common.jwt.SHA512;
import com.project.thejapenproject.common.jwt.service.AuthService;
import com.project.thejapenproject.user.service.UserService;
import com.project.thejapenproject.util.MailSend;
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
import java.util.*;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class MainController {

    private final UserService userService;
    private final AuthService authService;

    @NoneAuth
    @PostMapping("/login")
    public Object login(UserVO userVO) throws Exception {

        if (Objects.isNull(userVO)) {
            throw new Exception();
        }
        if (!StringUtils.hasText(userVO.getUsername()) || !StringUtils.hasText(userVO.getPassword())) {
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
        if (!StringUtils.hasText(map.get("username"))) {
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
                .password(SHA512.encrypt(map.get("password")))
                .user_email(map.get("user_email"))
                .user_phone(map.get("user_phone"))
                .role("role_user")
                .build();
        int success = userService.join(userVO);
        if (success <= 0) {
            throw new Exception();
        }
        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message("성공")
                .build();
    }

    /**
     * @param 
     * */
    @NoneAuth
    @PostMapping("/emailAuth")
    public ResponseEntity<String> emailAuth(@RequestBody Map<String, String> data) throws Exception {
        boolean result = userService.emailAuth(data.get("email"));
        if (result) {
            Random random = new Random();

            List<String> list = new ArrayList<>();
            for (int i = 0; i < 3; i++) list.add(String.valueOf(random.nextInt(10)));

            for (int i = 0; i < 3; i++) list.add(String.valueOf((char) (random.nextInt(26) + 65)));

            Collections.shuffle(list);
            String authToken = "";
            for(String item : list) authToken += item;

            MailSend send = new MailSend();
            send.setAuthNum(authToken);
            String mailResult = send.welcomeMailSend(data.get("email"), send.getAuthNum());
            if(!mailResult.equals("인증번호 발송에 성공하였습니다.")) {
                throw new Exception();
            }
            return ResponseEntity.ok(authToken);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email authentication failed");
        }
    }

    @NoneAuth
    @PostMapping("/findId")
    public ResponseEntity<String> findId(@RequestBody Map<String, String> data){
        String username = userService.findId(data.get("email"));
        if(!StringUtils.isEmpty(username)){
            return ResponseEntity.ok(username);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("not find username");
        }

    }

    @NoneAuth
    @PostMapping("/passwordChange")
    public ResponseEntity<String> passwordChange(@RequestBody Map<String, String> data) throws NoSuchAlgorithmException {
        int result = userService.passwordChange(data.get("email"), SHA512.encrypt(data.get("password")));
        System.out.println("result : " + result);
        if(result != 0){
            return ResponseEntity.ok("비밀번호 변경 성공");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("not changed password");
        }
    }
}
