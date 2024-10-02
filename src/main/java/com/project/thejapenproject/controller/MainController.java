package com.project.thejapenproject.controller;

import com.project.thejapenproject.command.*;
import com.project.thejapenproject.command.exception.RequestParameterException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.common.jwt.SHA512;
import com.project.thejapenproject.common.jwt.service.AuthService;
import com.project.thejapenproject.mainpage.vo.LoginReqVO;
import com.project.thejapenproject.mainpage.vo.LogoutReqVO;
import com.project.thejapenproject.mainpage.vo.MailAuthReqVO;
import com.project.thejapenproject.mainpage.vo.PasswordChangeReqVO;
import com.project.thejapenproject.notice.vo.GetNoticeDetailResVO;
import com.project.thejapenproject.notice.vo.param.GetNoticeDetailReqVO;
import com.project.thejapenproject.user.service.UserService;
import com.project.thejapenproject.utils.MailSend;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.util.StringUtils;

import javax.validation.Valid;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@RestController
@RequestMapping(value = "/", produces = "application/json")
@RequiredArgsConstructor
public class MainController {

    private final UserService userService;
    private final AuthService authService;

    @NoneAuth
    @PostMapping("/login")
    public Object login(@Valid @RequestBody LoginReqVO loginReqVO) throws Exception {
        try {
            UserAccessToken userAccessToken = authService.token(loginReqVO);
            return ResponseData.builder()
                    .code(HttpStatus.OK.value())
                    .message(ErrorCode.SUCCESS.getMessage())
                    .data(userAccessToken)
                    .build();
        } catch (Exception e) {
            throw new RequestParameterException(ErrorCode.DO_NOT_USER_MATCHING);
        }
    }


    @NoneCheckToken
    @PostMapping("/logout")
    public Object logout(@Valid @RequestBody LogoutReqVO logoutReqVO) throws Exception {

        authService.logout(logoutReqVO.getUsername());
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
            throw new RequestParameterException(ErrorCode.FAILED_TO_SING_UP);
        }

        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message("성공")
                .build();
    }

    @NoneAuth
    @PostMapping("/refresh")
    public Object refresh(@RequestBody RequestUserLogin requestUserLogin) throws Exception {
        if (Objects.isNull(requestUserLogin)) {
            throw new RequestParameterException(ErrorCode.WRONG_PARAM);
        }

        if (!org.springframework.util.StringUtils.hasText(requestUserLogin.getRefreshToken())) {
            throw new RequestParameterException(ErrorCode.WRONG_PARAM);
        }

        UserAccessToken userAccessToken = authService.refresh(UserVO.builder().username(requestUserLogin.getUsername()).build(), requestUserLogin.getRefreshToken());
        return ResponseData.builder().code(HttpStatus.OK.value()).message(ErrorCode.SUCCESS.getMessage()).data(userAccessToken).build();
    }

    /**
     * @param kind      : email, username, phone 중 1개로 넘어오는 중복체크 종류
     * @param attribute : 중복 체크 확인할 값
     **/
    @NoneAuth
    @GetMapping("/check/{kind}/{attribute}")
    public ResponseEntity<String> checkEmail(@PathVariable("kind") String kind,
                                             @PathVariable("attribute") String attribute) throws Exception {
        if (!StringUtils.hasText(kind) || !StringUtils.hasText(attribute)) throw new Exception();
        try {
            boolean result = false;
            if (kind.equals("email")) result = userService.checkEmail(attribute);
            else if (kind.equals("username")) result = userService.checkId(attribute);
            else if (kind.equals("phone")) result = userService.checkPhone(attribute);
            return ResponseEntity.ok(String.valueOf(result));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * @param mailAuthReqVO : 이메일 인증을 위해 넘어오는 값
     **/
    @NoneAuth
    @PostMapping("/emailAuth")
    public ResponseEntity<String> emailAuth(@Valid @RequestBody MailAuthReqVO mailAuthReqVO) throws Exception {
        boolean result = userService.emailAuth(mailAuthReqVO.getEmail());
        if (result) {
            Random random = new Random();

            List<String> list = new ArrayList<>();

            for (int i = 0; i < 3; i++) {
                list.add(String.valueOf(random.nextInt(10)));
            }

            for (int i = 0; i < 3; i++) {
                list.add(String.valueOf((char) (random.nextInt(26) + 65)));
            }

            Collections.shuffle(list);
            String authToken = "";
            for (String item : list) authToken += item;

            MailSend send = new MailSend();
            send.setAuthNum(authToken);
            String mailResult = send.welcomeMailSend(mailAuthReqVO.getEmail(), send.getAuthNum());
            if (!mailResult.equals("인증번호 발송에 성공하였습니다.")) {
                throw new Exception();
            }
            return ResponseEntity.ok(authToken);
        } else {
            throw new RequestParameterException(ErrorCode.CERTIFY_CODE_NOT_FOUND);
        }
    }

    @NoneAuth
    @PostMapping("/findId")
    public ResponseEntity<String> findId(@Valid @RequestBody MailAuthReqVO mailAuthReqVO) {
        String username = userService.findId(mailAuthReqVO.getEmail());
        if (!StringUtils.isEmpty(username)) {
            return ResponseEntity.ok(username);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("not find username");
        }
    }

    @NoneAuth
    @PostMapping("/passwordChange")
    public ResponseEntity<String> passwordChange(@Valid @RequestBody PasswordChangeReqVO passwordChangeReqVO) throws NoSuchAlgorithmException {
        if (userService.passwordChange(passwordChangeReqVO.getEmail(), SHA512.encrypt(passwordChangeReqVO.getPassword())) > 0) {
            return ResponseEntity.ok("비밀번호 변경 성공");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("not changed password");
        }
    }

    @PostMapping("/user-icon")
    @NoneCheckToken
    public ResponseData getUserIcon(@Valid @RequestBody GetUserIconReqVO getUserIconReqVO) {
        String image_path = userService.getUserIcon(getUserIconReqVO);
        return ResponseData.builder()
                .code(HttpStatus.OK.value())
                .message(ErrorCode.SUCCESS.getMessage())
                .data(image_path)
                .build();
    }
}
