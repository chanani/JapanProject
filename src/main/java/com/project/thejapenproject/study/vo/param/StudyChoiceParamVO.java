package com.project.thejapenproject.study.vo.param;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudyChoiceParamVO {

    @Schema(description = "난이도", example = "1")
    @NotNull(message = "난이도는 필수입니다.")
    private Integer level;

    @Schema(description = "단어 개수", example = "10")
    @NotNull(message = "단어 개수는 필수입니다.")
    private Integer number;



}
