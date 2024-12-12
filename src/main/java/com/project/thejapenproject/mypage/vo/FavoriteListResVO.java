package com.project.thejapenproject.mypage.vo;

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

    private Integer wordNum;
    private Integer wordLevel;
    private String wordMeaning;
    private String wordContent;
    private String wordChinese;
    private boolean wordFavorite;
    // 즐겨찾기 주차
    private String wordWeek;
    // 즐겨찾기 번호
    private Integer favoriteNum;
    // 즐겨찾기 등록일
    private String favoriteRegdate;
    // 즐겨찾기 메모
    private String favoriteMemo;
    // 예문 목록
    private ArrayList<ExampleInfoVO> exampleList;
    // 전체 데이터 수
    private Integer totalElements;

}
