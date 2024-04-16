package com.project.thejapenproject.common.jwt.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.thejapenproject.common.jwt.JWTProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class AuthService {
    private final JWTProvider jwtProvider;
    private final ObjectMapper objectMapper;

}
