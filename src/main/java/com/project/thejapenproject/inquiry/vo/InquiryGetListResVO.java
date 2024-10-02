package com.project.thejapenproject.inquiry.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InquiryGetListResVO {

    private Integer inquiryNum;
    private String inquiryTitle;
    private String inquiryWriter;
    private String inquirySecret;
    private String inquiryRegdate;
    private String inquiryComment;
    private Integer state;

    private Integer totalElements;
}
