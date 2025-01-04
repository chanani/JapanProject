package com.project.thejapenproject.notice.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetNoticeDetailResVO {

    @Schema(description = "공지 번호")
    private String noticeNum;

    @Schema(description = "제목")
    private String noticeTitle;

    @Schema(description = "내용")
    private String noticeContent;

    @Schema(description = "등록일")
    private String noticeRegDate;

    @Schema(description = "")
    private Integer position;


}
