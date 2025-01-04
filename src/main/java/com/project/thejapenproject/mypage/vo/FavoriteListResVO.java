package com.project.thejapenproject.mypage.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class FavoriteListResVO {

    @Schema(description = "단어 번호")
    private Integer wordNum;

    @Schema(description = "레벨")
    private Integer wordLevel;

    @Schema(description = "뜻")
    private String wordMeaning;

    @Schema(description = "내용")
    private String wordContent;

    @Schema(description = "한자")
    private String wordChinese;

    @Schema(description = "즐겨 찾기 여부")
    private boolean wordFavorite;

    @Schema(description = "단어 주차")
    private String wordWeek;

    @Schema(description = "즐겨찾기 번호")
    private Integer favoriteNum;

    @Schema(description = "즐겨찾기 등록일")
    private String favoriteRegdate;

    @Schema(description = "즐겨찾기 메모")
    private String favoriteMemo;

    @Schema(description = "예문 목록")
    private ArrayList<ExampleInfoVO> exampleList;

    @Schema(description = "전체 데이터 수")
    private Integer totalElements;

}
