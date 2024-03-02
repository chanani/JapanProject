package com.project.thejapenproject.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserVO {
    private String username;
    private String password;
    private String user_name;
    private String user_email;
    private String user_phone;
    private String role;
    private Timestamp user_regdate;


}
