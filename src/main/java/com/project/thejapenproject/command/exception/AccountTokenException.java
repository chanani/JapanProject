package com.project.thejapenproject.command.exception;

import com.project.thejapenproject.command.exception.code.ErrorCode;

public class AccountTokenException extends AdviceBaseException {
    public AccountTokenException(ErrorCode errorCode) {
        super(errorCode);
    }

    public AccountTokenException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }
}
