package com.project.thejapenproject.common.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.thejapenproject.command.UserVO;
import io.jsonwebtoken.Jwts;

import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Slf4j
@RequiredArgsConstructor
@Component
public class JWTProvider {
    private final ObjectMapper objectMapper;

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.accessToken-time}")
    private Long accessTokenTime;

    @Value("${jwt.refreshToken-time}")
    private Long refreshTokenTime;

    public String createAccessToken(UserVO userVO) throws Exception {
        return Jwts.builder()
                .claim("data", objectMapper.writeValueAsString(userVO))
                .setSubject("Authorize")
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenTime))
                .signWith(SignatureAlgorithm.HS256, secretKey.getBytes())
                .compact();
    }

    public String createRefreshToken(UserVO userVO) throws Exception {
        return Jwts.builder()
                .claim("data", objectMapper.writeValueAsString(userVO))
                .setSubject("Authorize")
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + refreshTokenTime))
                .signWith(SignatureAlgorithm.HS256, secretKey.getBytes())
                .compact();
    }

}
