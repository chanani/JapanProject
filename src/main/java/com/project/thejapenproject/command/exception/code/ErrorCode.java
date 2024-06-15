package com.project.thejapenproject.command.exception.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    SUCCESS(HttpStatus.OK, "Success"),
    // HTTP Status Code 관련 오류
    WRONG_PARAM(HttpStatus.BAD_REQUEST, "잘못된 요청 입니다."),
    WRONG_PARAM_NAME_LENGTH(HttpStatus.BAD_REQUEST, "회원가입 시 이름의 길이는 2자 이상 이어야 합니다."),
    WRONG_PARAM_PHONE_LENGTH(HttpStatus.BAD_REQUEST, "회원가입 시 핸드폰 번호는 11자 이어야 합니다."),
    WRONG_PARAM_NUMBER_LENGTH(HttpStatus.BAD_REQUEST, "인증 번호는 최소 5자 이상이어야 합니다."),
    ALREADY_REGISTRY_PHONE(HttpStatus.BAD_REQUEST, "이미 사용중인 핸드폰번호입니다."),
    ALREADY_REGISTRY_PHONE1(HttpStatus.BAD_REQUEST, "이미 가입된 회원입니다."),
    NOT_FOUND_USERS_PHONE(HttpStatus.BAD_REQUEST, "가입한 회원의 정보가 없습니다."),
    FAILED_TO_SING_UP(HttpStatus.BAD_REQUEST, "회원가입에 실패했습니다."),
    WRONG_PARAM1(HttpStatus.BAD_REQUEST, "파라미터가 잘못요청되었습니다."),

    CERTIFY_CODE_INVALIDATE(HttpStatus.UNAUTHORIZED, "인증번호는 6자리입니다."),
    CERTIFY_CODE_NOT_FOUND(HttpStatus.UNAUTHORIZED, "인증코드 처리가 실패하였습니다."),

    NOT_FOUND_USERNAME(HttpStatus.UNAUTHORIZED, "사용자의 아이디를 찾을 수 없습니다."),

    DO_NOT_USER_MATCHING(HttpStatus.UNAUTHORIZED, "아이디 또는 패스워드가 잘못되었습니다."),
    ALREADY_REGISTRY_EMAIL(HttpStatus.TOO_EARLY, "이미 등록된 E-Mail 입니다."),
    WRONG_EMAIL(HttpStatus.BAD_REQUEST, "처리할 수 없는 E-Mail 입니다."),
    NEW_PASSWORD_NOT_SAME(HttpStatus.BAD_REQUEST, "변경하려는 비밀번호가 잘못되었습니다."),
    TEMPORARY_PASSWORD_NOT_MATCHING(HttpStatus.BAD_REQUEST, "요청 임시코드가 맞지 않습니다."),
    CHECK_PhoneNumber(HttpStatus.TOO_MANY_REQUESTS, "요청 간격이 너무 짧습니다. 잠시 후 다시 시도해주세요."),

    // 토큰 관련 오류 - UNAUTHORIZED:401(리프레시토큰요청필요할때) , FORBIDDEN:403(팅겨내야할때)
    ACCESS_TOKEN_NOT_FOUND(HttpStatus.FORBIDDEN, "Access Token이 없습니다. 재로그인 하시기 바랍니다."),
    ACCESS_TOKEN_SIG_WRONG(HttpStatus.FORBIDDEN, "Access Token이 잘못된 서명입니다. (해킹)"),
    ACCESS_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "Access Token이 만료되었습니다. 재로그인 하시기 바랍니다."),
    ACCESS_TOKEN_NOT_SUPPORT(HttpStatus.FORBIDDEN, "Access Token이 지원되지 않는 토큰 입니다. (해킹)"),
    ACCESS_TOKEN_WRONG(HttpStatus.FORBIDDEN, "Access Token이 토큰이 잘못되었습니다. (해킹)"),
    REFRESH_TOKEN_NOT_FOUND(HttpStatus.FORBIDDEN, "Refresh Token이 없습니다. 재로그인 하시기 바랍니다."),
    REFRESH_TOKEN_SIG_WRONG(HttpStatus.FORBIDDEN, "Refresh Token이 잘못된 서명입니다. (해킹)"),
    REFRESH_TOKEN_NOT_SUPPORT(HttpStatus.FORBIDDEN, "Refresh Token이 지원되지 않는 토큰 입니다. (해킹)"),
    REFRESH_TOKEN_EXPIRED(HttpStatus.FORBIDDEN, "만료되었습니다. 재로그인 하시기 바랍니다."),
    REFRESH_TOKEN_NO_SAME(HttpStatus.FORBIDDEN, "중복 로그인 또는 요청이 다릅니다. 재로그인 하시기 바랍니다."),
    REFRESH_TOKEN_WRONG(HttpStatus.FORBIDDEN, "Refresh Token이 토큰이 잘못되었습니다. (해킹)"),

    // 프로세스 오류
    NOT_FOUND_USER_INFO_BY_THIS_PHONE_NUMBER(HttpStatus.FORBIDDEN, "해당 핸드폰번호로 가입된 유저의 정보를 찾을 수 없습니다.");

    private final HttpStatus errorCode;
    private final String message;

    public HttpStatus getErrorCode() {
        return this.errorCode;
    }

    public String getMessage() {
        return this.message;
    }
    }
