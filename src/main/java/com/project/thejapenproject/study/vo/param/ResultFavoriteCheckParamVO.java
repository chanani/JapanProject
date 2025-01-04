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
public class ResultFavoriteCheckParamVO {

    @NotNull(message = "단어 목록은 필수입니다.")
    private ArrayList<Integer> wordNum;

    @Schema(description = "아이디", example = "chanhan")
    @NotNull(message = "유저 아이디는 필수입니다.")
    private String username;


}
