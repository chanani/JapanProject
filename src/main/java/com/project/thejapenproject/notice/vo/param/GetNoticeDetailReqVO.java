package com.project.thejapenproject.notice.vo.param;

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

    @NotNull(message = "공지사항 번호는 필수입니다.")
    private Integer noticeNum;

}
