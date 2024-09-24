package com.project.thejapenproject.notice.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetListReqVO {

    @NotNull
    private Integer page = 1;

    @NotNull
    private Integer size = 10;

    private Integer offset;
}
