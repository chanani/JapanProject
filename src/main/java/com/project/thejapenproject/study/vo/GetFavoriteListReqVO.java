package com.project.thejapenproject.study.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * 즐겨찾기 목록 요청 VO
 *
 * @author chanhan
 * @class : GetFavoriteListReqVO
 * @since 2024-10-30 오후 09:17
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetFavoriteListReqVO {

    @NotBlank(message = "아이디는 필수입니다.")
    private String username;

    @NotNull(message = "페이지 수는 필수입니다.")
    private Integer page = 1;

    @NotNull(message = "목록 수는 필수입니다.")
    private Integer size = 10;

    private Integer offset;

}
