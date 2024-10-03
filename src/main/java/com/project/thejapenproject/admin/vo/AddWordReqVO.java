package com.project.thejapenproject.admin.vo;

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

    @NotNull(message = "등록할 단어는 필수입니다.")
    private ArrayList<AddWordListVO> list;
}
