package com.project.thejapenproject.command.exception;

import com.project.thejapenproject.command.exception.code.ErrorCode;

public class RequestParameterException  extends AdviceBaseException {
    public RequestParameterException(ErrorCode errorCode) {
        super(errorCode);
    }

    public RequestParameterException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }
}
