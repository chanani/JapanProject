package com.project.thejapenproject.mypage.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * 즐겨찾기 메모 등록 요청 VO
 *
 * @author chanhan
 * @class : updateFavoriteMemoReqVO
 * @since 2024-11-12 오후 08:50
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class updateFavoriteMemoReqVO {

    // 즐겨찾기 항목 고유번호
    @NotNull(message = "즐겨찾기 번호는 필수입니다.")
    private Integer favoriteNum;

    // 메모 내용
    @NotNull(message = "메모 내용은 필수입니다.")
    private String favoriteMemo;
}
