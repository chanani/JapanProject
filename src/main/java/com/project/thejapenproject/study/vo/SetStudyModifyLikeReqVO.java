package com.project.thejapenproject.study.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * 단어 세트 학습 좋아요 수정 요청 VO
 *
 * @author chanhan
 * @class : SetStudyModifyLikeReqVO
 * @since 2024-11-15 오후 11:28
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SetStudyModifyLikeReqVO {

    @NotBlank(message = "유저 아이디는 필수입니다.")
    private String username;

    @NotNull(message = "단어 세트 번호는 필수입니다.")
    private Integer wsNum;

    // 좋아요 여부
    private Integer likeState;
}
