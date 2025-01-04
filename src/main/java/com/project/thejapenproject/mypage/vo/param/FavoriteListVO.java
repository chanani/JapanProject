package com.project.thejapenproject.mypage.vo.param;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class FavoriteListVO {

    @Schema(description = "아이디", example = "chanhan")
    @NotBlank(message = "유저 아이디는 필수입니다.")
    private String username;

    @Schema(description = "페이지 수", example = "1")
    @NotNull(message = "페이지 수는 필수입니다.")
    private Integer page = 1;

    @Schema(description = "목록 수", example = "10")
    @NotNull(message = "목록 수는 필수입니다.")
    private Integer size = 10;

    @Schema(description = "offset", hidden = true)
    private Integer offset;

    @Schema(description = "정렬 기준", example = "new")
    @NotBlank(message = "정렬 기준은 필수입니다.")
    @Pattern(regexp = "new|older|random", message = "new 또는 older 또는 random 만 전달 가능합니다.")
    private String sort;

}
