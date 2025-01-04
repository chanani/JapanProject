package com.project.thejapenproject.notice.vo.param;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetNoticeDetailReqVO {

    @Schema(description = "공지사항 번호", example = "1")
    @NotNull(message = "공지사항 번호는 필수입니다.")
    private Integer noticeNum;

}
