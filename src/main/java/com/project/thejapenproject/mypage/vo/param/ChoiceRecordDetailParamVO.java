package com.project.thejapenproject.mypage.vo.param;

import io.swagger.v3.oas.annotations.media.Schema;
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

    @Schema(description = "테스트 번호", example = "1")
    @NotNull(message = "테스트 번호는 필수입니다.")
    private Integer ctrNum;
}
