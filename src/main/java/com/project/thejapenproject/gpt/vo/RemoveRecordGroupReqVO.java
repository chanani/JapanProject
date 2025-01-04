package com.project.thejapenproject.gpt.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


/**
 * ai 학습 그룹 삭제 요청 VO
 *
 * @author chanhan
 * @class : RemoveRecordGroupReqVO
 * @since 2024-11-26 오후 10:44
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RemoveRecordGroupReqVO {

    @Schema(description = "아이디", example = "chanhan")
    @NotBlank(message = "유저 아이디는 필수입니다.")
    private String username;

    @Schema(description = "질문 그룹 번호", example = "1")
    @NotNull(message = "질문 번호는 필수입니다.")
    private Integer aiRecordNum;

}
