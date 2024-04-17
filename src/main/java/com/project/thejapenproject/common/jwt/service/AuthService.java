package com.project.thejapenproject.common.jwt.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.thejapenproject.command.UserAccessToken;
import com.project.thejapenproject.command.UserVO;
import com.project.thejapenproject.common.jwt.JWTProvider;
import com.project.thejapenproject.common.jwt.SHA512;
import com.project.thejapenproject.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class AuthService {
    private final JWTProvider jwtProvider;
    private final ObjectMapper objectMapper;
    private final UserService userService;
    public UserAccessToken token(UserVO userVO) throws Exception {
        String password = SHA512.encrypt(userVO.getPassword());
        System.out.println("AuthService");
        UserVO userData = userService.login(userVO.getUsername(), password);
        if(userData == null){
            throw new Exception();
        }

        String accessToken = jwtProvider.createAccessToken(userVO);
        String refreshToken = jwtProvider.createRefreshToken(userVO);

        UserAccessToken userAccessToken = UserAccessToken.builder().accessToken(accessToken).refreshToken(refreshToken).build();

        // redis에서 관리할 수 있도록 로직 생성해야됨
        //
        return userAccessToken;
    }


}
