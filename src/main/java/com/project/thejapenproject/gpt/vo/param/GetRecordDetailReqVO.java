package com.project.thejapenproject.gpt.vo.param;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


/**
 * ai 질문 이전 기록 상세 조회 요청 VO
 *
 * @author chanhan
 * @class : GetRecordDetailReqVO
 * @since 2024-11-24 오후 06:05
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class GetRecordDetailReqVO {

    // 아이디
    @NotBlank(message = "유저 아이디는 필수입니다.")
    private String username;

    // 질문 그룹 번호
    @NotNull(message = "질문 그룹 번호는 필수입니다.")
    private Integer aiRecordNum;


}
