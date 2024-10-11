package com.project.thejapenproject.study.vo.param;

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

    @NotNull(message = "단어는 필수입니다.")
    private Integer wordNum;

    @NotNull(message = "유저 아이디는 필수입니다.")
    private String username;

    // 현재 즐겨찾기 여부
    private String current;
}
