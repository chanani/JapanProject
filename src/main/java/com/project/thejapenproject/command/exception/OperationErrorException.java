package com.project.thejapenproject.command.exception;

import com.project.thejapenproject.command.exception.code.ErrorCode;

public class OperationErrorException extends AdviceBaseException{
    public OperationErrorException(ErrorCode errorCode) {super(errorCode);}
    public OperationErrorException (ErrorCode errorCode, String message) {
        super(errorCode, message);
    }
}
