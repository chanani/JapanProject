package com.project.thejapenproject.common.interceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.thejapenproject.command.JwtPayload;
import com.project.thejapenproject.command.UserVO;
import com.project.thejapenproject.common.TokenType;
import com.project.thejapenproject.common.annotation.NoneAuth;
import com.project.thejapenproject.common.annotation.NoneCheckToken;
import com.project.thejapenproject.common.jwt.JWTProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Slf4j
@RequiredArgsConstructor
@Component
public class AuthHandlerInterceptor implements HandlerInterceptor {
    private final ObjectMapper objectMapper;
    private final JWTProvider jwtProvider;

    protected String readBody(HttpServletRequest request) throws IOException {
        BufferedReader input = new BufferedReader(new InputStreamReader(request.getInputStream()));
        StringBuilder builder = new StringBuilder();
        String buffer;

        while ((buffer = input.readLine()) != null) {
            if (builder.length() > 0) {
                builder.append("\n");
            }
            builder.append(buffer);
        }

        return builder.toString();
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (handler instanceof HandlerMethod) {
            NoneAuth noneAuth = ((HandlerMethod) handler).getMethodAnnotation(NoneAuth.class);
            if (noneAuth != null) {
                // JWT 인증이 필요없는 API 처리
                return true;
            } else {
                // JWT 인증 토큰이 없으면 오류를 리턴하도록 한다.
                String accessToken = this.getBearerToken(request);
                if (StringUtils.hasText(accessToken)) {
                    NoneCheckToken nonCheckToken = ((HandlerMethod) handler).getMethodAnnotation(NoneCheckToken.class);
                    if (nonCheckToken == null) {
                        // 로그아웃이 아닌 경우만 Access Token을 검사하도록 한다.
                        jwtProvider.verifyToken(TokenType.ACCESS_TOKEN, accessToken);
                    }

                    try {
                        // Payload 가져오는 기능
                        String payload = jwtProvider.getPayload(accessToken);
                        if (!StringUtils.hasText(payload)) {
                            throw new Exception();
                        }

                        JwtPayload jwtPayload = objectMapper.readValue(payload, JwtPayload.class);
                        if (!StringUtils.hasText(jwtPayload.getData())) {
                            throw new Exception();
                        }

                        UserVO userVO = objectMapper.readValue(jwtPayload.getData(), UserVO.class);
                        request.setAttribute("username", userVO.getUsername());
                        request.setAttribute("Role", userVO.getRole());

                    } catch (Exception e) {
                        log.error("", e);
                    }
                } else {
                    throw new Exception();
                }

            }
        }

        return true;
    }

    protected String getBearerToken(HttpServletRequest request) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (token == null) {
            return null;
        }

        String[] bearerTokens = token.split(" ");
        return (bearerTokens[0].equalsIgnoreCase("Bearer") ? bearerTokens[1] : null);
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
