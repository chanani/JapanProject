package com.project.thejapenproject.study.vo.param;

import io.swagger.v3.oas.annotations.media.Schema;
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

    @Schema(description = "페이지수", example = "1")
    @NotNull(message = "페이지 수는 필수입니다.")
    @Builder.Default
    private Integer page = 1;

    @Schema(description = "목록 수", example = "10")
    @NotNull(message = "목록 수는 필수입니다.")
    @Builder.Default
    private Integer size = 10;

    @Schema(description = "시간 정렬 기준", example = "ASC")
    @NotBlank(message = "시간 정렬 기준은 필수입니다.")
    @Builder.Default
    private String timeSort = "ASC";

    @Schema(description = "단어 정렬 차순", example = "ASC")
    @NotBlank(message = "단어 정렬 차순은 필수입니다.")
    @Builder.Default
    private String wordSort = "ASC";

    @Schema(description = "검색 키워드", example = "검색")
    private String keyword;

    @Schema(description = "offset", hidden = true)
    private Integer offset;


}
