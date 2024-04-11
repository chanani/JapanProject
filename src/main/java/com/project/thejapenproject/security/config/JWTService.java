package com.project.thejapenproject.security.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import javax.annotation.Resource;
import java.util.Date;



public class JWTService {

    @Value("${secretKey}")
    private static String secretKey = "japen";
    private static RedisTemplate<String, String> redisTemplate;

    @Resource
    private ValueOperations<String, String> valueOperations;
    public JWTService(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    // 엑세스토큰 생성
    public static String createAccessToken(String username, String role){

        // 알고리즘 생성
        Algorithm alg = Algorithm.HMAC256(secretKey);

        // 만료시간
        long expire = System.currentTimeMillis() + 7200000; // 2시간 뒤

        // 토큰생성
        JWTCreator.Builder builder = JWT.create().withSubject(username) // 주제
                .withClaim("role", role)
                .withIssuedAt(new Date()) // 발행일
                .withExpiresAt(new Date(expire)) // 만료시간
                .withIssuer("The Japan"); // 발행자
        // .withClaim("admin", "공개클레임 홍길동 !"); // + 공개 클레임

        return builder.sign(alg); // 빌더객체 생성
    }

    // 리프레쉬토큰 생성
    public static String createRefreshToken(String username, String role){

        // 알고리즘 생성
        Algorithm alg = Algorithm.HMAC256(secretKey);

        // 만료시간
        long expire = System.currentTimeMillis() + 1209600000; // 2주

        // 토큰생성
        JWTCreator.Builder builder = JWT.create().withSubject(username) // 주제
                .withClaim("role", role)
                .withIssuedAt(new Date()) // 발행일
                .withExpiresAt(new Date(expire)) // 만료시간
                .withIssuer("The Japan"); // 발행자
        // .withClaim("admin", "공개클레임 홍길동 !"); // + 공개 클레임

//        System.out.println("create Refresh Token method");
//        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
//        valueOperations.set(username, builder.sign(alg));
//        System.out.println("redis에 저장된 토큰 " +valueOperations.get("username"));
        return builder.sign(alg); // 빌더객체 생성
    }


    // 토큰의 유효성
    public static boolean validateToken (String token)
            throws JWTVerificationException {
        Algorithm alg = Algorithm.HMAC256(secretKey);

        JWTVerifier verifier = JWT.require(alg).build(); // token을 검증할 객체
        verifier.verify(token); // 토큰검사 : 만료기간 or 토큰위조가 발생하면 throws 처리됩니다.

        return true; // 검증 성공 시 true, 검증 실패 시 false
    }


}
