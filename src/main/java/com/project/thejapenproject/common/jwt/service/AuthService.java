package com.project.thejapenproject.common.jwt.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.thejapenproject.command.UserAccessToken;
import com.project.thejapenproject.command.UserVO;
import com.project.thejapenproject.common.jwt.JWTProvider;
import com.project.thejapenproject.common.jwt.SHA512;
import com.project.thejapenproject.common.redis.RedisProvider;
import com.project.thejapenproject.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class AuthService {
    private final JWTProvider jwtProvider;
    private final ObjectMapper objectMapper;
    private final UserService userService;
    private final RedisProvider redisProvider;

    private final String SESSION_KEY = "S_SESSION";

    public UserAccessToken token(UserVO userVO) throws Exception {
        String password = SHA512.encrypt(userVO.getPassword());
        UserVO userData = userService.login(userVO.getUsername(), password);
        if(userData == null){
            throw new Exception();
        }

        String accessToken = jwtProvider.createAccessToken(userData);
        String refreshToken = jwtProvider.createRefreshToken(userData);

        UserAccessToken userAccessToken = UserAccessToken.builder().accessToken(accessToken).refreshToken(refreshToken).build();

        // Redis에 저장하여 중복 로그인을 막는다.
        Map<String, String> map = new HashMap<String, String>();
        map.put(userVO.getUsername(), objectMapper.writeValueAsString(userAccessToken));
        redisProvider.setHashOps(SESSION_KEY, map);
        return userAccessToken;
    }

    public void logout(String username) throws Exception {
        redisProvider.deleteHashOps(SESSION_KEY, username);
    }


}
