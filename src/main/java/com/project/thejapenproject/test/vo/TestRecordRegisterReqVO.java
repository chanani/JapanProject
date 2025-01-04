package com.project.thejapenproject.test.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TestRecordRegisterReqVO {

    @Schema(description = "아이디", example = "chanhan")
    @NotBlank(message = "유저 아이디는 필수입니다.")
    private String username;

    @Schema(description = "단계", example = "1")
    @NotNull(message = "단계는 필수입니다.")
    private Integer level;

    @Schema(description = "점수", example = "100")
    @NotNull(message = "점수는 필수입니다.")
    private Integer point;

    @Schema(description = "시험 내용 목록")
    @NotNull(message = "시험 내용은 필수입니다.")
    private ArrayList<Object> answer;

    @Schema(description = "종류", example = "meaning")
    @NotBlank(message = "종류는 필수입니다.")
    private String kind;

}
