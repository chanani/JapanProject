package com.project.thejapenproject.mypage.vo.param;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ChoiceRecordDetailParamVO {

    @NotNull(message = "테스트 번호는 필수입니다.")
    private Integer ctrNum;
}
