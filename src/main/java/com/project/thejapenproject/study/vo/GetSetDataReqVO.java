package com.project.thejapenproject.study.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;


/**
 * 세트 단어 목록 조회 요청 VO
 *
 * @author chanhan
 * @class : GetSetDataReqVO
 * @since 2024-11-27 오후 07:37
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetSetDataReqVO {

    @NotNull(message = "페이지 수는 필수입니다.")
    private Integer page = 1;

    @NotNull(message = "목록 수는 필수입니다.")
    private Integer size = 10;

    private Integer offset;

    @NotNull(message = "아이디는 필수입니다.")
    private String username;


}
