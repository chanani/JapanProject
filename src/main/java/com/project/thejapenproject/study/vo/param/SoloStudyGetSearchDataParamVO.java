package com.project.thejapenproject.study.vo.param;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SoloStudyGetSearchDataParamVO {

    @NotNull(message = "페이지 수는 필수입니다.")
    private Integer page = 1;

    @NotNull(message = "목록 수는 필수입니다.")
    private Integer size = 10;

    @NotBlank(message = "시간 정렬 기준은 필수입니다.")
    private String timeSort = "ASC";

    @NotBlank(message = "단어 정렬 차순은 필수입니다.")
    private String wordSort = "ASC";

    private String keyword;

    private Integer offset;


}
