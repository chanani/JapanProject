package com.project.thejapenproject.admin.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddNoticeReqVO {

    @NotBlank(message = "제목은 필수입니다.")
    private String noticeTitle;

    @NotBlank(message = "내용은 필수입니다.")
    private String noticeContent;


}
