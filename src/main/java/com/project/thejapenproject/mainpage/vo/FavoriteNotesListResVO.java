package com.project.thejapenproject.mainpage.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 인기 단어장 목록 반환 VO
 *
 * @author chanhan
 * @class : FavoriteNotesListResVO
 * @since 2025-02-15 오후 01:37
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class FavoriteNotesListResVO {


    @Schema(description = "유저 아이콘 정보")
    private String userIconPath;

    @Schema(description = "제목")
    private String wsTitle;

    @Schema(description = "좋아요 수")
    private Integer wsHits;

    @Schema(description = "단어 수")
    private Integer totalCount;

    @Schema(description = "단어 세트 고유 번호")
    private Integer wsNum;

    @Schema(description = "아이디")
    private String username;

    @Schema(description = "총 데이터 수")
    private Integer totalElements;

    @Schema(description = "단어 세트 목록 좋아요 여부")
    private boolean favorite;

}
