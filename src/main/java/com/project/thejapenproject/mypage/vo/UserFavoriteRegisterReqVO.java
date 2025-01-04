package com.project.thejapenproject.mypage.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * 검색페이지에서 단어 즐겨찾기 추가 요청 VO
 *
 * @author chanhan
 * @class : UserFavoriteRegisterReqVO
 * @since 2024-10-30 오후 08:31
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserFavoriteRegisterReqVO {

    @Schema(description = "아이디", example = "chanhan")
    @NotBlank(message = "회원 아이디는 필수입니다.")
    private String username;

    @Schema(description = "단어 번호", example = "1")
    @NotNull(message = "단어 번호는 필수입니다.")
    private Integer wordNum;


}
