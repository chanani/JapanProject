package com.project.thejapenproject.admin.vo;

import io.swagger.v3.oas.annotations.media.Schema;
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

    @Schema(description = "제목", example = "공지 제목입니다.")
    @NotBlank(message = "제목은 필수입니다.")
    private String noticeTitle;

    @Schema(description = "내용", example = "공지 내용입니다.")
    @NotBlank(message = "내용은 필수입니다.")
    private String noticeContent;


}
