package com.project.thejapenproject.command;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ResponseData {
    private int code;
    private String message;
    private Object data;
}
