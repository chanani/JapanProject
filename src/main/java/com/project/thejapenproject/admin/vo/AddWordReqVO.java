package com.project.thejapenproject.admin.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddWordReqVO {

    @Schema(description = "단어 목록")
    @NotNull(message = "등록할 단어는 필수입니다.")
    private ArrayList<AddWordListVO> list;
}
