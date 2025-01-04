package com.project.thejapenproject.gpt.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;


/**
 * ai 학습 그룹 등록 요청 VO
 *
 * @author chanhan
 * @class : RegisterRecordGroupReqVO
 * @since 2024-11-23 오후 05:05
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RegisterRecordGroupReqVO {

    @Schema(description = "아이디", example = "chanhan")
    @NotBlank(message = "유저 아이디는 필수입니다.")
    private String username;

    @Schema(description = "제목", example = "메시지 등록합니다.")
    @NotBlank(message = "메시지는 필수입니다.")
    private String message;

    @Schema(description = "반환할 그룹 고유번호")
    private Integer aiRecordNum;

}
