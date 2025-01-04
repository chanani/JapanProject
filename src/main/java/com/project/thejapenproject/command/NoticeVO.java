package com.project.thejapenproject.command;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoticeVO {

    @Schema(description = "공지 번호", example = "1")
    private Integer noticeNum;

    @Schema(description = "제목", example = "공지합니다.")
    private String noticeTitle;

    @Schema(description = "내용", example = "공지가 있습니다 확인해보세요.")
    private String noticeContent;

    @Schema(description = "둥록일", example = "2024-01-01 00:00")
    private Timestamp noticeRegdate;

    @Schema(description = "총 데이터 수", example = "10")
    private Integer totalElements;

}
