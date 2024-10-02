package com.project.thejapenproject.mypage.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserMypageResVO {

    private String username;
    private String userName;
    private String userEmail;
    private String userPhone;
    private String imagePath;


}
