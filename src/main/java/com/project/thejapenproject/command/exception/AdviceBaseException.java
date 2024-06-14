package com.project.thejapenproject.command.exception;

import com.project.thejapenproject.command.exception.code.ErrorCode;
import lombok.Getter;

@Getter
public class AdviceBaseException extends RuntimeException {
    private final ErrorCode errorCode;

    public AdviceBaseException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public AdviceBaseException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }
}
