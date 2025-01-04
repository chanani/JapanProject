package com.project.thejapenproject.command;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class InquiryVO {
    @Schema(description = "문의 번호", example = "1")
    private int inquiry_num;

    @Schema(description = "제목", example = "문의합니다.")
    private String inquiry_title;

    @Schema(description = "제목", example = "일정 문의 드립니다.")
    private String inquiry_content;

    @Schema(description = "작성자", example = "이찬한")
    private String inquiry_writer;

    @Schema(description = "비밀번호", example = "1234")
    private String inquiry_password;

    @Schema(description = "공개 여부", example = "Y")
    private String inquiry_secret;

    @Schema(description = "답변", example = "답볍드립니다.")
    private String inquiry_comment;

    @Schema(description = "등록일", example = "2024-12-30 00:00:00")
    private Timestamp inquiry_regdate;

    @Schema(description = "답변 등록일", example = "2025-01-01 00:00:00")
    private Timestamp inquiry_comment_regdate;

    @Schema(description = "이메일", example = "aa@aa.aa")
    private String inquiry_email;

    @Schema(description = "상태", example = "Y")
    private String inquiry_state;

    ////////
    @Schema(description = "총 데이터 수", example = "10")
    private Integer totalElements;
}
