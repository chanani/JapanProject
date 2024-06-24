package com.project.thejapenproject.common.jwt;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.thejapenproject.command.UserVO;
import com.project.thejapenproject.command.exception.RequestParameterException;
import com.project.thejapenproject.command.exception.code.ErrorCode;
import com.project.thejapenproject.common.TokenType;
import io.jsonwebtoken.*;

import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
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
        return "Bearer " + Jwts.builder()
                .claim("data", objectMapper.writeValueAsString(userVO))
                .setSubject("Authorize")
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenTime))
                .signWith(SignatureAlgorithm.HS256, secretKey.getBytes())
                .compact();
    }

    public String createRefreshToken(UserVO userVO) throws Exception {
        return "Bearer " + Jwts.builder()
                .claim("data", objectMapper.writeValueAsString(userVO))
                .setSubject("Authorize")
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + refreshTokenTime))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)), SignatureAlgorithm.HS512)
                .compact();
    }

    public void verifyToken(TokenType tokenType, String jwtToken) throws Exception {
        System.out.println("verifyToken method : " + jwtToken);
        try {
            Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8))).build().parseSignedClaims(jwtToken);
        } catch (SecurityException | MalformedJwtException e) {
            log.error(e.getMessage(), e);
            if (tokenType == TokenType.ACCESS_TOKEN){
                throw new Exception();
            } else{
                throw new Exception();
            }
        } catch (ExpiredJwtException e) {
            log.error(e.getMessage(), e);
            if (tokenType == TokenType.ACCESS_TOKEN) {
                throw new RequestParameterException(ErrorCode.ACCESS_TOKEN_EXPIRED);
            } else {
                throw new RequestParameterException(ErrorCode.ACCESS_TOKEN_NOT_FOUND);
            }
        } catch (UnsupportedJwtException e) {
            log.error(e.getMessage(), e);
            if (tokenType == TokenType.ACCESS_TOKEN) {
                throw new Exception();
            } else {
                throw new Exception();
            }
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage(), e);
            if (tokenType == TokenType.ACCESS_TOKEN) {
                throw new Exception();
            } else {
                throw new Exception();
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            if (tokenType == TokenType.ACCESS_TOKEN) {
                throw new Exception();
            } else {
                throw new Exception();
            }
        }
    }

    public String getPayload(String jwtToken) {
        String [] splitStr = StringUtils.tokenizeToStringArray(jwtToken, ".");
        if (splitStr.length < 1) {
            return null;
        }

        byte[] decodedBytes = Base64.getDecoder().decode(splitStr[1]);
        return new String(decodedBytes);
    }


}
