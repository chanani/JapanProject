package com.project.thejapenproject.command.exception.controller;


import com.project.thejapenproject.command.exception.AccountTokenException;
import com.project.thejapenproject.command.exception.ErrorResponse;
import com.project.thejapenproject.command.exception.OperationErrorException;
import com.project.thejapenproject.command.exception.RequestParameterException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Order(Ordered.HIGHEST_PRECEDENCE)
@RestControllerAdvice
public class GlobalAdviseRestController {
    @ResponseBody
    @ExceptionHandler(value = Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, Object> handleAllException(Exception e) {
        String msg = "관리자에게 문의하여 주세요.\n ("+e.getMessage()+")";
        Map<String, Object> body = new HashMap<>();
        body.put("code", HttpStatus.INTERNAL_SERVER_ERROR);
        body.put("message", msg);
        log.error(e.getMessage(), e);
        return body;
    }

    @ResponseBody
    @ExceptionHandler(value = RequestParameterException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected ResponseEntity<ErrorResponse> handlerRequestParameterException(RequestParameterException e) {
        log.error(e.getMessage(), e);
        return ErrorResponse.make(e);
    }

    @ResponseBody
    @ExceptionHandler(value = AccountTokenException.class)
    protected ResponseEntity<ErrorResponse> handlerAccessTokenException(AccountTokenException e) {
        log.error(e.getMessage(), e);
        return ErrorResponse.make(e);
    }

    @ResponseBody
    @ExceptionHandler(value = OperationErrorException.class)
    protected ResponseEntity<ErrorResponse> handleOperationErrorException(OperationErrorException e) {
        log.error(e.getMessage(), e);
        return ErrorResponse.make(e);
    }
}
