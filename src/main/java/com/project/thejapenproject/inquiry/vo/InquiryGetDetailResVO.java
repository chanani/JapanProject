package com.project.thejapenproject.inquiry.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InquiryGetDetailResVO {

    @Schema(description = "문의 번호")
    private Integer inquiryNum;

    @Schema(description = "제목")
    private String inquiryTitle;

    @Schema(description = "작성자")
    private String inquiryWriter;

    @Schema(description = "내용")
    private String inquiryContent;

    @Schema(description = "등록일")
    private String inquiryRegdate;

    @Schema(description = "답글")
    private String inquiryComment;
}
