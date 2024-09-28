package com.project.thejapenproject.inquiry.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetInquiryListReqVO {

    @NotNull
    private Integer page = 1;

    @NotNull
    private Integer size = 10;

    private String keyword;

    private Integer offset;


}
