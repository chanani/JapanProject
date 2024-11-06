package com.project.thejapenproject.mypage.vo.param;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * 단답형 단어 테스트 상세 내역 요청 VO
 *
 * @author chanhan
 * @class : ShortRecordDetailParamVO
 * @since 2024-11-06 오후 08:41
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ShortRecordDetailParamVO {

    @NotNull(message = "테스트 번호는 필수입니다.")
    private Integer strNum;
}
