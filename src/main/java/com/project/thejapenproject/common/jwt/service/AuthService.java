package com.project.thejapenproject.common.jwt.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.thejapenproject.command.UserAccessToken;
import com.project.thejapenproject.command.UserVO;
import com.project.thejapenproject.command.exception.AccountTokenException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
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

    public UserAccessToken refresh(UserVO userVO, String refreshToken) throws Exception {
        // Redis에 Refresh 토큰이 있는지 확인한다.
        String value = redisProvider.getHashOps(SESSION_KEY, String.valueOf(userVO.getUsername()));
        if (value.isEmpty()) {
            throw new AccountTokenException(ErrorCode.REFRESH_TOKEN_EXPIRED);
        }

        log.debug("value12345" + value);
        // 비교하기 위해서 객체에서 추출한다.
        UserAccessToken redisToken = objectMapper.readValue(value, UserAccessToken.class);
        if (!redisToken.getRefreshToken().equals(refreshToken)) {
            // 다르면 재로그인 하도록 유도한다.
            throw new AccountTokenException(ErrorCode.REFRESH_TOKEN_NO_SAME);
        }

        // Access Token만 재발급하여 전송한다.
        String accessToken = jwtProvider.createAccessToken(userVO);
        UserAccessToken userAccessToken = UserAccessToken.builder().accessToken(accessToken).refreshToken(redisToken.getRefreshToken()).build();

        // 재발급된 토큰을 Redis에 저장한다.
        Map<String, String> map = new HashMap<String, String>();
        map.put(String.valueOf(userVO.getUsername()), objectMapper.writeValueAsString(userAccessToken));
        redisProvider.setHashOps(SESSION_KEY, map);
        return userAccessToken;
    }

}
