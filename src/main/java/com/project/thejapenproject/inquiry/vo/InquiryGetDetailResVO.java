package com.project.thejapenproject.inquiry.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InquiryGetDetailResVO {

    private Integer inquiryNum;
    private String inquiryTitle;
    private String inquiryWriter;
    private String inquiryContent;
    private String inquiryRegdate;
    private String inquiryComment;
}
