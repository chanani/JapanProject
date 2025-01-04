package com.project.thejapenproject.mypage.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class GetRecordDetailsReqVO {

    @Schema(description = "아이디", example = "chanhan")
    @NotBlank(message = "회원 아이디는 필수입니다.")
    private String username;

    @Schema(description = "레코드 번호", example = "1")
    @NotNull(message = "레코드 번호는 필수입니다.")
    private Integer recordNum;


}
