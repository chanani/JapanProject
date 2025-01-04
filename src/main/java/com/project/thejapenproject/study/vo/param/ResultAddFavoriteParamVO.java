package com.project.thejapenproject.study.vo.param;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResultAddFavoriteParamVO {

    @Schema(description = "단어 번호", example = "1")
    @NotNull(message = "단어 번호는 필수입니다.")
    private Integer wordNum;

    @Schema(description = "아이디", example = "chanhan")
    @NotNull(message = "유저 아이디는 필수입니다.")
    private String username;

    // 현재 즐겨찾기 여부
    @Schema(description = "현재 즐겨 찾기 여부", hidden = true)
    private String current;
}
